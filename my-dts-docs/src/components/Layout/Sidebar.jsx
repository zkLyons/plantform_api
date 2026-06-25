import React, { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import useDocsStore from '../../stores/docsStore'
import { docMeta } from '../../hooks/useDocs'

function ChevronIcon({ open }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
            <path d="M9 18l6-6-6-6" />
        </svg>
    )
}

function SidebarSection({ label, docs, pathPrefix, labelClassName }) {
    const location = useLocation()
    const [open, setOpen] = useState(true)

    return (
        <div className="mb-2">
            <button onClick={() => setOpen(!open)} className={`flex items-center gap-2 w-full px-3 py-2 text-muted hover:text-[#2d2926] transition-smooth ${labelClassName}`}>
                <ChevronIcon open={open} />
                {label}
            </button>
            {open && (
                <ul className="ml-3 border-l border-edge">
                    {docs.map(doc => {
                        const path = `${pathPrefix}/${doc.slug}`
                        const isActive = location.pathname === path
                        return (
                            <li key={doc.slug}>
                                <Link to={path} className={`block px-4 py-1.5 text-[13px] transition-smooth -ml-[1px] border-l-2 ${isActive ? 'text-accent border-accent bg-accent/5 font-medium' : 'text-muted border-transparent hover:text-[#2d2926] hover:border-edge-hover'}`}>
                                    {doc.sidebar_label || doc.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

function ApiSidebar() {
    // 找到关于api部分的目录。
    const group = docMeta.find(g => g.category === 'api')
    if (!group) return null

    return (
        <div className="mb-2">
            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">{group.label}</div>
            {group.groups.map(g => (
                <SidebarSection
                    key={g.label}
                    label={g.label}
                    docs={g.docs}
                    pathPrefix="/docs/api"
                    // Note the different styling for the group label
                    labelClassName="text-[11px] font-medium py-1.5"
                />
            ))}
        </div>
    )
}

export default function Sidebar() {
    const sidebarOpen = useDocsStore(s => s.sidebarOpen)
    const setSidebarOpen = useDocsStore(s => s.setSidebarOpen)
    // 获取“教程”部分的目录。
    const tutorialsGroup = docMeta.find(g => g.category === 'tutorials')

    return (
        <>
            {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            <aside className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-64px)] w-64 shrink-0 border-r border-edge bg-base overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden lg:border-0'}`}>
                <nav className="p-4 pt-3">
                    {tutorialsGroup && (
                        <SidebarSection
                            label={tutorialsGroup.label}
                            docs={tutorialsGroup.docs}
                            pathPrefix="/docs/tutorials"
                            // Styling for the top-level category label
                            labelClassName="text-[11px] font-semibold uppercase tracking-wider"
                        />
                    )}
                    <ApiSidebar />
                </nav>
            </aside>
        </>
    )
}
