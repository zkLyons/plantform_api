import React, { useRef } from 'react'

// 分类名称 → 文档首页路径
const CAT_DOC_MAP = {
    '核心对象': '/docs/api/quickstart/digital-twin-api',
    '相机操作': '/docs/api/camera/camera',
    '图层操作': '/docs/api/layer/tile-layer',
    '绘制助手': '/docs/api/measure/edit-helper',
    '测量分析': '/docs/api/analysis/tools',
    '环境天气': '/docs/api/weather/weather',
    '系统设置': '/docs/api/settings/settings',
    '辅助工具': '/docs/api/utils/coord',
    '模型操作': '/docs/api/model/custom-mesh',
    '场景标记': '/docs/api/marker/marker',
    '矢量图形': '/docs/api/vector/polyline',
    '覆盖物': '/docs/api/overlay/heatmap',
    '海洋仿真': '/docs/api/ocean/ocean-heatmap',
    '水文仿真': '/docs/api/hydro/dynamic-water',
    '信号仿真': '/docs/api/signal/antenna',
    '交通仿真': '/docs/api/traffic/vehicle',
    '有限元仿真': '/docs/api/fem/finite-element',
    '战场仿真': '/docs/api/battle/plot',
    '压力测试': '/docs/api/quickstart/digital-twin-api',
}

export default function ExampleNav({
    sidebarOpen, coordSel, setCoordSel, searchQuery, setSearchQuery,
    filteredCategories, openCats, setOpenCats, openItems, setOpenItems,
    activeMethod, loadMethod, serverVersion, notExecute
}) {
    const navRef = useRef(null)
    const q = searchQuery.trim().toLowerCase()

    return (
        <aside className={'sb-sidebar' + (sidebarOpen ? '' : ' collapsed')}>
            <div className="sb-search">
                <div className="sb-seg">
                    <button className={'sb-seg-btn' + (coordSel === '0' ? ' active' : '')} onClick={() => setCoordSel('0')} title="投影坐标系工程的示例">
                        投影坐标系
                    </button>
                    <button className={'sb-seg-btn' + (coordSel === '1' ? ' active' : '')} onClick={() => setCoordSel('1')} title="球面坐标系工程的示例">
                        球面坐标系
                    </button>
                </div>
                <input type="text" className="sb-search-input" placeholder="搜索 类 / 方法..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>

            <nav className="sb-nav" ref={navRef}>
                {filteredCategories.map(cat => {
                    const catOpen = q ? true : !!openCats[cat.id]
                    const docPath = CAT_DOC_MAP[cat.label]
                    return (
                        <div key={cat.id}>
                            <div className="sb-cat-hdr" onClick={() => setOpenCats(s => ({ ...s, [cat.id]: !catOpen }))}>
                                <span className="sb-cat-icon">{cat.icon}</span>
                                <span className="sb-cat-label">{cat.label}</span>
                                <span className="sb-cat-count">{cat.items.length}</span>
                                <span className={'sb-cat-arrow' + (catOpen ? ' open' : '')}>▶</span>
                            </div>
                            {catOpen && (
                                <>
                                    {docPath && (
                                        <div className="sb-api-help" onClick={() => window.open(docPath, '_blank')} title={'查看 ' + cat.label + ' API 文档'}>
                                            📖 API 帮助
                                        </div>
                                    )}
                                    {cat.items.map(it => {
                                        const itemOpen = q ? true : !!openItems[it.id]
                                        return (
                                            <div key={it.id} id={'nav-item-' + it.id}>
                                                <div className={'sb-class' + (itemOpen ? ' open' : '')} onClick={() => setOpenItems(s => ({ ...s, [it.id]: !itemOpen }))}>
                                                    <div className="sb-class-name">
                                                        {it.className} <span style={{ opacity: 0.6 }}>· {it.name}</span>
                                                    </div>
                                                    {it.desc ? <div className="sb-class-desc">{it.desc}</div> : null}
                                                </div>
                                                {itemOpen && it.methods.map((m, mi) => {
                                                    const key = it.id + '::' + mi
                                                    return (
                                                        <div key={key} className={'sb-method' + (activeMethod === key ? ' active' : '')} onClick={() => loadMethod(it, m, key)} title={m.tip || (notExecute ? '填入编辑器（不执行）' : '填入编辑器并执行')}>
                                                            {m.name}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                    )
                })}
            </nav>

            <div className="sb-footer">
                <span>Version: <strong>{serverVersion || '—'}</strong></span>
            </div>
        </aside>
    )
}
