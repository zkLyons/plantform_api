import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import remarkHeadingIds from '../utils/remark-heading-ids'
import { useDoc } from '../hooks/useDocs'
import Breadcrumb from '../components/Layout/Breadcrumb'
import TableOfContents from '../components/Markdown/TableOfContents'

export default function DocPage() {
    const { category, '*': wildcard } = useParams()
    const slug = wildcard || ''
    // category = 'tutorials' 或 'api'
    // wildcard = 'hello-world' 等

    // 根据给定的 category (类别) 和 slug (唯一标识)，Hook 向外部（调用它的组件）返回一个包含当前文档内容、加载状态和错误信息的对象。content是对应的文档内容md，去除了顶部的frontmatter标识数据。
    const { content, loading, error } = useDoc(category, slug)

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-5 h-5 border-2 border-edge border-t-accent rounded-full animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <div className="text-4xl mb-4">📄</div>
                <h2 className="text-xl font-semibold mb-2 text-[#1a1714]">{error}</h2>
                <p className="text-muted text-sm">请检查 URL 是否正确，或返回首页重新开始。</p>
            </div>
        )
    }

    return (
        <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-3xl">
                <Breadcrumb />

                {/* Content */}
                <article className="prose">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkHeadingIds]}
                        rehypePlugins={[rehypeHighlight]}
                        // component是 react-markdown 一个非常强大的功能，它允许你用自己的 React 组件来替换默认渲染的 HTML 元素。在这个文件中，它自定义了 <a> 和 <code> 标签的行为
                        components={{
                            a({ href, children, ...props }) {
                                // Anchor link — same page scroll
                                console.log('href:', href, 'children', children, 'props', props, '------+++++*******')

                                if (href && href.startsWith('#')) {
                                    return (
                                        <a
                                            href={href}
                                            onClick={e => {
                                                e.preventDefault()
                                                const el = document.getElementById(href.slice(1))
                                                if (el) {
                                                    const y = el.getBoundingClientRect().top + window.scrollY - 80
                                                    window.scrollTo({ top: y, behavior: 'smooth' })
                                                    window.history.replaceState(null, '', href)
                                                }
                                            }}
                                            {...props}
                                        >
                                            {children}
                                        </a>
                                    )
                                }
                                // Internal link
                                if (href && href.startsWith('/')) {
                                    return (
                                        <a href={href} {...props}>
                                            {children}
                                        </a>
                                    )
                                }
                                // External link
                                return (
                                    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                                        {children}
                                    </a>
                                )
                            },
                            code({ className, children, ...props }) {
                                const isBlock = className && /language-/.test(className)
                                if (isBlock) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <code className={className} {...props}>{children}</code>
                                            <button
                                                onClick={() => {
                                                    const extractText = (node) => {
                                                        if (typeof node === 'string' || typeof node === 'number') return String(node)
                                                        if (Array.isArray(node)) return node.map(extractText).join('')
                                                        if (node?.props?.children) return extractText(node.props.children)
                                                        return ''
                                                    }
                                                    const code = extractText(children).replace(/\n$/, '')
                                                    const b64 = btoa(unescape(encodeURIComponent(code)))
                                                        .replace(/\+/g, '-').replace(/\//g, '_')
                                                    window.open('/playground#code=' + b64, '_blank')
                                                }}
                                                style={{
                                                    display: 'block',
                                                    marginTop: '6px',
                                                    padding: '4px 12px',
                                                    background: 'rgba(196,93,44,0.1)',
                                                    border: '1px solid rgba(196,93,44,0.3)',
                                                    borderRadius: '6px',
                                                    color: '#c45d2c',
                                                    fontSize: '0.75rem',
                                                    cursor: 'pointer',
                                                    fontFamily: 'inherit',
                                                    fontWeight: 600
                                                }}
                                            >
                                                ▶ 试一试
                                            </button>
                                        </div>
                                    )
                                }
                                return (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </article>
            </div>

            {/* Table of Contents */}
            <TableOfContents />
        </div>
    )
}
