import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useDocsStore from '../../stores/docsStore'

const navLinks = [
    { to: '/', label: '首页' },
    { to: '/docs/tutorials/hello-world', label: '开发教程', matchPrefix: '/docs/tutorials' },
    { to: '/docs/api/quickstart/digital-twin-api', label: 'API 文档', matchPrefix: '/docs/api' }
]

export default function Header() {
    const location = useLocation()
    const toggleSidebar = useDocsStore(s => s.toggleSidebar)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-edge bg-base/90 backdrop-blur-md">
            <div className="flex items-center justify-between h-full px-4 lg:px-6 max-w-[1600px] mx-auto">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center group-hover:bg-accent-hover transition-smooth">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#2d2926] hidden sm:block">
                        DTS Cloud <span className="text-muted font-normal">Docs</span>
                    </span>
                </Link>

                {/* Nav links */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => {
                        const isActive = link.matchPrefix ? location.pathname.startsWith(link.matchPrefix) : location.pathname === '/'

                        return (
                            <Link key={link.to} to={link.to} className={`px-3 py-1.5 rounded-md text-sm transition-smooth ${isActive ? 'text-accent bg-accent/8 font-medium' : 'text-muted hover:text-[#2d2926] hover:bg-surface'}`}>
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Search hint */}
                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-edge text-muted text-sm hover:border-edge-hover hover:text-[#2d2926] transition-smooth bg-elevated">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <span>搜索文档</span>
                        <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-surface rounded border border-edge text-muted">⌘K</kbd>
                    </button>

                    {/* GitHub */}
                    <a href="https://github.com/zkLyons/plantform_api" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md text-muted hover:text-[#2d2926] hover:bg-surface transition-smooth" title="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </a>

                    {/* Mobile menu */}
                    <button onClick={toggleSidebar} className="p-2 rounded-md text-muted hover:text-[#2d2926] hover:bg-surface transition-smooth lg:hidden">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
