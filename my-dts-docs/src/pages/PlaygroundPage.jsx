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
    // 日志面板dom实例
    const infoPanelRef = useRef(null)
    // 记录当前已打印的日志条数
    const logTimesRef = useRef(0)
    // 始终持有最新的编辑器代码字符串
    const codeRef = useRef(code)
    codeRef.current = code
    // 一个”状态旗帜”的集合，把 autoClear, logEnabled, notExecute 这几个布尔 state 捆绑在一起
    const flagsRef = useRef({})
    flagsRef.current = { autoClear, logEnabled, notExecute }
    // playerPanelRef, codePanelRef, editorPanelRef:分别引用播放器面板、右侧代码区面板、编辑器面板的 DOM 节点。
    const playerPanelRef = useRef(null)
    const codePanelRef = useRef(null)
    const editorPanelRef = useRef(null)
    // 分别存储垂直和水平拖拽条的拖拽状态信息。
    const dragRef = useRef(null)
    const hDragRef = useRef(null)

    // ── 日志 ──
    const writeLog = useCallback((msg, noLineBreak, color) => {
        const el = infoPanelRef.current
        if (!el || !flagsRef.current.logEnabled) return
        // 超过 100 条日志时自动清空
        if (flagsRef.current.autoClear && ++logTimesRef.current > 100) {
            logTimesRef.current = 0
            el.innerHTML = ''
        }
        // 日志内容中包含 HTML 标签时，直接插入 HTML，否则转义后插入文本
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
        import('../data/sandbox/real-examples').then(mod => setExamplesData({ pcs: mod.SANDBOX_CATEGORIES || [], gcs: mod.SANDBOX_CATEGORIES_GCS || [] })).catch(() => {})
    }, [])

    // ── 面板拖拽 ──
    const onDividerMouseDown = useCallback(e => {
        e.preventDefault()
        // .getBoundingClientRect(): 这是一个标准的浏览器 DOM API。当在一个 DOM 元素上调用它时，它会返回一个包含该元素尺寸和位置信息的对象，其中包括 width, height, top, left 等属性。
        const playerW = playerPanelRef.current?.getBoundingClientRect().width ?? 0
        const codeW = codePanelRef.current?.getBoundingClientRect().width ?? 0
        const total = playerW + codeW
        if (total <= 0) return
        // dragRef.current: 这是一个 React 的 ref 对象，用于在组件的生命周期中保持对某个值的引用。在这里，它被用来存储拖拽操作的初始状态，包括鼠标按下时的 X 坐标、播放器面板的初始宽度以及播放器和代码面板的总宽度。
        dragRef.current = { startX: e.clientX, startPlayerW: playerW, total }
        setIsDragging(true)
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
    }, [])

    // 该函数使用 useEffect 来设置和清理全局的鼠标移动和鼠标释放事件监听器，以实现拖拽调整播放器和代码面板宽度的功能。
    // 第二个参数是一个空数组 []，意味着这个钩子内的代码只会在组件首次挂载（mount）时执行一次。
    // 这段代码通过 useEffect 在组件挂载时设置了两个全局的鼠标事件监听器（mousemove 和 mouseup）。当用户在分隔条上按下鼠标（onDividerMouseDown）时，它记录下拖拽的初始状态。随后，mousemove 事件会持续计算新的面板比例并更新UI，而 mouseup 事件则会结束整个拖拽过程并清理状态。
    useEffect(() => {
        const onMove = e => {
            if (!dragRef.current) return
            const { startX, startPlayerW, total } = dragRef.current
            let ratio = (startPlayerW + (e.clientX - startX)) / total
            ratio = Math.max(0.2, Math.min(0.8, ratio))
            // 更新 React state，触发组件重渲染，使面板的宽度（通过 flex-grow 实现）根据新的比例进行调整
            setPlayerRatio(ratio)
            try {
                localStorage.setItem('sb-player-ratio', String(ratio))
            } catch {}
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
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
        }
    }, [])

    // ── 水平拖拽（编辑器/日志高度分配） ──
    // // 使用 useCallback(..., []) 将函数包裹起来，确保它只在组件首次渲染时创建一次，
    // 避免不必要的函数重建，是一种性能优化
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
            try {
                localStorage.setItem('CodeMirrorHeight', String(editorHeight))
            } catch {}
        }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseup', onUp)
        }
    }, [editorHeight])

    // ── SDK 加载 + 连接 ──
    // 这个 useEffect 会在组件首次加载时运行一次。此外，它的依赖项是 [isCloud]，这意味着每当用户在“云渲染”和“WebSocket”模式之间切换时，这个钩子都会重新执行
    useEffect(() => {
        let disposed = false

        const apiOptions = {
            onReady: coordSystemType => {
                if (disposed) return
                setStatus('ready')
                setCoordType(String(coordSystemType ?? '0'))
                setCoordSel(String(coordSystemType ?? '0'))
                writeLog('✅ 工程已就绪，可以调用 API（坐标系类型：' + (String(coordSystemType) === '1' ? '球面' : '投影') + '）', false, 'green')
            },
            // 左下角版本号显示。
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
            _onVersion: v => {
                setVersionHtml(v2 => v2 || v)
                setServerVersion(v2 => v2 || v)
            }
        }

        ;(async () => {
            // 1. 注入全局函数，如 log(), sleep()
            injectGlobalFunctions(writeLog, clearScreen)
            //2. 尝试加载 SDK 核心脚本
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

        return () => {
            disposed = true
            destroySdk()
        }
    }, [isCloud]) // eslint-disable-line react-hooks/exhaustive-deps

    // ── 恢复 localStorage 状态 ──
    // 它的核心作用是在页面加载时，从浏览器的 localStorage 中读取并恢复用户上一次的布局设置，以提供一种持久化的、个性化的用户体验。
    useEffect(() => {
        try {
            const h = parseInt(localStorage.getItem('CodeMirrorHeight'), 10)
            if (h >= MIN_EDITOR_H && h <= MAX_EDITOR_H) setEditorHeight(h)
            if (localStorage.getItem('SbConsoleCollapsed') === '1') setConsoleCollapsed(true)
            const r = parseFloat(localStorage.getItem('sb-player-ratio'))
            if (!isNaN(r) && r > 0.1 && r < 0.9) setPlayerRatio(r)
        } catch {}
    }, [])

    // ── 代码恢复：分享链接 > 上次保存 ──
    useEffect(() => {
        try {
            // 1. 检查 URL hash 是否包含分享的代码（文档"试一试"按钮走此路径）
            const h = location.hash
            if (h.startsWith('#code=')) {
                const b64 = h.slice(6).replace(/-/g, '+').replace(/_/g, '/')
                const raw = atob(b64)
                setCode(new TextDecoder().decode(Uint8Array.from(raw, c => c.charCodeAt(0))))
                writeLog('🔗 已载入分享链接中的代码', false, 'green')
                return
            }

            // 2. 加载上一次自动保存的代码
            const saved = localStorage.getItem('SbSavedCode')
            if (saved) setCode(saved)
        } catch {}
    }, [writeLog]) // eslint-disable-line react-hooks/exhaustive-deps

    // ── 代码自动保存 ──
    useEffect(() => {
        const t = setTimeout(() => {
            try {
                localStorage.setItem('SbSavedCode', code)
            } catch {}
        }, 500)
        return () => clearTimeout(t)
    }, [code])

    // ── 分享链接 ──
    const shareCode = useCallback(() => {
        try {
            const bytes = new TextEncoder().encode(codeRef.current)
            const b64 = btoa(String.fromCharCode(...bytes))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
            const url = location.origin + location.pathname + '#code=' + b64
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(
                    () => writeLog('🔗 分享链接已复制到剪贴板（' + url.length + ' 字符）', false, 'green'),
                    () => writeLog('复制失败，链接：' + url, false, 'orange')
                )
            } else {
                window.prompt('复制分享链接：', url)
            }
        } catch (e) {
            writeLog('生成分享链接失败: ' + e.message, false, 'red')
        }
    }, [writeLog])

    // ── 折叠日志区 ──
    const toggleConsole = () => {
        // useState的函数式更新：setConsoleCollapsed(c => !c) 这种写法是 React 中 useState 的一种函数式更新方式。它的作用是根据当前的状态值 c 来计算并返回新的状态值。在这个例子中，它会将 consoleCollapsed 的布尔值取反，从而实现日志区的折叠和展开。
        setConsoleCollapsed(c => {
            const next = !c
            try {
                localStorage.setItem('SbConsoleCollapsed', next ? '1' : '0')
            } catch {}
            return next
        })
    }

    // ── 禁止 Ctrl+滚轮缩放 ──
    useEffect(() => {
        const onWheel = e => {
            if (e.ctrlKey) e.preventDefault()
        }
        const onKey = e => {
            if ((e.ctrlKey || e.metaKey) && [61, 107, 173, 109, 187, 189].indexOf(e.keyCode) !== -1) e.preventDefault()
        }
        document.addEventListener('wheel', onWheel, { passive: false })
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('wheel', onWheel)
            document.removeEventListener('keydown', onKey)
        }
    }, [])

    // ── 执行 JS ──
    const doExecCode = useCallback(() => {
        if (!window.fdapi) {
            writeLog('⚠️ fdapi 未就绪，请先连接服务', false, 'red')
            return
        }
        try {
            // window.eval() 是一个 JavaScript 的内置函数，它的作用非常直接：接收一个字符串作为参数，并将这个字符串当作 JavaScript 代码在浏览器来执行。
            window.eval('(async ()=>{' + codeRef.current + '})()')
        } catch (e) {
            writeLog(e.message, false, 'red')
            writeLog(e.stack, false, 'red')
        }
    }, [writeLog])

    // ── 参数面板调节 ──
    const tweakTimerRef = useRef(null)
    const onPanelTweak = useCallback(
        newCode => {
            setCode(newCode)
            if (flagsRef.current.notExecute || !window.fdapi) return
            clearTimeout(tweakTimerRef.current)
            tweakTimerRef.current = setTimeout(() => {
                try {
                    window.eval('(async ()=>{' + newCode + '})()')
                } catch (e) {
                    writeLog(e.message, false, 'red')
                }
            }, 250)
        },
        [writeLog]
    )

    // ── 执行 JSON ──
    const execJson = useCallback(
        jsonText => {
            try {
                const o = JSON.parse(jsonText)
                if (!o) {
                    writeLog('JSON解析错误', false, 'red')
                    return
                }
                window.fdapi.call(o)
            } catch (e) {
                writeLog(e.message, false, 'red')
                writeLog(e.stack, false, 'red')
            }
        },
        [writeLog]
    )

    // 代码编辑框执行json
    const doSendJson = useCallback(() => {
        if (!window.fdapi) {
            writeLog('⚠️ fdapi 未就绪', false, 'red')
            return
        }
        const text = codeRef.current
        const cmdArr = matchCmdLog(text)
        if (cmdArr && cmdArr.length > 0) {
            const timestamps = cmdArr.map(cmd => {
                try {
                    return JSON.parse(cmd).timestamp
                } catch {
                    return 0
                }
            })
            const diffs = calcTimeDiffs(timestamps)
            writeLog('▶ 日志回放：共 ' + cmdArr.length + ' 条命令', false, 'green')
            ;(async () => {
                for (let i = 0; i < cmdArr.length; i++) {
                    try {
                        window.fdapi.call(JSON.parse(cmdArr[i]))
                    } catch (e) {
                        writeLog(e.message, false, 'red')
                    }
                    await sleep(diffs[i])
                }
            })()
        } else {
            execJson(text)
        }
    }, [writeLog, execJson])

    // ── Ctrl+Enter ──
    useEffect(() => {
        const handler = e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault()
                doExecCode()
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [doExecCode])

    // ── 连接服务器 ──
    const IP_RE = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const connectServer = () => {
        if (!IP_RE.test(ip) || !/^\+?[1-9][0-9]*$/.test(port)) {
            writeLog('IP或端口格式不正确！', false, 'red')
            return
        }
        if (!window.fdapi) {
            writeLog('⚠️ SDK 未加载', false, 'red')
            return
        }
        try {
            window.fdapi.destroy()
            window.fdapi.setHost(ip, port)
            window.fdapi.connectWebSocket()
            setStatus('connecting')
            writeLog('🔌 重新连接 ' + ip + ':' + port + ' ...')
        } catch (e) {
            writeLog(e.message, false, 'red')
        }
    }

    // ── 选择示例 ──
    const loadMethod = (item, m, key) => {
        setActiveMethod(key)
        setCode(m.code)
        if (!flagsRef.current.notExecute) {
            if (!window.fdapi) {
                writeLog('⚠️ fdapi 未就绪，代码已填入编辑器但未执行', false, 'orange')
                return
            }
            try {
                window.eval('(async ()=>{' + m.code + '})()')
            } catch (e) {
                writeLog(e.message, false, 'red')
            }
        }
    }

    // ── 导航过滤 ──
    const navTree = coordSel === '1' ? examplesData.gcs : examplesData.pcs
    const q = searchQuery.trim().toLowerCase()
    const filteredCategories = navTree
        .map(cat => ({
            ...cat,
            items: cat.items
                .map(it => {
                    if (!q) return it
                    const hitItem = it.name.toLowerCase().includes(q) || it.className.toLowerCase().includes(q) || (it.desc || '').toLowerCase().includes(q)
                    return { ...it, methods: hitItem ? it.methods : it.methods.filter(m => m.name.toLowerCase().includes(q) || (m.tip || '').toLowerCase().includes(q)) }
                })
                .filter(it => it.methods.length > 0)
        }))
        .filter(cat => cat.items.length > 0)

    return (
        <div>
            <div className="sb-wrap">
                <ConnectionBar status={status} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isCloud={isCloud} setIsCloud={setIsCloud} ip={ip} setIp={setIp} port={port} setPort={setPort} connectServer={connectServer} versionHtml={versionHtml} coordType={coordType} baseUrl={baseUrl} />

                <div className="sb-main">
                    <ExampleNav sidebarOpen={sidebarOpen} coordSel={coordSel} setCoordSel={setCoordSel} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredCategories={filteredCategories} openCats={openCats} setOpenCats={setOpenCats} openItems={openItems} setOpenItems={setOpenItems} activeMethod={activeMethod} loadMethod={loadMethod} serverVersion={serverVersion} notExecute={notExecute} />

                    <PlayerPanel
                        ref={playerPanelRef}
                        rightTab={rightTab}
                        setRightTab={setRightTab}
                        isCloud={isCloud}
                        status={status}
                        fps={fps}
                        code={code}
                        onPanelTweak={onPanelTweak}
                        onInsertCode={code => {
                            setCode(code)
                            setRightTab('player')
                        }}
                        playerRatio={playerRatio}
                    />

                    <div className={'sb-panel-divider' + (isDragging ? ' active' : '')} onMouseDown={onDividerMouseDown} title="拖拽调整面板宽度" />

                    <div ref={codePanelRef} style={{ flexGrow: 1 - playerRatio, flexShrink: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden', minWidth: 0 }}>
                        <EditorPanel ref={editorPanelRef} code={code} setCode={setCode} editorHeight={editorHeight} consoleCollapsed={consoleCollapsed} notExecute={notExecute} setNotExecute={setNotExecute} doExecCode={doExecCode} doSendJson={doSendJson} shareCode={shareCode} />

                        {!consoleCollapsed && <div className={'sb-h-divider' + (isDraggingH ? ' active' : '')} onMouseDown={onHDividerMouseDown} title="拖拽调整编辑器/日志高度" />}

                        <ConsolePanel ref={infoPanelRef} consoleCollapsed={consoleCollapsed} toggleConsole={toggleConsole} autoClear={autoClear} setAutoClear={setAutoClear} logEnabled={logEnabled} setLogEnabled={setLogEnabled} clearScreen={clearScreen} />
                    </div>
                </div>
            </div>
        </div>
    )
}
