import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
        <div className="flex items-center gap-4">
          <Link to="/docs/tutorials/hello-world" className="hover:text-accent transition-smooth">快速开始</Link>
          <Link to="/docs/tutorials/introduction" className="hover:text-accent transition-smooth">API 文档</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-smooth">GitHub</a>
        </div>
        <span>© 2026 飞渡科技 DTS Cloud</span>
      </div>
    </footer>
  )
}
