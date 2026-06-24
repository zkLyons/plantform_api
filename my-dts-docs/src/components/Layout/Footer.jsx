import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="border-t border-edge bg-surface">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-[#2d2926]">DTS Cloud Docs</span>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">DTS Cloud 数字孪生平台 API 文档系统</p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">快速链接</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/docs/tutorials/hello-world" className="text-sm text-muted hover:text-accent transition-smooth">
                                    快速开始
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs/tutorials/introduction" className="text-sm text-muted hover:text-accent transition-smooth">
                                    API 文档
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs/tutorials/architecture" className="text-sm text-muted hover:text-accent transition-smooth">
                                    架构概览
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">资源</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://github.com/zkLyons/plantform_apittps://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-accent transition-smooth">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted hover:text-accent transition-smooth">
                                    在线调试
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-muted hover:text-accent transition-smooth">
                                    更新日志
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-edge text-center">
                    <p className="text-xs text-muted">© 2026 飞渡科技 DTS Cloud. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
