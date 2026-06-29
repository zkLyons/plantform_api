import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { docMeta } from '../../hooks/useDocs'

// 根据 category 和 slug 查找文档所在的分组信息
function findDocContext(category, slug) {
    if (category === 'tutorials') {
        const group = docMeta.find(g => g.category === 'tutorials')
        const doc = group?.docs.find(d => d.slug === slug)
        return { categoryLabel: group?.label || '开发教程', groupLabel: null, doc }
    }

    if (category === 'api') {
        const group = docMeta.find(g => g.category === 'api')
        if (!group) return { categoryLabel: 'API 文档', groupLabel: null, doc: null }

        for (const g of group.groups) {
            const doc = g.docs.find(d => d.slug === slug)
            if (doc) {
                return { categoryLabel: group.label, groupLabel: g.label, doc }
            }
        }
    }

    return { categoryLabel: null, groupLabel: null, doc: null }
}

export default function Breadcrumb() {
    const { category, '*': wildcard } = useParams()
    const slug = wildcard || ''
    const { categoryLabel, groupLabel, doc } = findDocContext(category, slug)

    const crumbs = [{ label: '文档', to: '/' }, { label: categoryLabel }]

    // API 文档多一层分组
    if (groupLabel) {
        crumbs.push({ label: groupLabel })
    }

    // 当前文档（最后一级，不可点击）
    crumbs.push({ label: doc?.sidebar_label || doc?.title || slug })

    return (
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-8">
            {crumbs.map((crumb, i) => (
                /**
                 * 在 React 中，当你在一个循环里返回多个 JSX 元素时，需要用一个父元素把它们包裹起来。
                    使用 <React.Fragment> (或者其简写 <>...</>) 可以在不向最终的 HTML 添加额外 DOM 节点（如 <div>）的情况下，完成这个
                 */
                <React.Fragment key={i}>
                    {i > 0 && <span className="text-edge-hover">/</span>}
                    {crumb.to ? (
                        <Link to={crumb.to} className="hover:text-[#2d2926] transition-smooth">
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className={i === crumbs.length - 1 ? 'text-[#2d2926]' : ''}>{crumb.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}
