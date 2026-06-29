import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { search } from '../../utils/search'

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef(null)
    const listRef = useRef(null)
    const navigate = useNavigate()
    const debounceRef = useRef(null)

    // 聚焦输入框
    useEffect(() => {
        if (isOpen) {
            setQuery('')
            setResults([])
            setSelectedIndex(0)
            // 延迟一帧确保 DOM 已渲染
            requestAnimationFrame(() => inputRef.current?.focus())
        }
    }, [isOpen])

    // 搜索（防抖）
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)

        if (!query.trim()) {
            setResults([])
            setLoading(false)
            return
        }

        setLoading(true)
        debounceRef.current = setTimeout(async () => {
            try {
                const r = await search(query)
                setResults(r)
                setSelectedIndex(0)
            } catch {
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 200)

        return () => clearTimeout(debounceRef.current)
    }, [query])

    // 滚动选中项到可见区域
    useEffect(() => {
        if (!listRef.current) return
        const items = listRef.current.children
        if (items[selectedIndex]) {
            items[selectedIndex].scrollIntoView({ block: 'nearest' })
        }
    }, [selectedIndex])

    const handleNavigate = useCallback((slug, category) => {
        navigate(`/docs/${category}/${slug}`)
        onClose()
    }, [navigate, onClose])

    // 键盘事件
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Escape':
                onClose()
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex(prev => Math.max(0, prev - 1))
                break
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex(prev => Math.min(results.length - 1, prev + 1))
                break
            case 'Enter':
                e.preventDefault()
                if (results[selectedIndex]) {
                    handleNavigate(results[selectedIndex].slug, results[selectedIndex].category)
                }
                break
        }
    }

    // 点击遮罩关闭
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm"
            onClick={handleOverlayClick}
        >
            <div className="w-full max-w-2xl mx-4 bg-base rounded-xl shadow-2xl border border-edge overflow-hidden">
                {/* 搜索输入框 */}
                <div className="flex items-center gap-3 px-4 h-12 border-b border-edge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="搜索文档..."
                        className="flex-1 bg-transparent text-sm text-[#2d2926] outline-none placeholder:text-muted"
                    />
                    {query && (
                        <button onClick={() => setQuery('')} className="text-muted hover:text-[#2d2926] transition-smooth">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* 搜索结果 */}
                <div ref={listRef} className="max-h-80 overflow-y-auto">
                    {/* 空状态 */}
                    {query.trim() && !loading && results.length === 0 && (
                        <div className="px-4 py-10 text-center text-sm text-muted">
                            未找到相关文档
                        </div>
                    )}

                    {/* 加载中 */}
                    {loading && (
                        <div className="px-4 py-6 text-center text-sm text-muted">
                            搜索中...
                        </div>
                    )}

                    {/* 结果列表 */}
                    {results.map((result, index) => (
                        <div
                            key={`${result.category}-${result.slug}`}
                            className={`px-4 py-3 cursor-pointer transition-smooth ${index === selectedIndex ? 'bg-accent/8' : 'hover:bg-surface'}`}
                            onClick={() => handleNavigate(result.slug, result.category)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-[#2d2926]">
                                    {result.sidebar_label || result.title}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface text-muted border border-edge">
                                    {result.categoryLabel}
                                </span>
                                {result.groupLabel && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface text-muted border border-edge">
                                        {result.groupLabel}
                                    </span>
                                )}
                            </div>
                            {result.snippet && (
                                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                                    {result.snippet}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* 底部快捷键提示 */}
                <div className="flex items-center gap-4 px-4 py-2 border-t border-edge text-[11px] text-muted">
                    <span><kbd className="px-1 py-0.5 rounded border border-edge bg-surface">↑↓</kbd> 导航</span>
                    <span><kbd className="px-1 py-0.5 rounded border border-edge bg-surface">↵</kbd> 选择</span>
                    <span><kbd className="px-1 py-0.5 rounded border border-edge bg-surface">Esc</kbd> 关闭</span>
                </div>
            </div>
        </div>
    )
}
