// SDK 工具模块 —— 动态加载、连接初始化、全局函数注入

export function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.src = src
        s.onload = resolve
        s.onerror = () => reject(new Error('加载失败: ' + src))
        document.head.appendChild(s)
    })
}

export const sleep = ms => new Promise(r => setTimeout(r, ms))

export const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const matchCmdLog = text => text.match(new RegExp('{"__command.*?__playerId":.*?}', 'g'))

export const calcTimeDiffs = arr => arr.map((cur, i, a) => (i === 0 ? 0 : cur - a[i - 1]))

// 注入全局工具函数（示例代码依赖）
export function injectGlobalFunctions(writeLog, clearScreen) {
    window.log = (msg, noLineBreak, color) => writeLog(msg, noLineBreak, color)
    window.logWithColor = (color, text, noLineBreak) => writeLog(text, noLineBreak, color)
    window.clearScreen = clearScreen
    window.sleep = sleep
    window.exeFunction = (fn, ms) => setTimeout(fn, ms)
}

// 加载 SDK 配置和核心库
export async function loadSdk(baseUrl, writeLog) {
    if (!window.__dtsSdkLoaded) {
        try {
            await loadScript(baseUrl + 'ac_conf.js')
        } catch { /* ac_conf.js 可选 */ }
        if (!window.HostConfig) {
            window.HostConfig = { API: '127.0.0.1:4321', Player: '127.0.0.1:8889', Path: '' }
            writeLog('⚠️ 未找到 ac_conf.js，使用默认 HostConfig: ' + JSON.stringify(window.HostConfig), false, 'orange')
        }
        await loadScript(baseUrl + 'ac.min.js')
        window.__dtsSdkLoaded = true
    }
}

// 销毁 SDK 实例
export function destroySdk() {
    try { window.fdplayer && window.fdplayer.destroy && window.fdplayer.destroy() } catch {}
    try { window.fdapi && window.fdapi.destroy && window.fdapi.destroy() } catch {}
    window.fdplayer = undefined
    window.fdapi = undefined
    const p = document.getElementById('player')
    if (p) p.innerHTML = ''
}

// 初始化连接（云渲染 / WebSocket）
export function initConnection({ isCloud, apiOptions, writeLog, setStatus, setIp, setPort }) {
    const HostConfig = window.HostConfig
    const urlParams = new URLSearchParams(window.location.search)
    setStatus('connecting')

    if (isCloud && typeof window.DigitalTwinPlayer === 'function') {
        const options = {
            domId: 'player',
            iid: urlParams.get('iid'),
            pid: urlParams.get('pid'),
            reset: urlParams.get('reset'),
            apiOptions,
            keyEventTarget: 'video',
            useBuiltinCursors: true,
            password: urlParams.get('password'),
            enableApiCallLog: urlParams.get('apilog'),
            ui: {
                startupInfo: true,
                statusIndicator: true,
                statusButton: true,
                fullscreenButton: true,
                homeButton: true,
                taskListBar: 1,
                debugEventsPanel: urlParams.get('debugEventsPanel')
            },
            events: {
                onVideoLoaded: () => writeLog('🎞️ 视频流已加载', false, 'green'),
                onConnClose: e => {
                    writeLog('connection closed: ' + e.code, false, 'red')
                    setStatus('error')
                },
                onRtcStatsReport: stats => apiOptions._onFps && apiOptions._onFps(stats.framesPerSecond || 0)
            }
        }

        let playerHost = HostConfig.Player
        if (window.location.protocol !== 'file:') {
            if (HostConfig.Player.indexOf(window.location.hostname) === -1 && HostConfig.PlayerMapping) {
                playerHost = HostConfig.PlayerMapping
            }
        }

        try {
            window.fdplayer = new window.DigitalTwinPlayer(playerHost, options)
            window.fdapi = window.fdplayer.getAPI()
            const host = window.fdplayer.getHost ? window.fdplayer.getHost() : playerHost
            setIp(host.split(':')[0] || '')
            setPort(host.split(':')[1] || '')
        } catch (e) {
            setStatus('error')
            writeLog('DigitalTwinPlayer 初始化失败: ' + e.message, false, 'red')
            return false
        }
    } else if (typeof window.DigitalTwinAPI === 'function') {
        const hostApi = HostConfig.API || '127.0.0.1:4321'
        setIp(hostApi.split(':')[0])
        setPort(hostApi.split(':')[1] || '4321')
        try {
            window.fdapi = new window.DigitalTwinAPI(hostApi, apiOptions)
        } catch (e) {
            setStatus('error')
            writeLog('DigitalTwinAPI 初始化失败: ' + e.message, false, 'red')
            return false
        }
    } else {
        setStatus('no-sdk')
        return false
    }

    if (window.acapi && window.acapi.VERSION) {
        apiOptions._onVersion && apiOptions._onVersion(String(window.acapi.VERSION))
    }
    writeLog('🔌 正在连接 ' + (isCloud ? '云渲染服务（视频流）' : 'WebSocket API 服务') + ' ...')
    return true
}
