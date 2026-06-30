import React, { useRef } from 'react'

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
                    return (
                        <div key={cat.id}>
                            <div className="sb-cat-hdr" onClick={() => setOpenCats(s => ({ ...s, [cat.id]: !catOpen }))}>
                                <span className="sb-cat-icon">{cat.icon}</span>
                                <span className="sb-cat-label">{cat.label}</span>
                                <span className="sb-cat-count">{cat.items.length}</span>
                                <span className={'sb-cat-arrow' + (catOpen ? ' open' : '')}>▶</span>
                            </div>
                            {catOpen && cat.items.map(it => {
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
