import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { search, warmupIndex } from '../../utils/search'

// 渲染带高亮的文本片段
function HighlightedSnippet({ snippet }) {
    if (!snippet || !snippet.highlights.length) {
        return <>{snippet?.text}</>
    }

    const parts = []
    let cursor = 0
    for (const [start, end] of snippet.highlights) {
        if (start > cursor) parts.push(<span key={cursor}>{snippet.text.slice(cursor, start)}</span>)
        parts.push(<mark key={`h-${start}`} className="bg-yellow-200 text-[#2d2926] rounded-sm px-0.5">{snippet.text.slice(start, end)}</mark>)
        cursor = end
    }
    if (cursor < snippet.text.length) parts.push(<span key={cursor}>{snippet.text.slice(cursor)}</span>)

    return <>{parts}</>
}

export default function SearchTrigger() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const inputRef = useRef(null)
    const panelRef = useRef(null)
    const debounceRef = useRef(null)
    const navigate = useNavigate()

    // Ctrl+K 聚焦搜索框
    useEffect(() => {
        const handleKeyDown = e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                inputRef.current?.focus()
                setOpen(true)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // 点击外部关闭下拉
    useEffect(() => {
        const handleClick = e => {
            if (panelRef.current && !panelRef.current.contains(e.target) && inputRef.current && !inputRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

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
                setOpen(true)
            } catch {
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 200)

        return () => clearTimeout(debounceRef.current)
    }, [query])

    const handleNavigate = useCallback(
        (slug, category) => {
            navigate(`/docs/${category}/${slug}`)
            setQuery('')
            setResults([])
            setOpen(false)
            inputRef.current?.blur()
        },
        [navigate]
    )

    // 键盘事件
    const handleKeyDown = e => {
        if (e.key === 'Escape') {
            setOpen(false)
            inputRef.current?.blur()
            return
        }
        if (!results.length) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => Math.min(results.length - 1, prev + 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => Math.max(0, prev - 1))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            const r = results[selectedIndex]
            if (r) handleNavigate(r.slug, r.category)
        }
    }

    const showPanel = open && query.trim().length > 0

    return (
        <div className="relative" ref={panelRef}>
            {/* 搜索输入框 */}
            <div className="flex items-center gap-2 w-52 px-3 py-1.5 rounded-md border border-edge bg-elevated text-sm transition-smooth focus-within:border-edge-hover focus-within:w-96">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim()) setOpen(true)
                        warmupIndex()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="搜索文档..."
                    className="flex-1 bg-transparent text-[#2d2926] outline-none placeholder:text-muted min-w-0"
                />
                <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-surface rounded border border-edge text-muted shrink-0">⌘K</kbd>
            </div>

            {/* 搜索结果下拉面板 */}
            {showPanel && (
                <div className="absolute top-full right-0 mt-1 w-96 max-h-80 overflow-y-auto bg-base rounded-lg shadow-xl border border-edge z-50">
                    {loading && <div className="px-4 py-6 text-center text-sm text-muted">搜索中...</div>}

                    {!loading && results.length === 0 && <div className="px-4 py-6 text-center text-sm text-muted">未找到相关文档</div>}

                    {!loading &&
                        results.map((result, index) => (
                            <div key={`${result.category}-${result.slug}`} className={`px-4 py-2.5 cursor-pointer transition-smooth ${index === selectedIndex ? 'bg-accent/8' : 'hover:bg-surface'}`} onClick={() => handleNavigate(result.slug, result.category)} onMouseEnter={() => setSelectedIndex(index)}>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-sm font-medium text-[#2d2926] truncate">{result.sidebar_label || result.title}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface text-muted border border-edge shrink-0">{result.groupLabel || result.categoryLabel}</span>
                                </div>
                                {result.snippet && <p className="text-xs text-muted line-clamp-1 leading-relaxed"><HighlightedSnippet snippet={result.snippet} /></p>}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
