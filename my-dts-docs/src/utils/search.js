import Fuse from 'fuse.js'
import { docMeta } from '../hooks/useDocs'

// ── 懒加载所有 markdown 文件 ──
const allDocFiles = import.meta.glob('../data/docs/**/*.md', { query: '?raw', import: 'default' })

let fuseInstance = null
let indexReady = false

// 从 docMeta 中提取所有文档的扁平列表（含分组信息）
function flattenDocMeta() {
    const result = []

    for (const category of docMeta) {
        if (category.groups) {
            // API 文档：有嵌套分组
            for (const group of category.groups) {
                for (const doc of group.docs) {
                    result.push({
                        slug: doc.slug,
                        title: doc.title,
                        sidebar_label: doc.sidebar_label,
                        category: category.category,
                        categoryLabel: category.label,
                        groupLabel: group.label,
                    })
                }
            }
        } else {
            // 教程文档：扁平列表
            for (const doc of category.docs) {
                result.push({
                    slug: doc.slug,
                    title: doc.title,
                    sidebar_label: doc.sidebar_label,
                    category: category.category,
                    categoryLabel: category.label,
                    groupLabel: null,
                })
            }
        }
    }

    return result
}

// 构建文件路径
function resolveDocPath(category, slug) {
    if (category === 'tutorials') return `../data/docs/tutorials/${slug}.md`
    return `../data/docs/api/${slug}.md`
}

// 去除 frontmatter
function stripFrontmatter(raw) {
    return raw.replace(/^---[\s\S]*?---\n*/, '')
}

// 提取纯文本（去掉 markdown 语法）
function stripMarkdown(md) {
    return md
        .replace(/```[\s\S]*?```/g, '')       // 代码块
        .replace(/`[^`]+`/g, '')               // 行内代码
        .replace(/#{1,6}\s*/g, '')             // 标题
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
        .replace(/[*_~]+/g, '')                // 加粗/斜体/删除线
        .replace(/>\s*/g, '')                  // 引用
        .replace(/[-*+]\s/g, '')               // 列表标记
        .replace(/\n{2,}/g, '\n')              // 多余空行
        .trim()
}

// 加载并构建搜索索引
async function buildIndex() {
    const metaList = flattenDocMeta()
    const entries = []

    // 并行加载所有文件
    const loadPromises = metaList.map(async (meta) => {
        const path = resolveDocPath(meta.category, meta.slug)
        const loader = allDocFiles[path]
        if (!loader) return null

        try {
            const raw = await loader()
            const content = stripMarkdown(stripFrontmatter(raw))
            return { ...meta, content }
        } catch {
            return null
        }
    })

    const loaded = await Promise.all(loadPromises)
    entries.push(...loaded.filter(Boolean))

    fuseInstance = new Fuse(entries, {
        keys: [
            { name: 'title', weight: 0.4 },
            { name: 'sidebar_label', weight: 0.3 },
            { name: 'content', weight: 0.2 },
            { name: 'groupLabel', weight: 0.1 },
        ],
        threshold: 0.35,
        includeMatches: true,
        minMatchCharLength: 1,
        ignoreLocation: true,
    })

    indexReady = true
    return fuseInstance
}

// 执行搜索
export async function search(query) {
    if (!query || !query.trim()) return []

    if (!indexReady) {
        await buildIndex()
    }

    const results = fuseInstance.search(query.trim())

    return results.map(({ item, matches }) => ({
        slug: item.slug,
        title: item.title,
        sidebar_label: item.sidebar_label,
        category: item.category,
        categoryLabel: item.categoryLabel,
        groupLabel: item.groupLabel,
        // 截取匹配附近的内容片段作为摘要
        snippet: buildSnippet(item.content, matches),
        matches,
    }))
}

// 从匹配位置生成摘要
function buildSnippet(content, matches) {
    const contentMatch = matches?.find(m => m.key === 'content')
    if (!contentMatch || !contentMatch.indices.length) {
        return content.substring(0, 120)
    }

    // 取第一个匹配位置，前后各扩展40字符
    const [start] = contentMatch.indices[0]
    const sliceStart = Math.max(0, start - 40)
    const sliceEnd = Math.min(content.length, start + 80)
    let snippet = content.slice(sliceStart, sliceEnd)

    if (sliceStart > 0) snippet = '...' + snippet
    if (sliceEnd < content.length) snippet += '...'

    return snippet
}

// 预热索引（可选，进入页面后提前构建）
export function warmupIndex() {
    if (!indexReady) buildIndex()
}
