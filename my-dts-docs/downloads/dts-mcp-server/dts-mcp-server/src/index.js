const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const z = require('zod');
const puppeteer = require('puppeteer');
const http = require('http');

const { formatMethodHelp, normalizeName, parseDocHtml, DTS_CLASSES, formatClassList, extractApiExample } = require('./doc-parser');
const { validateParams, getRequiredParams } = require('./validator');

// ── State ─────────────────────────────────────────────────────────
let docIndex = {};      // Lazy cache: populated on-demand from DTS Cloud
let docCacheServer = null; // "host:port" the docIndex was populated from
let examplesCache = null; // Cached api_examples.js source
let examplesCacheServer = null; // "host:port" the examplesCache was fetched from
let browser = null;
let page = null;
let connectionInfo = null;

// ── Helpers ───────────────────────────────────────────────────────
function resolveDoc(className, methodName) {
    const ns = normalizeName(className);
    const cls = docIndex[ns];
    if (!cls) return null;
    if (methodName) return cls[methodName] || null;
    return { className, methods: Object.keys(cls).filter(k => k !== '_methods') };
}

// ── REST: Generic management API GET ──────────────────────────────
function restGet(host, port, path) {
    return new Promise((resolve, reject) => {
        const url = `http://${host}:${port}${path}`;
        console.error(`[DTS-MCP] REST GET ${url}`);
        const req = http.get(url, { timeout: 10000 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: data, json: JSON.parse(data) });
                } catch (_) {
                    resolve({ statusCode: res.statusCode, body: data, json: null });
                }
            });
        });
        req.on('error', err => reject(new Error(`REST GET ${path} failed: ${err.message}`)));
        req.on('timeout', () => { req.destroy(); reject(new Error(`REST GET ${path} timeout`)); });
    });
}

// ── REST: Get instance list ───────────────────────────────────────
async function getInstanceList(host, port) {
    const resp = await restGet(host, port, '/manage/instance');
    if (resp.statusCode !== 200) {
        throw new Error(`Instance list request failed: HTTP ${resp.statusCode}`);
    }
    if (!resp.json) {
        throw new Error(`Invalid JSON from /manage/instance: ${resp.body.slice(0, 200)}`);
    }
    // 响应格式：{ instances: ["id1"] } 或 [{id:"id1"}] 或 { data: [{id:"id1"}] }
    let instances;
    if (resp.json.instances) {
        instances = resp.json.instances;
    } else if (Array.isArray(resp.json)) {
        instances = resp.json;
    } else {
        instances = resp.json.data || [resp.json];
    }
    // 统一格式：字符串ID转为 {id: "xxx"} 对象
    instances = instances.map(inst => typeof inst === 'string' ? { id: inst } : inst);
    return instances;
}

// ── REST: Get one free instance ───────────────────────────────────
async function getFreeInstanceId(host, port) {
    const resp = await restGet(host, port, '/manage/instance/free');
    if (resp.statusCode !== 200 || !resp.json) {
        throw new Error(`Failed to get free instance: ${resp.body.slice(0, 200)}`);
    }
    if (resp.json.result === 0 && resp.json.id) {
        return { iid: resp.json.id, pid: resp.json.projectId || '' };
    }
    if (resp.json.result === 2) {
        throw new Error('No free instance available. Start an instance in DTS Cloud first.');
    }
    throw new Error(`Unexpected response: ${JSON.stringify(resp.json).slice(0, 200)}`);
}

// ── Browser auto-detect (cross-platform) ──────────────────────────
const { execSync } = require('child_process');

function detectBrowserPath() {
    // 1) 环境变量优先
    const envPath = process.env.PUPPETEER_CHROME_PATH;
    if (envPath) return envPath;

    const plat = process.platform;
    const fs = require('fs');

    // 2) 根据操作系统扫描常见安装路径
    const paths = [];
    if (plat === 'win32') {
        paths.push(
            'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
            'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
            'C:/Program Files/Google/Chrome/Application/chrome.exe',
            'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            process.env.LOCALAPPDATA + '/Google/Chrome SxS/Application/chrome.exe',
            'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
        );
    } else if (plat === 'darwin') {
        paths.push(
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
            '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
            '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        );
    } else if (plat === 'linux') {
        paths.push(
            '/usr/bin/google-chrome',
            '/usr/bin/google-chrome-stable',
            '/usr/bin/chromium',
            '/usr/bin/chromium-browser',
            '/usr/bin/microsoft-edge-stable',
            '/usr/bin/brave-browser',
        );
    }

    for (const p of paths) {
        if (fs.existsSync(p)) return p;
    }

    // 3) Linux/macOS: 通过 which 命令在 PATH 中查找
    if (plat !== 'win32') {
        const cmds = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge-stable', 'brave-browser'];
        for (const cmd of cmds) {
            try {
                const resolved = execSync(`which ${cmd} 2>/dev/null`, { encoding: 'utf-8' }).trim();
                if (resolved && fs.existsSync(resolved)) return resolved;
            } catch (_) { /* not found */ }
        }
    }

    return null;
}

// ── Browser: Launch and connect to DTS Cloud ──────────────────────
async function browserConnect(host, port, iid, pid) {
    console.error('[DTS-MCP] Launching headless browser...');
    const launchOpts = {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    };
    const browserPath = detectBrowserPath();
    if (browserPath) {
        launchOpts.executablePath = browserPath;
        console.error(`[DTS-MCP] Using browser: ${browserPath}`);
    }
    const br = await puppeteer.launch(launchOpts);

    const pg = await br.newPage();
    pg.on('console', msg => {
        if (msg.type() === 'error') console.error(`[DTS-PAGE] ${msg.text()}`);
    });
    pg.on('pageerror', err => console.error(`[DTS-PAGE-ERROR] ${err.message}`));

    const baseUrl = `http://${host}:${port}`;

    // 导航到DTS服务器建立 session（302会最终到 /locale/zh/player.html）
    await pg.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Load SDK
    await pg.addScriptTag({ url: `${baseUrl}/libac` });

    // Initialize DigitalTwinPlayer (no video = no domId)
    const serverAddr = `${host}:${port}`;
    await pg.evaluate((addr, iid, pid) => {
        window._dtsReady = false;
        window._dtsError = null;

        if (typeof DigitalTwinPlayer === 'undefined') {
            window._dtsError = 'DigitalTwinPlayer not found in loaded SDK';
            return;
        }

        window.fdplayer = new DigitalTwinPlayer(addr, {
            iid: iid,
            pid: pid || undefined,
            apiOptions: {
                onReady: (coordType) => {
                    window._dtsCoordType = coordType;
                    window.fdapi = window.fdplayer.getAPI();
                    // 确保 getAPI() 返回后再标记就绪
                    window._dtsReady = true;
                    console.error('[DTS-MCP] Player ready, coordType:', coordType);
                },
                onLog: (msg) => {
                    if (typeof msg === 'string' && (msg.includes('Connect') || msg.includes('close'))) {
                        console.error('[DTS-MCP]', msg);
                    }
                },
                onEvent: () => {},
            },
        });
    }, serverAddr, iid, pid);

    // Wait for API ready (with retries for slow-starting instances)
    let ready = false;
    let lastError = '';
    for (let attempt = 1; attempt <= 3; attempt++) {
        if (attempt > 1) {
            console.error(`[DTS-MCP] Retrying ready check (attempt ${attempt})...`);
            await new Promise(r => setTimeout(r, 3000));
        }
        try {
            await pg.waitForFunction(() => window._dtsReady === true, {
                timeout: 30000, polling: 500,
            });
            ready = true;
            break;
        } catch (_) {
            lastError = await pg.evaluate(() => window._dtsError || '');
            if (!lastError) lastError = 'API ready timeout';
            console.error(`[DTS-MCP] Attempt ${attempt}: ${lastError}`);
            // Check if connection logs show progress
            const hasProgress = await pg.evaluate(() => {
                try {
                    return typeof window.fdplayer !== 'undefined' && typeof window.fdapi !== 'undefined';
                } catch (_) { return false; }
            });
            if (hasProgress && attempt < 3) {
                console.error('[DTS-MCP] Player exists but not ready yet, retrying...');
            }
        }
    }

    if (!ready) {
        const detail = await pg.evaluate(() => ({
            hasPlayer: typeof window.fdplayer !== 'undefined',
            hasAPI: typeof window.fdapi !== 'undefined',
            ready: window._dtsReady,
            error: window._dtsError,
        }));
        console.error('[DTS-MCP] Connection debug:', JSON.stringify(detail));
        throw new Error(`${lastError} after 3 attempts. Detail: ${JSON.stringify(detail)}`);
    }

    // Inject API call helper
    await pg.evaluate(() => {
        window._dtsCall = function (className, methodName, params) {
            return new Promise((resolve, reject) => {
                if (!window._dtsReady) return reject('DTS API not ready');
                const api = window.fdapi[className];
                if (!api || typeof api[methodName] !== 'function') {
                    return reject('Method not found: ' + className + '.' + methodName);
                }
                // DTS SDK callbacks use single-argument (result) signature,
                // NOT the Node.js error-first (err, result) convention.
                const callback = (result) => {
                    try {
                        resolve(result !== undefined ? JSON.parse(JSON.stringify(result)) : null);
                    } catch (_) {
                        resolve(null);
                    }
                };
                if (params && params.data !== undefined) {
                    api[methodName](params.data, callback);
                } else if (params && Object.keys(params).length > 0) {
                    const args = Object.values(params);
                    args.push(callback);
                    api[methodName].apply(api, args);
                } else {
                    api[methodName](callback);
                }
            });
        };
    });

    return { br, pg };
}

// ── Parse manager HTML for API docs ───────────────────────────────
function parseManagerHtml(html) {
    // Extract the API table section — look for <table id="interfaceList">
    const tableMatch = html.match(/<table[^>]*id="interfaceList"[^>]*>([\s\S]*?)<\/table>/);
    if (!tableMatch) {
        return { error: 'Could not find API table in manager.html' };
    }

    const tableHtml = tableMatch[1];
    const apis = [];
    let currentModule = '';

    // Match rows: <tr> ... <td>module</td> <td>func</td> <td>ws</td> <td>rest</td> <td>loginRequired</td> </tr>
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch;
    while ((rowMatch = rowRe.exec(tableHtml)) !== null) {
        const row = rowMatch[1];
        const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
        if (!cells || cells.length < 3) continue;

        const getCell = (i) => {
            if (!cells[i]) return '';
            return cells[i].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
        };

        const module = getCell(0);
        const func = getCell(1);
        const wsCmd = getCell(2);
        const restApi = getCell(3);
        const loginReq = getCell(4) || '';

        // Skip header row
        if (module === '模块' || func === '功能') continue;

        // Update current module if this row has one
        const cleanModule = module.replace(/rowspan="?\d+"?/i, '');
        if (module && !module.includes('rowspan')) {
            currentModule = module;
        }

        const nameMatch = func.match(/href="[^"]*">(.+?)<\/a>/);
        const funcName = nameMatch ? nameMatch[1] : func.replace(/<[^>]+>/g, '').trim();
        if (!funcName) continue;

        apis.push({
            module: currentModule || module,
            name: funcName,
            wsCommand: wsCmd.replace(/<[^>]+>/g, '').trim(),
            rest: restApi.replace(/<[^>]+>/g, '').trim(),
            loginRequired: loginReq.includes('是') || loginReq.includes('需要') || loginReq.includes('login') || false,
        });
    }

    return { apis };
}

// ── Fetch & parse a class doc page from DTS Cloud ────────────────
async function fetchClassDoc(host, port, className) {
    const ns = normalizeName(className);
    // Invalidate the doc cache if we're now talking to a different server,
    // otherwise stale docs from a previous server would be served.
    const srvKey = `${host}:${port}`;
    if (docCacheServer && docCacheServer !== srvKey) {
        docIndex = {};
        console.error(`[DTS-MCP] Server changed (${docCacheServer} -> ${srvKey}); doc cache cleared`);
    }
    docCacheServer = srvKey;
    // Already cached?
    if (docIndex[ns]) return docIndex[ns];

    const url = `http://${host}:${port}/locale/zh/doc/${className}.html`;
    console.error(`[DTS-MCP] Fetching doc: ${url}`);

    const resp = await restGet(host, port, `/locale/zh/doc/${className}.html`);
    if (resp.statusCode !== 200) {
        throw new Error(`Doc page not found: HTTP ${resp.statusCode} — is "${className}" a valid API class?`);
    }

    const parsed = parseDocHtml(resp.body, className);
    if (!parsed[ns] || Object.keys(parsed[ns]).length === 0) {
        throw new Error(`No methods found in doc page for "${className}". HTML may have unexpected structure.`);
    }

    // Cache it
    docIndex[ns] = parsed[ns];
    console.error(`[DTS-MCP] Cached ${Object.keys(docIndex[ns]).length} methods for ${className}`);
    return docIndex[ns];
}

// ── MCP Server ────────────────────────────────────────────────────
const server = new McpServer({
    name: 'mcp-dts-server',
    version: '1.2.0',
}, {
    capabilities: { tools: {} },
});

// ─── Tool: dts_connect ────────────────────────────────────────────
server.registerTool('dts_connect', {
    title: 'Connect to DTS Cloud Server via headless browser',
    description:
        'Launch a headless browser and connect to a DTS Cloud rendering instance via DigitalTwinPlayer. ' +
        'You may optionally specify an instance ID (iid). If omitted, the server will list available ' +
        'instances and return them to you so you can pick one. If there is exactly one instance it ' +
        'will be auto-selected. Set autoSelect=true to pick a free instance, falling back to any running instance. ' +
        'TIP: If connection times out with "API ready timeout", retry with the explicit iid — locked instances may take longer to initialize.',
    inputSchema: z.object({
        host: z.string().describe('DTS Cloud server IP, e.g. "127.0.0.1"'),
        port: z.coerce.number().describe('DTS Cloud server port, e.g. 8010'),
        iid: z.string().optional().describe('Specific instance ID. If omitted, instances will be listed.'),
        autoSelect: z.boolean().optional().describe(
            'If true and no iid is given, automatically pick a free instance instead of asking.'
        ),
    }),
}, async (args) => {
    // Already connected?
    if (browser && browser.isConnected() && page && connectionInfo) {
        if (connectionInfo.host === args.host && connectionInfo.port === args.port) {
            return {
                content: [{ type: 'text', text: `Already connected to ${args.host}:${args.port}` }],
            };
        }
        try { await browser.close(); } catch (_) {}
        browser = null; page = null; connectionInfo = null;
        // Different server — drop cached docs/examples from the previous one.
        docIndex = {}; docCacheServer = null;
        examplesCache = null; examplesCacheServer = null;
    }

    try {
        let iid, pid;

        if (args.iid) {
            // User specified an instance ID directly
            iid = args.iid;
            pid = '';
            console.error(`[DTS-MCP] Using user-specified instance: iid=${iid}`);
        } else {
            // List instances to let the user choose
            const instances = await getInstanceList(args.host, args.port);
            console.error(`[DTS-MCP] Found ${instances.length} instance(s)`);

            if (instances.length === 0) {
                return {
                    content: [{
                        type: 'text',
                        text: 'No instances found on this DTS Cloud server. ' +
                            'Start an instance first (via manager UI or REST API).',
                    }],
                    isError: true,
                };
            }

            if (instances.length === 1) {
                // Single instance — auto-use
                const inst = instances[0];
                iid = inst.id || inst.iid;
                pid = inst.projectId || inst.pid || '';
                console.error(`[DTS-MCP] Auto-selected sole instance: iid=${iid}`);
            } else if (args.autoSelect) {
                // Multiple instances — try free first, fall back to any running
                try {
                    const free = await getFreeInstanceId(args.host, args.port);
                    iid = free.iid;
                    pid = free.pid;
                    console.error(`[DTS-MCP] Auto-selected free instance: iid=${iid}`);
                } catch (_) {
                    // Fall back to any running/blocking instance
                    const running = instances.find(inst => inst.state === 3 || inst.state === 4);
                    if (running) {
                        iid = running.id || running.iid;
                        pid = running.projectId || running.pid || '';
                        console.error(`[DTS-MCP] No free instance — using running instance: iid=${iid} (state=${running.state})`);
                    } else {
                        throw new Error('No free or running instance available. Start an instance in DTS Cloud first.');
                    }
                }
            } else {
                // Multiple instances — return list for user to choose
                const list = instances.map((inst, i) => {
                    const id = inst.id || inst.iid || '?';
                    const state = inst.state !== undefined
                        ? ['Stopped', 'Starting', 'Loading', 'Running', 'Blocking'][inst.state] || inst.state
                        : '?';
                    const name = inst.name || inst.projectName || '';
                    const pid = inst.projectId || inst.pid || '';
                    return `${i + 1}. **${id}** — state: ${state}${name ? `, name: ${name}` : ''}${pid ? `, pid: ${pid}` : ''}`;
                }).join('\n');

                return {
                    content: [{
                        type: 'text',
                        text:
                            `Found ${instances.length} instances on ${args.host}:${args.port}:\n\n${list}\n\n` +
                            'Please call dts_connect again with the chosen `iid`, or set `autoSelect: true` ' +
                            'to automatically pick a free instance.',
                    }],
                };
            }
        }

        // Connect via headless browser
        const result = await browserConnect(args.host, args.port, iid, pid);
        browser = result.br;
        page = result.pg;

        connectionInfo = { host: args.host, port: args.port, iid, pid };

        const version = await page.evaluate(() => {
            try { return window.fdapi.getVersion(); } catch (_) { return 'unknown'; }
        });
        const coordType = await page.evaluate(() => window._dtsCoordType || 'unknown');

        return {
            content: [{
                type: 'text',
                text: [
                    `Connected to DTS Cloud at ${args.host}:${args.port}`,
                    `Instance ID: ${iid}`,
                    `Project ID: ${pid || '(none)'}`,
                    `SDK Version: ${version}`,
                    `Coord System: ${coordType === '0' ? 'Projection' : 'Geographic'} (${coordType})`,
                    `Status: ready`,
                ].join('\n'),
            }],
        };
    } catch (e) {
        if (browser) {
            try { await browser.close(); } catch (_) {}
            browser = null; page = null;
        }
        connectionInfo = null;
        return {
            content: [{ type: 'text', text: `Connection failed: ${e.message}` }],
            isError: true,
        };
    }
});

// ─── Tool: dts_manager_doc ────────────────────────────────────────
server.registerTool('dts_manager_doc', {
    title: 'Query DTS Cloud Management API Documentation',
    description:
        'Fetch and parse the DTS Cloud management API documentation from the server. ' +
        'Returns a list of available management REST and WebSocket APIs. ' +
        'The management API docs are always at http://{host}:{port}/locale/zh/manager.html',
    inputSchema: z.object({
        host: z.string().describe('DTS Cloud server IP, e.g. "127.0.0.1"'),
        port: z.coerce.number().describe('DTS Cloud server port, e.g. 8010'),
        search: z.string().optional().describe('Filter APIs by keyword, e.g. "instance" or "free"'),
    }),
}, async (args) => {
    try {
        const resp = await restGet(args.host, args.port, '/locale/zh/manager.html');
        if (resp.statusCode !== 200) {
            return {
                content: [{
                    type: 'text',
                    text: `Failed to fetch manager docs: HTTP ${resp.statusCode}`,
                }],
                isError: true,
            };
        }

        const result = parseManagerHtml(resp.body);
        if (result.error) {
            return {
                content: [{
                    type: 'text',
                    text: [
                        `Failed to parse manager docs: ${result.error}`,
                        '',
                        'Raw HTML preview (first 2000 chars):',
                        resp.body.slice(0, 2000),
                    ].join('\n'),
                }],
                isError: true,
            };
        }

        let apis = result.apis;
        if (args.search) {
            const q = args.search.toLowerCase();
            apis = apis.filter(a =>
                a.name.toLowerCase().includes(q) ||
                a.module.toLowerCase().includes(q) ||
                a.rest.toLowerCase().includes(q) ||
                a.wsCommand.toLowerCase().includes(q)
            );
        }

        const grouped = {};
        for (const api of apis) {
            if (!grouped[api.module]) grouped[api.module] = [];
            grouped[api.module].push(api);
        }

        let output = `# DTS Cloud Management APIs (${apis.length} total)\n`;
        output += `Source: http://${args.host}:${args.port}/locale/zh/manager.html\n\n`;

        for (const [mod, modApis] of Object.entries(grouped)) {
            output += `## ${mod}\n\n`;
            output += `| API | REST | WebSocket | Login |\n`;
            output += `|-----|------|-----------|-------|\n`;
            for (const a of modApis) {
                const login = a.loginRequired ? 'YES' : 'no';
                output += `| ${a.name} | ${a.rest || '—'} | ${a.wsCommand || '—'} | ${login} |\n`;
            }
            output += '\n';
        }

        output += '---\n';
        output += '**Usage**: REST endpoints are relative to the server root. ' +
            'Calls marked "YES" under Login require authentication via `POST /manage/login` first.';

        return { content: [{ type: 'text', text: output }] };
    } catch (e) {
        return {
            content: [{ type: 'text', text: `Failed to fetch manager docs: ${e.message}` }],
            isError: true,
        };
    }
});

// ─── Tool: dts_disconnect ─────────────────────────────────────────
server.registerTool('dts_disconnect', {
    title: 'Disconnect from DTS Cloud Server',
    description: 'Close the headless browser and clean up resources.',
    inputSchema: z.object({}),
}, async () => {
    if (!browser) {
        return { content: [{ type: 'text', text: 'Not connected.' }] };
    }
    try { await browser.close(); } catch (_) {}
    browser = null; page = null; connectionInfo = null;
    return { content: [{ type: 'text', text: 'Disconnected. Browser closed.' }] };
});

// ─── Tool: dts_status ─────────────────────────────────────────────
server.registerTool('dts_status', {
    title: 'Get DTS Connection Status',
    description: 'Return the current connection status, server info, and SDK version.',
    inputSchema: z.object({}),
}, async () => {
    if (!browser || !connectionInfo) {
        return {
            content: [{
                type: 'text',
                text: 'Status: disconnected\nNo active connection to DTS Cloud server.',
            }],
        };
    }

    const browserConnected = browser.isConnected();
    let version = 'unknown', coordType = 'unknown';

    if (browserConnected && page) {
        try {
            version = await page.evaluate(() => {
                try { return window.fdapi.getVersion(); } catch (_) { return 'unknown'; }
            });
            coordType = await page.evaluate(() => window._dtsCoordType || 'unknown');
        } catch (_) {}
    }

    return {
        content: [{
            type: 'text',
            text: [
                `Status: ${browserConnected ? 'connected' : 'disconnected'}`,
                `Server: ${connectionInfo.host}:${connectionInfo.port}`,
                `Instance ID: ${connectionInfo.iid || 'unknown'}`,
                `SDK Version: ${version}`,
                `Coord System: ${coordType}`,
                `Docs loaded: ${Object.keys(docIndex).length} classes`,
                `Mode: headless browser (Puppeteer)`,
            ].join('\n'),
        }],
    };
});

// ─── Tool: dts_doc ────────────────────────────────────────────────
server.registerTool('dts_doc', {
    title: 'Query DTS API Documentation from Cloud',
    description: 'Get documentation for a specific DTS API class and method. ' +
        'Fetches the doc page directly from DTS Cloud at http://{host}:{port}/locale/zh/doc/{Class}.html. ' +
        'If host and port are omitted and you are connected via dts_connect, ' +
        'the connection details will be used automatically. ' +
        'Omitting "class" or passing "list"/"help" will return all available API classes.',
    inputSchema: z.object({
        class: z.string().optional().describe('API class name, e.g. "Drone", "Camera", "Marker". Omit or use "list"/"help" to list all classes.'),
        method: z.string().optional().describe('Method name, e.g. "add", "set". Omit to list all methods.'),
        host: z.string().optional().describe('DTS Cloud server IP, e.g. "127.0.0.1". Defaults to connected server.'),
        port: z.coerce.number().optional().describe('DTS Cloud server port, e.g. 8010. Defaults to connected server.'),
    }),
}, async (args) => {
    // ── If no class specified, return the full class index ──
    if (!args.class || args.class === 'list' || args.class === 'help') {
        return { content: [{ type: 'text', text: formatClassList() }] };
    }

    // Determine target host/port
    let host = args.host;
    let port = args.port;

    if (!host || !port) {
        if (connectionInfo) {
            host = host || connectionInfo.host;
            port = port || connectionInfo.port;
            console.error(`[DTS-MCP] Using connection target: ${host}:${port}`);
        } else {
            return {
                content: [{
                    type: 'text',
                    text: 'No host/port specified and not connected. ' +
                        'Either call dts_connect first, or provide host and port directly:\n' +
                        '  dts_doc({ class: "Drone", host: "127.0.0.1", port: 8010 })',
                }],
                isError: true,
            };
        }
    }

    const ns = normalizeName(args.class);

    // Fetch (and cache) the class doc from DTS Cloud
    let cls;
    try {
        cls = await fetchClassDoc(host, port, args.class);
    } catch (e) {
        // Try to provide helpful suggestions
        let suggestions = '';
        const available = Object.keys(docIndex).sort();
        if (available.length > 0) {
            const similar = available.filter(a => a.includes(ns) || ns.includes(a));
            suggestions = similar.length > 0
                ? `\nSimilar cached classes: ${similar.join(', ')}`
                : `\nAvailable cached classes: ${available.join(', ')}`;
        }
        return {
            content: [{
                type: 'text',
                text: `Failed to fetch docs for "${args.class}": ${e.message}${suggestions}`,
            }],
            isError: true,
        };
    }

    if (!args.method) {
        // List all methods
        const methods = Object.keys(cls).filter(k => k !== '_methods').sort();
        if (methods.length === 0) {
            return {
                content: [{
                    type: 'text',
                    text: `Class "${args.class}" has no documented methods.`,
                }],
            };
        }
        const list = methods.map(m => {
            const d = cls[m];
            const sig = d.signature || `${args.class}.${m}(...)`;
            return `- **${m}**: ${d.description || ''}\n  \`${sig}\``;
        }).join('\n');
        return {
            content: [{
                type: 'text',
                text: `# ${args.class} — ${methods.length} methods\nSource: http://${host}:${port}/locale/zh/doc/${args.class}.html\n\n${list}`,
            }],
        };
    }

    // Query specific method
    const doc = cls[args.method];
    if (!doc) {
        const available = Object.keys(cls).filter(k => k !== '_methods').sort();
        return {
            content: [{
                type: 'text',
                text: `Method "${args.method}" not found in "${args.class}".\nAvailable: ${available.join(', ')}`,
            }],
            isError: true,
        };
    }

    const help = formatMethodHelp(doc);
    const required = getRequiredParams(doc);
    if (required.length > 0) {
        const reqList = required.map(r => {
            if (r.isComplex) {
                return `- **${r.name}** (${r.type}) — required properties: ${r.requiredProperties.map(p => `\`${p.name}\``).join(', ')}`;
            }
            return `- **${r.name}** (${r.type}): ${r.description}`;
        }).join('\n');
        return { content: [{ type: 'text', text: help + '\n\n---\n**Required Parameters:**\n' + reqList }] };
    }

    return { content: [{ type: 'text', text: help }] };
});

// ─── Tool: dts_api_example ────────────────────────────────────────
server.registerTool('dts_api_example', {
    title: 'Get DTS API Example Code from Debug Page',
    description: 'Fetch a real example code snippet for a specific DTS API class and method. ' +
        'The examples come from DTS Cloud\'s internal API debug page (main.html -> api_examples.js). ' +
        'They show complete workflows (delete → add → focus) with real parameter values. ' +
        'Use this BEFORE calling dts_call to see the exact usage pattern. ' +
        'If host and port are omitted and you are connected via dts_connect, ' +
        'connection details will be used automatically.',
    inputSchema: z.object({
        class: z.string().describe('API class name (first letter uppercase), e.g. "Train", "SplineMesh", "Marker"'),
        method: z.string().describe('Method name, e.g. "add", "focus", "clear"'),
        host: z.string().optional().describe('DTS Cloud server IP, e.g. "127.0.0.1". Defaults to connected server.'),
        port: z.coerce.number().optional().describe('DTS Cloud server port, e.g. 8010. Defaults to connected server.'),
    }),
}, async (args) => {
    let host = args.host;
    let port = args.port;

    if (!host || !port) {
        if (connectionInfo) {
            host = host || connectionInfo.host;
            port = port || connectionInfo.port;
        } else {
            return {
                content: [{ type: 'text', text: 'No host/port specified and not connected. ' +
                    'Use dts_connect first or provide host and port directly.' }],
                isError: true,
            };
        }
    }

    // Fetch and cache examples file if not cached or server changed
    try {
        const exKey = `${host}:${port}`;
        if (!examplesCache || examplesCacheServer !== exKey) {
            const resp = await restGet(host, port, '/locale/zh/scripts/api_examples.js');
            if (resp.statusCode !== 200) {
                return { content: [{ type: 'text', text: `Failed to fetch examples: HTTP ${resp.statusCode}` }], isError: true };
            }
            examplesCache = resp.body;
            examplesCacheServer = exKey;
            console.error(`[DTS-MCP] Cached api_examples.js for ${exKey} (${resp.body.length} bytes)`);
        }
    } catch (e) {
        return { content: [{ type: 'text', text: `Failed to fetch examples: ${e.message}` }], isError: true };
    }

    const extracted = extractApiExample(examplesCache, args.class, args.method);
    if (!extracted) {
        // Try with normalized class name (lowercase first letter)
        const altName = args.class.charAt(0).toUpperCase() + args.class.slice(1);
        const altExtract = extractApiExample(examplesCache, altName, args.method);
        if (!altExtract) {
            // List available examples matching the class for suggestions
            const classLower = (args.class.charAt(0).toLowerCase() + args.class.slice(1)).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const availRe = new RegExp(`test_${classLower}_\\w+\\s*\\(`, 'g');
            const suggestions = [];
            let sm;
            while ((sm = availRe.exec(examplesCache)) !== null) {
                const name = sm[0].replace(/test_/, '').replace(/\s*\($/, '');
                if (!suggestions.includes(name)) suggestions.push(name);
            }
            const hint = suggestions.length > 0
                ? `\nAvailable methods for "${altName}": ${suggestions.map(s => s.split('_')[1]).join(', ')}`
                : '\nCheck dts_api_example with "list" or try a different class.';
            return { content: [{ type: 'text', text: `No example found for "${args.class}.${args.method}".${hint}` }], isError: true };
        }
        return { content: [{ type: 'text', text: `\`\`\`javascript\n${altExtract}\n\`\`\`` }] };
    }

    return { content: [{ type: 'text', text: `\`\`\`javascript\n${extracted}\n\`\`\`` }] };
});

// ─── Tool: dts_call ───────────────────────────────────────────────
server.registerTool('dts_call', {
    title: 'Execute DTS API Call via browser',
    description: 'Call a DTS SDK API method using the headless browser connection. ' +
        'Use dts_doc first to check the method signature. ' +
        'For add/update methods: {"class": "marker", "method": "add", "params": {"data": [{...}]}} ' +
        'For positional methods: {"class": "marker", "method": "focusAll", "params": {"distance": 1000, "flyTime": 2}} ' +
        'IMPORTANT — Color values: DTS uses RGBA arrays [R,G,B,A] with each channel 0~1 (divide raw RGB by 255). ' +
        'Example: red=[1,0,0,1], not "Color.Red". All color params (textBackgroundColor, lineColor, fontColor, etc.) must use this format.',
    inputSchema: z.object({
        class: z.string().describe('API class name, e.g. "marker", "camera"'),
        method: z.string().describe('Method name, e.g. "add", "set", "focusAll"'),
        params: z.record(z.any()).optional().describe('Method parameters. Use "data" key for add/update payloads.'),
    }),
}, async (args) => {
    if (!browser || !browser.isConnected() || !page) {
        return {
            content: [{ type: 'text', text: 'Not connected. Call dts_connect first.' }],
            isError: true,
        };
    }

    const ns = normalizeName(args.class);

    // Try to fetch the doc for validation (non-fatal if unavailable)
    let methodDoc = resolveDoc(ns, args.method);
    if (!methodDoc && connectionInfo) {
        try {
            await fetchClassDoc(connectionInfo.host, connectionInfo.port, args.class);
            methodDoc = resolveDoc(ns, args.method);
        } catch (_) {
            // Doc fetch is optional for dts_call — proceed without validation
        }
    }

    if (methodDoc && args.params) {
        const validation = validateParams(methodDoc, args.params);
        if (!validation.valid) {
            return {
                content: [{
                    type: 'text',
                    text: `Parameter validation failed:\n${validation.errors.map(e => `  - ${e}`).join('\n')}`,
                }],
                isError: true,
            };
        }
    }

    try {
        const paramsStr = args.params ? JSON.stringify(args.params) : '{}';
        const result = await page.evaluate(
            (cls, method, pStr) => window._dtsCall(cls, method, JSON.parse(pStr)),
            ns,
            args.method,
            paramsStr,
        );

        const preview = result !== null && result !== undefined
            ? JSON.stringify(result).slice(0, 30000)
            : 'OK (no return value)';

        return {
            content: [{
                type: 'text',
                text: `Executed: fdapi.${ns}.${args.method}(${JSON.stringify(args.params || {}).slice(0, 200)})\nResult: ${preview}`,
            }],
        };
    } catch (e) {
        return {
            content: [{
                type: 'text',
                text: `API call failed: ${e.message}`,
            }],
            isError: true,
        };
    }
});

// ── Start ─────────────────────────────────────────────────────────
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`[DTS-MCP] Server started (Puppeteer mode). Docs fetched on-demand from DTS Cloud.`);
}

main().catch(e => {
    console.error('[DTS-MCP] Fatal:', e);
    process.exit(1);
});
