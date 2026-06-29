import React, { useState, useEffect } from 'react'
import SearchModal from './SearchModal'
import { warmupIndex } from '../../utils/search'

export default function SearchTrigger() {
    const [isOpen, setIsOpen] = useState(false)

    // 全局快捷键：Ctrl+K 打开，ESC 关闭
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl+K / Cmd+K 打开搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            // ESC 关闭搜索（仅在没有 SearchModal 内部处理时兜底）
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    // 鼠标悬停时预热搜索索引
    const handleWarmup = () => warmupIndex()

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                onMouseEnter={handleWarmup}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-edge text-muted text-sm hover:border-edge-hover hover:text-[#2d2926] transition-smooth bg-elevated"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <span>搜索文档</span>
                <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-surface rounded border border-edge text-muted">⌘K</kbd>
            </button>

            <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
