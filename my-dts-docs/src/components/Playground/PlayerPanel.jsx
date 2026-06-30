import React, { forwardRef } from 'react'
import AIChat from './AIChat'
import ParamPanel from './ParamPanel'

const PlayerPanel = forwardRef(function PlayerPanel({
    rightTab, setRightTab, isCloud, status, fps, code, onPanelTweak, onInsertCode, playerRatio
}, ref) {
    return (
        <aside className="sb-right" ref={ref} style={{ flexGrow: playerRatio, flexShrink: 1, flexBasis: 0 }}>
            <div className="sb-right-tabs">
                <div className={'sb-right-tab' + (rightTab === 'player' ? ' active' : '')} onClick={() => setRightTab('player')}>
                    实时画面
                </div>
                <div className={'sb-right-tab' + (rightTab === 'ai' ? ' active' : '')} onClick={() => setRightTab('ai')}>
                    AI 助手
                </div>
            </div>

            <div className="sb-right-content">
                {/* 视频流面板 */}
                <div className="sb-pane" style={{ display: rightTab === 'player' ? 'flex' : 'none' }}>
                    <div className="sb-player-hdr">
                        <span className="sb-player-label">实时画面</span>
                        <span className="sb-hud-chip">{isCloud ? '云渲染视频流' : '仅 API 模式'}</span>
                        {isCloud && fps > 0 && <span className="sb-hud-chip">FPS {fps}</span>}
                    </div>
                    {/* player 容器必须保持无 React 子节点：SDK 会向其中注入 video 元素 */}
                    <div className="sb-player-box">
                        <div id="player" />
                        <ParamPanel code={code} onTweak={onPanelTweak} />
                        {(status === 'no-sdk' || !isCloud) && (
                            <div className="sb-player-empty">
                                {status === 'no-sdk' ? (
                                    <>
                                        <span style={{ fontSize: '2rem' }}>📦</span>
                                        <span>未找到 ac.min.js / ac_conf.js</span>
                                        <span>请从 DTS SDK 安装目录复制到本工程 public/ 目录后刷新</span>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '2rem' }}>🔌</span>
                                        <span>WebSocket（仅API）模式不传输视频流</span>
                                        <span>画面请在 DTS Explorer / Cloud 客户端中查看</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* AI 助手面板 */}
                <div className="sb-pane" style={{ display: rightTab === 'ai' ? 'flex' : 'none' }}>
                    <AIChat onInsertCode={onInsertCode} />
                </div>
            </div>
        </aside>
    )
})

export default PlayerPanel
