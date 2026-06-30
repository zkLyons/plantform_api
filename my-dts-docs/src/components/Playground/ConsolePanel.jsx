import React, { forwardRef } from 'react'

const ConsolePanel = forwardRef(function ConsolePanel({
    consoleCollapsed, toggleConsole,
    autoClear, setAutoClear, logEnabled, setLogEnabled, clearScreen
}, ref) {
    return (
        <div className={'sb-console' + (consoleCollapsed ? ' collapsed' : '')}>
            <div className="sb-console-hdr">
                <span className="sb-console-toggle" onClick={toggleConsole} title={consoleCollapsed ? '展开日志区' : '折叠日志区'}>
                    <span className={'sb-console-arrow' + (consoleCollapsed ? '' : ' open')}>▶</span>
                    <span className="sb-console-label">输出日志</span>
                </span>
                {!consoleCollapsed && (
                    <>
                        <label className="sb-check" title="日志积累到一定量后自动清除">
                            <input type="checkbox" checked={autoClear} onChange={e => setAutoClear(e.target.checked)} />
                            自动清屏
                        </label>
                        <label className="sb-check" title="关闭后避免日志输出太多影响性能">
                            <input type="checkbox" checked={logEnabled} onChange={e => setLogEnabled(e.target.checked)} />
                            开启日志
                        </label>
                        <button className="sb-console-clr" onClick={clearScreen}>清除日志</button>
                    </>
                )}
            </div>
            <pre className="sb-infopanel" ref={ref} style={{ display: consoleCollapsed ? 'none' : 'block' }} />
        </div>
    )
})

export default ConsolePanel
