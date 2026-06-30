import React, { useState, useEffect, useRef, useCallback } from 'react'
import ConnectionBar from '../components/Playground/ConnectionBar'
import ExampleNav from '../components/Playground/ExampleNav'
import PlayerPanel from '../components/Playground/PlayerPanel'
import EditorPanel from '../components/Playground/EditorPanel'
import ConsolePanel from '../components/Playground/ConsolePanel'
import { loadSdk, destroySdk, initConnection, injectGlobalFunctions, sleep, escapeHtml, matchCmdLog, calcTimeDiffs } from '../utils/sdk'

const DEFAULT_CODE = ['// 使用说明：', '//  (1) 左侧选择 API 示例：默认「点击即执行」，勾选"点击不执行"则只填入代码', '//  (2) 此处可直接编辑 JS 代码，按 Ctrl+Enter 或点击「执行JS」运行', '//  (3) 「执行JSON」可回放 __command 日志或执行原始 JSON 命令', '//  (4) 全局可用：fdapi / fdplayer / HostConfig / log() / sleep()', ''].join('\n')

const MIN_EDITOR_H = 128
const MAX_EDITOR_H = 628

export default function PlaygroundPage() {
    const baseUrl = import.meta.env.BASE_URL

    // ── 连接状态 ──
    const [status, setStatus] = useState('loading')
    const [versionHtml, setVersionHtml] = useState('')
    const [isCloud, setIsCloud] = useState(true)
    const [ip, setIp] = useState('127.0.0.1')
    const [port, setPort] = useState('4321')
    const [coordType, setCoordType] = useState('')
    const [coordSel, setCoordSel] = useState('0')
    const [fps, setFps] = useState(0)
    const [examplesData, setExamplesData] = useState({ pcs: [], gcs: [] })
    const [serverVersion, setServerVersion] = useState('')

    // ── 编辑器 / 日志 ──
    const [code, setCode] = useState(DEFAULT_CODE)
    const [editorHeight, setEditorHeight] = useState(320)
    const [notExecute, setNotExecute] = useState(false)
    const [autoClear, setAutoClear] = useState(true)
    const [logEnabled, setLogEnabled] = useState(true)
    const [consoleCollapsed, setConsoleCollapsed] = useState(false)

    // ── 导航 / 布局 ──
    const [searchQuery, setSearchQuery] = useState('')
    const [openCats, setOpenCats] = useState({ 'pcs-0': true, 'gcs-0': true })
    const [openItems, setOpenItems] = useState({})
    const [activeMethod, setActiveMethod] = useState('')
    const [rightTab, setRightTab] = useState('player')
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [playerRatio, setPlayerRatio] = useState(0.55)
    const [isDragging, setIsDragging] = useState(false)
    const [isDraggingH, setIsDraggingH] = useState(false)

    // ── Refs ──
    const infoPanelRef = useRef(null)
    const logTimesRef = useRef(0)
    const codeRef = useRef(code)
    codeRef.current = code
    const pendingAutoRunRef = useRef(false)
    const flagsRef = useRef({})
    flagsRef.current = { autoClear, logEnabled, notExecute }
    const playerPanelRef = useRef(null)
    const codePanelRef = useRef(null)
    const editorPanelRef = useRef(null)
    const dragRef = useRef(null)
    const hDragRef = useRef(null)

    // ── 日志 ──
    const writeLog = useCallback((msg, noLineBreak, color) => {
        const el = infoPanelRef.current
        if (!el || !flagsRef.current.logEnabled) return
        if (flagsRef.current.autoClear && ++logTimesRef.current > 100) {
            logTimesRef.current = 0
            el.innerHTML = ''
        }
        const html = color ? '<font color="' + color + '">' + msg + '</font>' : String(msg)
        el.insertAdjacentHTML('beforeend', html + (noLineBreak ? '' : '\n'))
        el.scrollTop = el.scrollHeight + 100
    }, [])

    const clearScreen = useCallback(() => {
        if (infoPanelRef.current) infoPanelRef.current.innerHTML = ''
        logTimesRef.current = 0
    }, [])

    // ── 示例库懒加载 ──
    useEffect(() => {
        import('../data/sandbox/real-examples')
            .then(mod => setExamplesData({ pcs: mod.SANDBOX_CATEGORIES || [], gcs: mod.SANDBOX_CATEGORIES_GCS || [] }))
            .catch(() => {})
    }, [])

    // ── 面板拖拽 ──
    const onDividerMouseDown = useCallback(e => {
        e.preventDefault()
        const playerW = playerPanelRef.current?.getBoundingClientRect().width ?? 0
        const codeW = codePanelRef.current?.getBoundingClientRect().width ?? 0
        const total = playerW + codeW
        if (total <= 0) return
        dragRef.current = { startX: e.clientX, startPlayerW: playerW, total }
        setIsDragging(true)
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
    }, [])

    useEffect(() => {
        const onMove = e => {
            if (!dragRef.current) return
            const { startX, startPlayerW, total } = dragRef.current
            let ratio = (startPlayerW + (e.clientX - startX)) / total
            ratio = Math.max(0.2, Math.min(0.8, ratio))
            setPlayerRatio(ratio)
            try { localStorage.setItem('sb-player-ratio', String(ratio)) } catch {}
        }
        const onUp = () => {
            if (!dragRef.current) return
            dragRef.current = null
            setIsDragging(false)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
        return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    }, [])

    // ── 水平拖拽（编辑器/日志高度分配） ──
    const onHDividerMouseDown = useCallback(e => {
        e.preventDefault()
        const rect = editorPanelRef.current?.getBoundingClientRect()
        if (!rect) return
        hDragRef.current = { startY: e.clientY, startH: rect.height }
        setIsDraggingH(true)
        document.body.style.cursor = 'row-resize'
        document.body.style.userSelect = 'none'
    }, [])

    useEffect(() => {
        const onMove = e => {
            if (!hDragRef.current) return
            const { startY, startH } = hDragRef.current
            const newH = Math.max(MIN_EDITOR_H, Math.min(MAX_EDITOR_H, startH + (e.clientY - startY)))
            setEditorHeight(newH)
        }
        const onUp = () => {
            if (!hDragRef.current) return
            hDragRef.current = null
            setIsDraggingH(false)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
            try { localStorage.setItem('CodeMirrorHeight', String(editorHeight)) } catch {}
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
        return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    }, [editorHeight])

    // ── SDK 加载 + 连接 ──
    useEffect(() => {
        let disposed = false

        const apiOptions = {
            onReady: coordSystemType => {
                if (disposed) return
                setStatus('ready')
                setCoordType(String(coordSystemType ?? '0'))
                setCoordSel(String(coordSystemType ?? '0'))
                writeLog('✅ 工程已就绪，可以调用 API（坐标系类型：' + (String(coordSystemType) === '1' ? '球面' : '投影') + '）', false, 'green')
                if (pendingAutoRunRef.current && !flagsRef.current.notExecute) {
                    pendingAutoRunRef.current = false
                    setTimeout(() => {
                        try { window.eval('(async ()=>{' + codeRef.current + '})()'); writeLog('▶ 已自动执行文档示例代码', false, 'green') }
                        catch (err) { writeLog(err.message, false, 'red') }
                    }, 300)
                }
            },
            onApiVersion: () => {
                const fdapi = window.fdapi
                if (!fdapi || !fdapi.misc) return
                setServerVersion(fdapi.misc.apiVersionServer || fdapi.getVersion() || '')
                if (fdapi.misc.isApiVersionMatched()) {
                    setVersionHtml('<font color="#00ffa0">' + fdapi.getVersion() + '</font>')
                } else {
                    setVersionHtml('s:<font color="#ff8080">' + fdapi.misc.apiVersionServer + '</font>-c:' + fdapi.getVersion())
                    writeLog('<b>ac.min.js 版本和云渲染服务器的文件版本不一致！</b>', false, 'red')
                }
            },
            onEvent: e => writeLog('OnEvent: ' + escapeHtml(e.eventtype)),
            onLog: (msg, noLineBreak, color) => writeLog(escapeHtml(msg), noLineBreak, color),
            _onFps: fps => setFps(fps),
            _onVersion: v => { setVersionHtml(v2 => v2 || v); setServerVersion(v2 => v2 || v) }
        }

        ;(async () => {
            injectGlobalFunctions(writeLog, clearScreen)
            try {
                await loadSdk(baseUrl, writeLog)
            } catch {
                if (!disposed) {
                    setStatus('no-sdk')
                    writeLog('<b>❌ 未找到 ac.min.js！</b>', false, 'red')
                    writeLog('请将 DTS SDK 安装目录下的 <b>ac.min.js</b> 与 <b>ac_conf.js</b> 复制到本工程 <b>public/</b> 目录后刷新。', false, 'red')
                }
                return
            }
            if (!disposed) initConnection({ isCloud, apiOptions, writeLog, setStatus, setIp, setPort })
        })()

        return () => { disposed = true; destroySdk() }
    }, [isCloud]) // eslint-disable-line react-hooks/exhaustive-deps

    // ── 恢复 localStorage 状态 ──
    useEffect(() => {
        try {
            const h = parseInt(localStorage.getItem('CodeMirrorHeight'), 10)
            if (h >= MIN_EDITOR_H && h <= MAX_EDITOR_H) setEditorHeight(h)
            if (localStorage.getItem('SbConsoleCollapsed') === '1') setConsoleCollapsed(true)
            const r = parseFloat(localStorage.getItem('sb-player-ratio'))
            if (!isNaN(r) && r > 0.1 && r < 0.9) setPlayerRatio(r)
        } catch {}
    }, [])

    // ── 代码恢复：分享链接 > 文档带入 > 上次保存 ──
    useEffect(() => {
        try {
            const h = location.hash
            if (h.startsWith('#code=')) {
                const b64 = h.slice(6).replace(/-/g, '+').replace(/_/g, '/')
                const raw = atob(b64)
                setCode(new TextDecoder().decode(Uint8Array.from(raw, c => c.charCodeAt(0))))
                writeLog('🔗 已载入分享链接中的代码', false, 'green')
                return
            }
            const pending = localStorage.getItem('SbPendingCode')
            if (pending) {
                localStorage.removeItem('SbPendingCode')
                setCode(pending)
                if (!flagsRef.current.notExecute) {
                    pendingAutoRunRef.current = true
                    if (window.fdapi) { pendingAutoRunRef.current = false; setTimeout(() => doExecCode(), 200); writeLog('📄 已载入文档示例代码，正在自动执行…', false, 'green') }
                    else { writeLog('📄 已载入文档示例代码，连接就绪后将自动执行', false, 'green') }
                } else { writeLog('📄 已载入文档示例代码，点击「执行JS」运行', false, 'green') }
                return
            }
            const saved = localStorage.getItem('SbSavedCode')
            if (saved) setCode(saved)
        } catch {}
    }, [writeLog]) // eslint-disable-line react-hooks/exhaustive-deps

    // ── 代码自动保存 ──
    useEffect(() => {
        const t = setTimeout(() => { try { localStorage.setItem('SbSavedCode', code) } catch {} }, 500)
        return () => clearTimeout(t)
    }, [code])

    // ── 分享链接 ──
    const shareCode = useCallback(() => {
        try {
            const bytes = new TextEncoder().encode(codeRef.current)
            const b64 = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_')
            const url = location.origin + location.pathname + '#code=' + b64
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(
                    () => writeLog('🔗 分享链接已复制到剪贴板（' + url.length + ' 字符）', false, 'green'),
                    () => writeLog('复制失败，链接：' + url, false, 'orange')
                )
            } else { window.prompt('复制分享链接：', url) }
        } catch (e) { writeLog('生成分享链接失败: ' + e.message, false, 'red') }
    }, [writeLog])

    // ── 折叠日志区 ──
    const toggleConsole = () => {
        setConsoleCollapsed(c => { const next = !c; try { localStorage.setItem('SbConsoleCollapsed', next ? '1' : '0') } catch {}; return next })
    }

    // ── 禁止 Ctrl+滚轮缩放 ──
    useEffect(() => {
        const onWheel = e => { if (e.ctrlKey) e.preventDefault() }
        const onKey = e => { if ((e.ctrlKey || e.metaKey) && [61, 107, 173, 109, 187, 189].indexOf(e.keyCode) !== -1) e.preventDefault() }
        document.addEventListener('wheel', onWheel, { passive: false })
        document.addEventListener('keydown', onKey)
        return () => { document.removeEventListener('wheel', onWheel); document.removeEventListener('keydown', onKey) }
    }, [])

    // ── 执行 JS ──
    const doExecCode = useCallback(() => {
        if (!window.fdapi) { writeLog('⚠️ fdapi 未就绪，请先连接服务', false, 'red'); return }
        try { window.eval('(async ()=>{' + codeRef.current + '})()') }
        catch (e) { writeLog(e.message, false, 'red'); writeLog(e.stack, false, 'red') }
    }, [writeLog])

    // ── 参数面板调节 ──
    const tweakTimerRef = useRef(null)
    const onPanelTweak = useCallback(newCode => {
        setCode(newCode)
        if (flagsRef.current.notExecute || !window.fdapi) return
        clearTimeout(tweakTimerRef.current)
        tweakTimerRef.current = setTimeout(() => { try { window.eval('(async ()=>{' + newCode + '})()') } catch (e) { writeLog(e.message, false, 'red') } }, 250)
    }, [writeLog])

    // ── 执行 JSON ──
    const execJson = useCallback(jsonText => {
        try { const o = JSON.parse(jsonText); if (!o) { writeLog('JSON解析错误', false, 'red'); return }; window.fdapi.call(o) }
        catch (e) { writeLog(e.message, false, 'red'); writeLog(e.stack, false, 'red') }
    }, [writeLog])

    const doSendJson = useCallback(() => {
        if (!window.fdapi) { writeLog('⚠️ fdapi 未就绪', false, 'red'); return }
        const text = codeRef.current
        const cmdArr = matchCmdLog(text)
        if (cmdArr && cmdArr.length > 0) {
            const timestamps = cmdArr.map(cmd => { try { return JSON.parse(cmd).timestamp } catch { return 0 } })
            const diffs = calcTimeDiffs(timestamps)
            writeLog('▶ 日志回放：共 ' + cmdArr.length + ' 条命令', false, 'green')
            ;(async () => { for (let i = 0; i < cmdArr.length; i++) { try { window.fdapi.call(JSON.parse(cmdArr[i])) } catch (e) { writeLog(e.message, false, 'red') }; await sleep(diffs[i]) } })()
        } else { execJson(text) }
    }, [writeLog, execJson])

    // ── Ctrl+Enter ──
    useEffect(() => {
        const handler = e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); doExecCode() } }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [doExecCode])

    // ── 连接服务器 ──
    const IP_RE = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const connectServer = () => {
        if (!IP_RE.test(ip) || !/^\+?[1-9][0-9]*$/.test(port)) { writeLog('IP或端口格式不正确！', false, 'red'); return }
        if (!window.fdapi) { writeLog('⚠️ SDK 未加载', false, 'red'); return }
        try { window.fdapi.destroy(); window.fdapi.setHost(ip, port); window.fdapi.connectWebSocket(); setStatus('connecting'); writeLog('🔌 重新连接 ' + ip + ':' + port + ' ...') }
        catch (e) { writeLog(e.message, false, 'red') }
    }

    // ── 选择示例 ──
    const loadMethod = (item, m, key) => {
        setActiveMethod(key)
        setCode(m.code)
        if (!flagsRef.current.notExecute) {
            if (!window.fdapi) { writeLog('⚠️ fdapi 未就绪，代码已填入编辑器但未执行', false, 'orange'); return }
            try { window.eval('(async ()=>{' + m.code + '})()') } catch (e) { writeLog(e.message, false, 'red') }
        }
    }

    // ── 导航过滤 ──
    const navTree = coordSel === '1' ? examplesData.gcs : examplesData.pcs
    const q = searchQuery.trim().toLowerCase()
    const filteredCategories = navTree
        .map(cat => ({ ...cat, items: cat.items.map(it => {
            if (!q) return it
            const hitItem = it.name.toLowerCase().includes(q) || it.className.toLowerCase().includes(q) || (it.desc || '').toLowerCase().includes(q)
            return { ...it, methods: hitItem ? it.methods : it.methods.filter(m => m.name.toLowerCase().includes(q) || (m.tip || '').toLowerCase().includes(q)) }
        }).filter(it => it.methods.length > 0) }))
        .filter(cat => cat.items.length > 0)

    return (
        <div>
            <div className="sb-wrap">
                <ConnectionBar
                    status={status} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
                    isCloud={isCloud} setIsCloud={setIsCloud} ip={ip} setIp={setIp} port={port} setPort={setPort}
                    connectServer={connectServer} versionHtml={versionHtml} coordType={coordType} baseUrl={baseUrl}
                />

                <div className="sb-main">
                    <ExampleNav
                        sidebarOpen={sidebarOpen} coordSel={coordSel} setCoordSel={setCoordSel}
                        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                        filteredCategories={filteredCategories} openCats={openCats} setOpenCats={setOpenCats}
                        openItems={openItems} setOpenItems={setOpenItems} activeMethod={activeMethod}
                        loadMethod={loadMethod} serverVersion={serverVersion} notExecute={notExecute}
                    />

                    <PlayerPanel
                        ref={playerPanelRef} rightTab={rightTab} setRightTab={setRightTab}
                        isCloud={isCloud} status={status} fps={fps} code={code}
                        onPanelTweak={onPanelTweak} onInsertCode={code => { setCode(code); setRightTab('player') }}
                        playerRatio={playerRatio}
                    />

                    <div className={'sb-panel-divider' + (isDragging ? ' active' : '')} onMouseDown={onDividerMouseDown} title="拖拽调整面板宽度" />

                    <div ref={codePanelRef} style={{ flexGrow: 1 - playerRatio, flexShrink: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden', minWidth: 0 }}>
                        <EditorPanel
                            ref={editorPanelRef}
                            code={code} setCode={setCode} editorHeight={editorHeight} consoleCollapsed={consoleCollapsed}
                            notExecute={notExecute} setNotExecute={setNotExecute} doExecCode={doExecCode}
                            doSendJson={doSendJson} shareCode={shareCode}
                        />
                        <div className={'sb-h-divider' + (isDraggingH ? ' active' : '')} onMouseDown={onHDividerMouseDown} title="拖拽调整编辑器/日志高度" />
                        <ConsolePanel
                            ref={infoPanelRef} consoleCollapsed={consoleCollapsed} toggleConsole={toggleConsole}
                            autoClear={autoClear} setAutoClear={setAutoClear} logEnabled={logEnabled}
                            setLogEnabled={setLogEnabled} clearScreen={clearScreen}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
