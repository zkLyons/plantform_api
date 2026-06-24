import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import remarkHeadingIds from '../utils/remark-heading-ids'
import { useDoc, useDocTitle } from '../hooks/useDocs'
import TableOfContents from '../components/Markdown/TableOfContents'

export default function DocPage() {
  const { category, '*': wildcard } = useParams()
  const slug = wildcard || ''

  const { content, loading, error } = useDoc(category, slug)
  const meta = useDocTitle(category, slug)

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
        <p className="text-muted text-sm">
          请检查 URL 是否正确，或返回首页重新开始。
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-8 max-w-6xl mx-auto px-6 py-10">
      {/* Main content */}
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-8">
          <span>文档</span>
          <span className="text-edge-hover">/</span>
          <span>{category === 'tutorials' ? '开发教程' : 'API 文档'}</span>
          <span className="text-edge-hover">/</span>
          <span className="text-[#2d2926]">{meta?.sidebar_label || slug}</span>
        </nav>

        {/* Content */}
        <article className="prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkHeadingIds]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              a({ href, children, ...props }) {
                if (href && href.startsWith('/')) {
                  return <a href={href} {...props}>{children}</a>
                }
                return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
              },
              code({ className, children, ...props }) {
                return <code className={className} {...props}>{children}</code>
              },
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
