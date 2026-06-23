import React, { useState, useEffect } from 'react'

// Import test documents as raw strings
import helloWorld from '../data/docs/tutorials/hello-world.md?raw'
import introduction from '../data/docs/tutorials/introduction.md?raw'
import architecture from '../data/docs/tutorials/architecture.md?raw'

const docMap = {
  'tutorials/hello-world': helloWorld,
  'tutorials/introduction': introduction,
  'tutorials/architecture': architecture,
}

const docMeta = [
  {
    category: 'tutorials',
    label: '开发教程',
    docs: [
      { slug: 'hello-world', title: '快速开始', sidebar_label: '快速开始' },
      { slug: 'introduction', title: '基本概念', sidebar_label: '基本概念' },
      { slug: 'architecture', title: '架构概览', sidebar_label: '架构概览' },
    ],
  },
]

export function useDoc(category, slug) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const key = `${category}/${slug}`
    const raw = docMap[key]

    if (raw) {
      // Strip frontmatter
      const stripped = raw.replace(/^---[\s\S]*?---\n*/, '')
      setContent(stripped)
      setLoading(false)
    } else {
      setError('文档未找到')
      setLoading(false)
    }
  }, [category, slug])

  return { content, loading, error }
}

export function useDocTitle(category, slug) {
  const group = docMeta.find((g) => g.category === category)
  if (!group) return null
  const doc = group.docs.find((d) => d.slug === slug)
  return doc || null
}

export { docMeta }
