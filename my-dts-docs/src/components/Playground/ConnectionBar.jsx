import React from 'react'
import { Link } from 'react-router-dom'

const STATUS_META = {
    loading: { color: '#8b9cad', text: '加载SDK...' },
    'no-sdk': { color: '#ff5f57', text: '未找到SDK' },
    connecting: { color: '#febc2e', text: '连接中' },
    ready: { color: '#28c840', text: '已就绪' },
    error: { color: '#ff5f57', text: '连接异常' }
}

export default function ConnectionBar({
    status, sidebarOpen, setSidebarOpen,
    isCloud, setIsCloud, ip, setIp, port, setPort,
    connectServer, versionHtml, coordType, baseUrl
}) {
    const meta = STATUS_META[status] || STATUS_META.loading

    return (
        <div className="sb-connbar">
            <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={() => setSidebarOpen(!sidebarOpen)} title="切换API导航面板">
                {sidebarOpen ? '◀' : '▶'} 导航
            </button>
            <span className="sb-logo-text">DTS · 在线调试</span>
            <span className="sb-status-dot" style={{ background: meta.color, color: meta.color }} />
            <span className="sb-status-text">{meta.text}</span>

            <span className="sb-divider" />

            <span className="sb-conn-group">
                模式
                <select className="sb-select" value={isCloud ? 'cloud' : 'api'} onChange={e => setIsCloud(e.target.value === 'cloud')}>
                    <option value="cloud">云渲染（视频流）</option>
                    <option value="api">WebSocket（仅API）</option>
                </select>
            </span>

            <span className="sb-conn-group">
                IP <input className="sb-input sb-input-ip" value={ip} disabled={isCloud} onChange={e => setIp(e.target.value)} />
                Port <input className="sb-input sb-input-port" value={port} disabled={isCloud} onChange={e => setPort(e.target.value)} />
                {!isCloud && (
                    <button className="sb-btn sb-btn-ghost sb-btn-sm" onClick={connectServer}>连接</button>
                )}
            </span>

            <span className="sb-ver">
                Version: <span dangerouslySetInnerHTML={{ __html: versionHtml || '—' }} />
            </span>

            {coordType !== '' && <span className="sb-chip">{coordType === '1' ? '球面坐标系' : '投影坐标系'}</span>}

            <span className="sb-links">
                <a className="sb-link" href={baseUrl + 'dts-sdk.d.ts'} download title="下载 fdapi 的 TypeScript 类型声明">
                    TS 类型声明 ⬇
                </a>
                <Link className="sb-link" to="/docs/api/quickstart/digital-twin-api">
                    API 文档 ↗
                </Link>
            </span>
        </div>
    )
}
