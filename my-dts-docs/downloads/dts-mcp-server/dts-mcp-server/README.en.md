# dts-cloud-mcp

A **Model Context Protocol (MCP) server** that lets an AI assistant (e.g. Claude) query and control a **DTS (Digital Twin Scene)** cloud rendering engine.

DTS ships a browser-side JavaScript SDK (`DigitalTwinPlayer`) that cannot be called directly from a Node backend. This server launches a **headless browser via Puppeteer**, loads the DTS SDK in the page, connects to a DTS Cloud instance, and forwards AI commands to the engine — acting as a bridge between the AI and DTS Cloud.

> 中文版见 [README.md](./README.md)。

---

## Architecture

```
┌────────────┐   MCP/stdio   ┌─────────────────────────────┐
│ AI client  │ ────────────▶ │   dts-cloud-mcp (Node)      │
│  (Claude)  │ ◀──────────── │   src/index.js              │
└────────────┘  tool results └──────────────┬──────────────┘
                                             │
                  ┌──────────────────────────┼──────────────────────────┐
                  │                          │                          │
            REST (http.get)           Puppeteer headless          on-demand docs
            /manage/instance          DigitalTwinPlayer           /locale/zh/doc/*.html
            /manage/instance/free     → window.fdapi              /locale/zh/manager.html
                  │                    → window._dtsCall()         api_examples.js
                  ▼                          ▼                          ▼
            ┌─────────────────────────────────────────────────────────────┐
            │                      DTS Cloud server                         │
            │        rendering instances + REST mgmt API + online docs      │
            └─────────────────────────────────────────────────────────────┘
```

### Source layout (~1500 lines after cleanup)

| File | Responsibility |
|------|----------------|
| `src/index.js` | MCP server core: 7 tools, REST calls, Puppeteer connection and API forwarding |
| `src/doc-parser.js` | Parses DTS online API docs (JSDoc HTML) and example code; holds the 76-class index |
| `src/validator.js` | Pre-call parameter validation (required fields, nested properties) and default inference |

---

## How it works

1. **Connect** — `dts_connect` lists available rendering instances via REST (`/manage/instance`). A single instance is auto-selected; with multiple, the user can pick one or set `autoSelect` to grab a free instance.
2. **Establish session** — Puppeteer opens the instance page → injects the DTS SDK (`/libac`) → initializes `DigitalTwinPlayer` and waits for `onReady` (3 retries for slow-starting instances) → injects the `window._dtsCall` helper.
3. **Query docs** — `dts_doc` / `dts_api_example` fetch class docs and real example code from the server on demand, then cache them.
4. **Execute** — `dts_call` turns `{class, method, params}` into a real `fdapi.<class>.<method>(...)` call inside the browser context and returns the result.

---

## MCP tools

| Tool | Purpose |
|------|---------|
| `dts_connect` | Launch the headless browser and connect to a DTS Cloud instance. Accepts an explicit `iid`, lists instances for selection, or uses `autoSelect` to pick a free one. |
| `dts_manager_doc` | Fetch and parse the DTS Cloud management API docs (`/locale/zh/manager.html`), listing management REST/WebSocket endpoints; supports a `search` keyword filter. |
| `dts_disconnect` | Close the browser and clean up. |
| `dts_status` | Report connection status, server info, SDK version, coordinate system, and cached doc-class count. |
| `dts_doc` | Get docs for an API class/method (fetched from `/locale/zh/doc/{Class}.html`). Omit `class` or pass `list`/`help` to list all 76 classes. |
| `dts_api_example` | Get real example code for a class+method (from the debug page's `api_examples.js`). Recommended before `dts_call`. |
| `dts_call` | Execute a DTS SDK API call over the browser connection. |

### Parameter conventions

- **Add/update methods**: `{"class":"marker","method":"add","params":{"data":[{...}]}}` — payload goes under the `data` key.
- **Positional methods**: `{"class":"marker","method":"focusAll","params":{"distance":1000,"flyTime":2}}` — object values are passed as positional args in key order.
- **Colors**: DTS uses an RGBA array `[R,G,B,A]` with each channel in `0~1` (raw RGB divided by 255). E.g. red=`[1,0,0,1]`, blue=`[0,0,1,1]`, white=`[1,1,1,1]`. Do **not** use strings like `"Color.Red"` — the API cannot resolve them.

---

## Install & run

```bash
npm install
npm start            # equivalent to: node src/index.js  (starts the MCP server over stdio)
```

Dependencies: `@modelcontextprotocol/sdk`, `puppeteer`, `zod`.

Browser auto-detection order: env var `PUPPETEER_CHROME_PATH` first, then OS-specific common install paths for Edge/Chrome/Brave (Windows / macOS / Linux); on Linux/macOS it also tries `which` on `PATH`.

### Register as an MCP server (example)

```json
{
  "mcpServers": {
    "dts-cloud": {
      "command": "node",
      "args": ["src/index.js"],
      "env": { "PUPPETEER_CHROME_PATH": "C:/Program Files/Google/Chrome/Application/chrome.exe" }
    }
  }
}
```

Typical flow: `dts_connect` → `dts_doc` (check signature) → `dts_api_example` (see usage) → `dts_call` (execute) → `dts_disconnect`.

---

## Code review notes

### Fixed

- **Cross-server cache invalidation**: `docIndex` (docs) and `examplesCache` (examples) were global caches that never expired, so switching to another DTS server returned stale docs/examples from the previous one. Both now invalidate automatically when the target `host:port` changes, and reset when `dts_connect` switches servers.
- **Removed legacy dead code**: the local-Markdown parsers in `doc-parser.js` (`buildDocIndex`, `parseMethodDoc`, `parseClassDoc`, and helpers) plus the now-unused `fs`/`path` imports were removed; docs are sourced from DTS Cloud HTML at runtime.

### Still worth noting (unchanged)

- **Positional args depend on key order**: `_dtsCall` uses `Object.values(params)` to infer positional argument order, relying on the caller's object key insertion order.
- **No management-API auth**: `restGet` only does GET; endpoints marked "login required" (need `POST /manage/login` first) are not supported.
- **Fragile HTML parsing**: `doc-parser.js` relies heavily on regex over JSDoc HTML and is sensitive to structural changes.
- **Result truncation**: `dts_call` slices the return value to 30,000 chars, which can yield truncated (invalid) JSON in the preview for very large results.
- **`--no-sandbox`**: the headless browser launches with `--no-sandbox` — common, but evaluate the security impact in untrusted environments.

---

## License

See [LICENSE](./LICENSE).
