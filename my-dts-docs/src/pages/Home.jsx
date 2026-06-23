import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'API 文档',
    desc: '92 个 API 类，覆盖相机、图层、仿真、分析等完整能力',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    to: '/docs/tutorials/hello-world',
  },
  {
    title: '在线调试',
    desc: '浏览器端代码沙箱，实时调用 API 并查看输出',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    to: '#',
  },
  {
    title: 'AI 助手',
    desc: '智能代码生成，多模型集成，API 白名单验证',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93" />
        <path d="M8.24 9.93A4 4 0 0112 2" />
        <circle cx="12" cy="14" r="4" />
        <path d="M12 18v4" />
        <path d="M8 22h8" />
      </svg>
    ),
    to: '#',
  },
  {
    title: '图层管理',
    desc: '3DT 倾斜摄影、BIM、矢量数据、影像服务统一管理',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    to: '#',
  },
]

const stats = [
  { value: '92', label: 'API 类' },
  { value: '500+', label: '方法数' },
  { value: '107', label: '文档页' },
  { value: '20+', label: '功能分类' },
]

const quickLinks = [
  { label: '快速开始', to: '/docs/tutorials/hello-world' },
  { label: '基本概念', to: '/docs/tutorials/introduction' },
  { label: '架构概览', to: '/docs/tutorials/architecture' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.35]" style={{
          backgroundImage: 'radial-gradient(circle, #c45d2c 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black 10%, transparent 80%)',
        }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-edge bg-elevated text-muted text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            v3.0 已发布
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="text-[#1a1714]">DTS Cloud</span>
            <br />
            <span className="text-accent">
              数字孪生 API 文档
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            飞渡科技云渲染数字孪生平台 JavaScript SDK 完整参考。
            覆盖相机、图层、仿真、分析等 92 个 API 类，500+ 方法。
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/docs/tutorials/hello-world"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-smooth"
            >
              快速开始
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/docs/tutorials/architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-edge text-muted font-medium text-sm bg-elevated hover:border-edge-hover hover:text-[#2d2926] transition-smooth"
            >
              架构概览
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-edge bg-surface">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 tabular-nums">{stat.value}</div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-xl font-semibold text-center mb-10 text-[#1a1714]">核心能力</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group relative p-5 rounded-xl border border-edge bg-elevated hover:border-edge-hover hover:shadow-sm transition-smooth"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/8 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/12 transition-smooth">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-[#2d2926] mb-1.5">{f.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-base font-medium mb-4 text-[#2d2926]">快速链接</h2>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 rounded-lg border border-edge text-sm text-muted bg-elevated hover:text-accent hover:border-accent/30 transition-smooth"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
