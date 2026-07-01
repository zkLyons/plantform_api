import React, { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Extract headings (h2/h3) from the .prose container after markdown renders.
 * Renders a sticky TOC on the right side with active-state tracking.
 */
export default function TableOfContents() {
    const [headings, setHeadings] = useState([])
    const [activeId, setActiveId] = useState('')
    const observerRef = useRef(null)

    // Scan DOM for headings once content renders
    useEffect(() => {
        const timer = setTimeout(() => {
            const container = document.querySelector('.prose')
            if (!container) return

            const nodes = container.querySelectorAll('h2, h3')
            const items = Array.from(nodes).map(el => {
                // Generate a stable id from text content
                const text = el.textContent || ''
                const displayText = text.replace(/\([^)]*\)/g, '').trim()
                const id = text
                    .toLowerCase()
                    .replace(/[^\w一-鿿]+/g, '-')
                    .replace(/^-|-$/g, '')
                if (!el.id) el.id = id
                return { id: el.id, text: displayText, level: el.tagName === 'H2' ? 2 : 3 }
            })
            setHeadings(items)
        }, 100)
        return () => clearTimeout(timer)
    }, [useParams_key()])

    // Intersection observer for active heading
    useEffect(() => {
        if (headings.length === 0) return

        const callback = entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id)
                }
            }
        }

        const observer = new IntersectionObserver(callback, {
            rootMargin: '-80px 0px -70% 0px',
            threshold: 0
        })

        headings.forEach(h => {
            const el = document.getElementById(h.id)
            if (el) observer.observe(el)
        })

        observerRef.current = observer
        return () => observer.disconnect()
    }, [headings])

    const scrollTo = useCallback(id => {
        const el = document.getElementById(id)
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }, [])

    if (headings.length === 0) return null

    return (
        <nav className="hidden xl:block w-56 shrink-0" aria-label="目录导航">
            <div className="sticky top-24 pl-4 border-l border-edge max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-3">本页目录</h4>
                <ul className="space-y-1">
                    {headings.map(h => (
                        <li key={h.id}>
                            <button onClick={() => scrollTo(h.id)} className={`block w-full text-left text-[12px] mt-3 leading-snug transition-smooth ${h.level === 3 ? 'pl-3' : ''} ${activeId === h.id ? 'text-accent font-medium' : 'text-muted hover:text-[#2d2926]'}`}>
                                {h.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

/** Stable key: re-run heading extraction when category/slug changes */
function useParams_key() {
    const path = typeof window !== 'undefined' ? window.location.pathname : ''
    return path
}
