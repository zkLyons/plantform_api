# React 学习指南 - 基于 DTS Docs 项目

## 📚 目录

- [项目概述](#项目概述)
- [技术栈说明](#技术栈说明)
- [项目架构](#项目架构)
- [核心概念详解](#核心概念详解)
- [学习路径](#学习路径)
- [文件详解与知识点](#文件详解与知识点)
- [实践练习](#实践练习)
- [常见问题](#常见问题)

---

## 项目概述

本项目是一个 **React + Vite + Tailwind CSS** 构建的文档网站，用于展示 DTS Cloud（数字孪生平台）的 API 文档。

### 项目特点

- **现代化技术栈**：React 18 + Vite 5 + Tailwind CSS 4
- **轻量级状态管理**：使用 Zustand
- **Markdown 文档渲染**：React Markdown + Rehype/Remark 插件
- **响应式设计**：支持移动端适配

---

## 技术栈说明

### 核心框架

| 技术 | 版本 | 用途 | 学习优先级 |
|------|------|------|-----------|
| React | 18.3.1 | UI 组件化开发 | ⭐⭐⭐ 必学 |
| Vite | 5.4.19 | 构建工具 | ⭐⭐ 了解 |
| Tailwind CSS | 4.0.0 | 样式框架 | ⭐⭐ 了解 |

### 路由与状态管理

| 技术 | 版本 | 用途 |
|------|------|------|
| React Router | 6.28.0 | 页面路由管理 |
| Zustand | 5.0.0 | 轻量级状态管理 |

### 文档渲染

| 技术 | 版本 | 用途 |
|------|------|------|
| React Markdown | 9.0.3 | Markdown 渲染 |
| Rehype Highlight | 7.0.2 | 代码高亮 |
| Remark GFM | 4.0.0 | GitHub 风格 Markdown |

---

## 项目架构

### 目录结构

```
my-dts-docs/
├── src/
│   ├── main.jsx              # 入口文件（React 挂载点）
│   ├── App.jsx               # 根组件（路由配置）
│   │
│   ├── pages/                # 页面组件
│   │   ├── Home.jsx          # 首页
│   │   └── DocPage.jsx       # 文档详情页
│   │
│   ├── components/           # 可复用组件
│   │   ├── Layout/
│   │   │   ├── Header.jsx    # 顶部导航栏
│   │   │   ├── Sidebar.jsx   # 左侧边栏
│   │   │   └── Footer.jsx    # 底部
│   │   └── Markdown/
│   │       └── TableOfContents.jsx
│   │
│   ├── hooks/                # 自定义 Hooks
│   │   └── useDocs.js        # 文档加载逻辑
│   │
│   ├── stores/               # 状态管理
│   │   └── docsStore.js      # Zustand Store
│   │
│   ├── styles/               # 样式
│   │   └── global.css
│   │
│   ├── data/                 # 文档数据
│   │   └── docs/
│   │       ├── tutorials/    # 教程文档（.md）
│   │       └── api/          # API 文档（.md）
│   │
│   └── utils/                # 工具函数
│       └── remark-heading-ids.js
│
├── index.html
├── vite.config.js
└── package.json
```

### 架构图

```
┌─────────────────────────────────────────────────────────┐
│                      main.jsx                          │
│                    (React 入口)                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                       App.jsx                          │
│                  (路由 + 布局配置)                       │
└─────────────────────────────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
    ┌──────────┐      ┌──────────┐      ┌──────────┐
    │  Header  │      │ Sidebar  │      │  Footer  │
    │ (导航栏) │      │ (侧边栏) │      │ (底部)   │
    └──────────┘      └──────────┘      └──────────┘
          │                 │
          ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│                     Routes                             │
│  ┌──────────────┐        ┌──────────────┐              │
│  │   Home.jsx   │        │  DocPage.jsx │              │
│  │    (首页)    │        │  (文档页)    │              │
│  └──────────────┘        └──────────────┘              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Hooks + Store                        │
│  ┌──────────────┐        ┌──────────────┐              │
│  │  useDocs.js  │        │ docsStore.js │              │
│  │ (文档加载)   │        │ (状态管理)   │              │
│  └──────────────┘        └──────────────┘              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     Data                               │
│  ┌──────────────┐        ┌──────────────┐              │
│  │ tutorials/   │        │    api/      │              │
│  │ (教程文档)   │        │ (API文档)    │              │
│  └──────────────┘        └──────────────┘              │
└─────────────────────────────────────────────────────────┘
```

---

## 核心概念详解

### 1. 组件化（Component）

**什么是组件？**
组件是 React 的核心概念，是可复用的 UI 代码块。

**项目示例：**
```jsx
// Home.jsx - 首页组件
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero 区域 */}
      <section>...</section>
      
      {/* 统计数据 */}
      <section>...</section>
      
      {/* 功能卡片 */}
      <section>...</section>
    </div>
  )
}
```

**知识点：**
- 函数组件是 React 的主流写法
- 组件名必须大写（如 `Home` 而不是 `home`）
- 组件可以嵌套组合

---

### 2. JSX 语法

**什么是 JSX？**
JSX 是 JavaScript 的语法扩展，允许在 JS 中写 HTML-like 代码。

**项目示例：**
```jsx
// Header.jsx
<header className="fixed top-0 left-0 right-0 z-50 h-16">
  <div className="flex items-center justify-between">
    {/* JSX 中使用 {} 插入表达式 */}
    <Link to="/" className="flex items-center gap-2.5">
      <span className="text-sm font-semibold">
        DTS Cloud <span className="text-muted">Docs</span>
      </span>
    </Link>
  </div>
</header>
```

**知识点：**
- `{}` 中可以写任何 JavaScript 表达式
- `className` 代替 HTML 的 `class`
- `htmlFor` 代替 HTML 的 `for`
- 必须有单一根元素

---

### 3. Props（属性）

**什么是 Props？**
Props 是组件之间传递数据的方式。

**项目示例：**
```jsx
// Sidebar.jsx
function SidebarCategory({ category, label, docs }) {
  return (
    <div className="mb-2">
      <button>{label}</button>
      {docs.map((doc) => (
        <Link to={`/docs/${category}/${doc.slug}`}>
          {doc.sidebar_label}
        </Link>
      ))}
    </div>
  )
}

// 使用组件时传递 props
<SidebarCategory 
  category="tutorials" 
  label="开发教程" 
  docs={[...]} 
/>
```

**知识点：**
- Props 是只读的，不能修改
- 可以解构 props：`{ category, label, docs }`
- Props 可以传递任何类型：字符串、数字、对象、函数

---

### 4. useState（状态）

**什么是 State？**
State 是组件内部的数据，变化时会触发重新渲染。

**项目示例：**
```jsx
// Sidebar.jsx
import { useState } from 'react'

function SidebarCategory({ category, label, docs }) {
  // useState 返回 [当前值, 更新函数]
  const [open, setOpen] = useState(true)

  return (
    <div className="mb-2">
      <button onClick={() => setOpen(!open)}>
        {open ? '收起' : '展开'}
      </button>
      {open && (
        <ul>
          {docs.map((doc) => (
            <li key={doc.slug}>{doc.sidebar_label}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

**知识点：**
- `useState(initialValue)` 初始化状态
- 返回数组 `[state, setState]`
- 调用 `setState` 会触发组件重新渲染
- 状态更新是异步的

---

### 5. useEffect（副作用）

**什么是 Effect？**
Effect 用于处理副作用：数据获取、订阅、定时器等。

**项目示例：**
```jsx
// useDocs.js
import { useState, useEffect } from 'react'

export function useDoc(category, slug) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // useEffect 处理副作用
  useEffect(() => {
    setLoading(true)
    setError(null)

    const path = resolveDocPath(category, slug)
    const loader = allDocs[path]

    if (loader) {
      loader().then((raw) => {
        const stripped = raw.replace(/^---[\s\S]*?---\n*/, '')
        setContent(stripped)
        setLoading(false)
      }).catch(() => {
        setError('文档加载失败')
        setLoading(false)
      })
    } else {
      setError('文档未找到')
      setLoading(false)
    }
  }, [category, slug])  // 依赖数组

  return { content, loading, error }
}
```

**知识点：**
- `useEffect(() => {}, [])` 空数组 = 组件挂载时执行
- `useEffect(() => {}, [dep])` 依赖变化时执行
- 返回函数 = 组件卸载时清理
- 避免无限循环：依赖数组要正确

---

### 6. 自定义 Hook

**什么是自定义 Hook？**
将可复用的逻辑抽取到自定义 Hook 中。

**项目示例：**
```jsx
// useDocs.js
export function useDoc(category, slug) {
  // ... 逻辑代码
  return { content, loading, error }
}

export function useDocTitle(category, slug) {
  // ... 逻辑代码
  return docInfo
}

// 在组件中使用
export default function DocPage() {
  const { category, '*': wildcard } = useParams()
  const slug = wildcard || ''

  const { content, loading, error } = useDoc(category, slug)
  const meta = useDocTitle(category, slug)

  // ...
}
```

**知识点：**
- 自定义 Hook 以 `use` 开头
- 可以使用其他 Hook
- 封装复用逻辑，保持组件简洁

---

### 7. 路由（React Router）

**什么是路由？**
路由用于根据 URL 显示不同的页面。

**项目示例：**
```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:category/*" element={<DocLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

// DocPage.jsx
import { useParams } from 'react-router-dom'

export default function DocPage() {
  const { category, '*': wildcard } = useParams()
  // category = 'tutorials' 或 'api'
  // wildcard = 'hello-world' 等
}
```

**知识点：**
- `<Route>` 定义路由规则
- `:param` 是动态参数
- `*` 是通配符（匹配任意路径）
- `useParams()` 获取路由参数
- `<Link>` 用于页面跳转

---

### 8. 状态管理（Zustand）

**什么是状态管理？**
跨组件共享数据，避免 Props 逐层传递。

**项目示例：**
```jsx
// docsStore.js
import { create } from 'zustand'

const useDocsStore = create((set) => ({
  sidebarOpen: true,
  currentDoc: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentDoc: (doc) => set({ currentDoc: doc }),
}))

export default useDocsStore

// Header.jsx
import useDocsStore from '../../stores/docsStore'

export default function Header() {
  const toggleSidebar = useDocsStore(s => s.toggleSidebar)

  return (
    <button onClick={toggleSidebar}>菜单</button>
  )
}

// Sidebar.jsx
import useDocsStore from '../../stores/docsStore'

export default function Sidebar() {
  const sidebarOpen = useDocsStore((s) => s.sidebarOpen)
  const setSidebarOpen = useDocsStore((s) => s.setSidebarOpen)

  return (
    <aside className={sidebarOpen ? 'translate-x-0' : '-translate-x-full'}>
      ...
    </aside>
  )
}
```

**知识点：**
- `create()` 创建 Store
- `set()` 更新状态
- 在组件中使用 `useStore(selector)` 获取状态
- Zustand 比 Redux 更轻量

---

### 9. 动态导入（Vite）

**什么是动态导入？**
按需加载模块，优化性能。

**项目示例：**
```jsx
// useDocs.js
// 动态导入所有 .md 文件
const tutorials = import.meta.glob('../data/docs/tutorials/*.md', { 
  query: '?raw', 
  import: 'default' 
})

const apiDocs = import.meta.glob('../data/docs/api/**/*.md', { 
  query: '?raw', 
  import: 'default' 
})

const allDocs = { ...tutorials, ...apiDocs }

// 使用时才真正加载
const loader = allDocs[path]
if (loader) {
  loader().then((raw) => {
    setContent(raw)
  })
}
```

**知识点：**
- `import.meta.glob()` 批量导入文件
- `{ query: '?raw' }` 作为原始文本导入
- 返回的是加载函数，调用时才加载
- 支持 glob 模式匹配

---

### 10. Tailwind CSS

**什么是 Tailwind？**
原子化 CSS 框架，通过类名直接写样式。

**项目示例：**
```jsx
// Header.jsx
<header className="
  fixed           /* 固定定位 */
  top-0           /* 距顶部 0 */
  left-0          /* 距左侧 0 */
  right-0         /* 距右侧 0 */
  z-50            /* 层级 50 */
  h-16            /* 高度 4rem */
  border-b        /* 底部边框 */
  border-edge     /* 边框颜色 */
  bg-base/90      /* 背景色 90% 透明度 */
  backdrop-blur-md /* 背景模糊 */
">
  ...
</header>

<Link className="
  px-3 py-1.5     /* 内边距 */
  rounded-md      /* 圆角 */
  text-sm         /* 字号小 */
  transition-smooth /* 过渡动画 */
  hover:text-accent /* 悬停变色 */
  bg-surface      /* 背景色 */
">
  ...
</Link>
```

**知识点：**
- 类名直接写在 `className` 中
- 支持响应式：`sm:`, `md:`, `lg:`
- 支持状态：`hover:`, `focus:`
- 可自定义主题

---

## 学习路径

### 第一阶段：React 基础（1-2 周）

#### 目标
- 理解组件化思想
- 掌握 JSX 语法
- 理解 Props 和 State

#### 学习内容

| 序号 | 主题 | 对应文件 | 练习 |
|-----|------|---------|------|
| 1 | JSX 基础语法 | [Home.jsx](src/pages/Home.jsx) | 修改首页内容 |
| 2 | 组件定义与使用 | [Header.jsx](src/components/Layout/Header.jsx) | 创建新组件 |
| 3 | Props 传递 | [Sidebar.jsx](src/components/Layout/Sidebar.jsx) | 修改 props |
| 4 | useState 状态 | [Sidebar.jsx](src/components/Layout/Sidebar.jsx) | 实现计数器 |

#### 练习任务

**任务 1：修改首页内容**
```jsx
// 打开 src/pages/Home.jsx
// 找到 title 部分，修改为你的名字
<h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-[1.1]">
  <span className="text-[#1a1714]">你好，React</span>
  <br />
  <span className="text-accent">
    我的第一个项目
  </span>
</h1>
```

**任务 2：创建计数器组件**
```jsx
// 创建 src/components/Counter.jsx
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <p>当前计数：{count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        点击 +1
      </button>
    </div>
  )
}
```

---

### 第二阶段：Hooks 进阶（2-3 周）

#### 目标
- 掌握 useEffect
- 理解自定义 Hook
- 理解副作用处理

#### 学习内容

| 序号 | 主题 | 对应文件 | 练习 |
|-----|------|---------|------|
| 1 | useEffect 基础 | [useDocs.js](src/hooks/useDocs.js) | 模拟数据加载 |
| 2 | 依赖数组 | [useDocs.js](src/hooks/useDocs.js) | 实现搜索过滤 |
| 3 | 自定义 Hook | [useDocs.js](src/hooks/useDocs.js) | 封装表单逻辑 |
| 4 | 清理函数 | [useDocs.js](src/hooks/useDocs.js) | 实现定时器 |

#### 练习任务

**任务 3：模拟数据加载**
```jsx
// 创建 src/components/DataLoader.jsx
import { useState, useEffect } from 'react'

export default function DataLoader() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟 API 请求
    setTimeout(() => {
      setData([
        { id: 1, name: 'React' },
        { id: 2, name: 'Vue' },
        { id: 3, name: 'Angular' }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) return <div>加载中...</div>

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

---

### 第三阶段：路由与状态管理（2-3 周）

#### 目标
- 掌握 React Router
- 理解状态管理
- 实现多页面应用

#### 学习内容

| 序号 | 主题 | 对应文件 | 练习 |
|-----|------|---------|------|
| 1 | 路由配置 | [App.jsx](src/App.jsx) | 添加新路由 |
| 2 | 动态路由 | [DocPage.jsx](src/pages/DocPage.jsx) | 参数传递 |
| 3 | Zustand 基础 | [docsStore.js](src/stores/docsStore.js) | 实现主题切换 |
| 4 | Zustand 进阶 | [docsStore.js](src/stores/docsStore.js) | 全局状态管理 |

#### 练习任务

**任务 4：添加新页面**
```jsx
// 1. 创建 src/pages/About.jsx
export default function About() {
  return (
    <div className="p-8">
      <h1>关于页面</h1>
      <p>这是一个 React 学习项目</p>
    </div>
  )
}

// 2. 修改 src/App.jsx
import About from './pages/About'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/docs/:category/*" element={<DocLayout />} />
    </Routes>
  )
}
```

**任务 5：实现主题切换**
```jsx
// 修改 src/stores/docsStore.js
import { create } from 'zustand'

const useDocsStore = create((set) => ({
  sidebarOpen: true,
  currentDoc: null,
  theme: 'light',  // 新增主题状态

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentDoc: (doc) => set({ currentDoc: doc }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}))

export default useDocsStore

// 在组件中使用
import useDocsStore from '../stores/docsStore'

function ThemeToggle() {
  const theme = useDocsStore(s => s.theme)
  const toggleTheme = useDocsStore(s => s.toggleTheme)

  return (
    <button onClick={toggleTheme}>
      当前主题：{theme}
    </button>
  )
}
```

---

### 第四阶段：进阶学习（3-4 周）

#### 目标
- 掌握性能优化
- 理解代码分割
- 学习测试

#### 学习内容

| 序号 | 主题 | 对应文件 | 练习 |
|-----|------|---------|------|
| 1 | useMemo | [Home.jsx](src/pages/Home.jsx) | 优化计算 |
| 2 | useCallback | [useDocs.js](src/hooks/useDocs.js) | 优化函数 |
| 3 | React.lazy | [App.jsx](src/App.jsx) | 代码分割 |
| 4 | React.memo | [Header.jsx](src/components/Layout/Header.jsx) | 避免重渲染 |

---

## 文件详解与知识点

### main.jsx - 入口文件

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

**知识点：**
- `ReactDOM.createRoot()` 创建 React 根节点
- `React.StrictMode` 开启严格模式（开发时会检查问题）
- `BrowserRouter` 提供路由上下文
- `import './styles/global.css'` 导入全局样式

---

### App.jsx - 根组件

```jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import DocPage from './pages/DocPage'

function DocLayout() {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <DocPage />
        <Footer />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-base text-[#2d2926]">
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs/:category/*" element={<DocLayout />} />
        </Routes>
      </div>
    </div>
  )
}
```

**知识点：**
- `Routes` 包含所有路由定义
- `Route` 定义单个路由规则
- `element` 属性指定渲染的组件
- `:category` 是动态参数
- `*` 是通配符，匹配剩余路径

---

### useDocs.js - 自定义 Hook

```jsx
import { useState, useEffect } from 'react'

// 动态导入所有 .md 文件
const tutorials = import.meta.glob('../data/docs/tutorials/*.md', { 
  query: '?raw', 
  import: 'default' 
})

const apiDocs = import.meta.glob('../data/docs/api/**/*.md', { 
  query: '?raw', 
  import: 'default' 
})

const allDocs = { ...tutorials, ...apiDocs }

// 文档元数据索引
const docMeta = [...]

// 解析文档路径
function resolveDocPath(category, slug) {
  if (category === 'tutorials') {
    return `../data/docs/tutorials/${slug}.md`
  }
  return `../data/docs/api/${slug}.md`
}

// 自定义 Hook：加载文档内容
export function useDoc(category, slug) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const path = resolveDocPath(category, slug)
    const loader = allDocs[path]

    if (loader) {
      loader().then((raw) => {
        const stripped = raw.replace(/^---[\s\S]*?---\n*/, '')
        setContent(stripped)
        setLoading(false)
      }).catch(() => {
        setError('文档加载失败')
        setLoading(false)
      })
    } else {
      setError('文档未找到')
      setLoading(false)
    }
  }, [category, slug])

  return { content, loading, error }
}

// 自定义 Hook：获取文档标题
export function useDocTitle(category, slug) {
  if (category === 'tutorials') {
    const group = docMeta.find((g) => g.category === 'tutorials')
    return group?.docs.find((d) => d.slug === slug) || null
  }
  if (category === 'api') {
    const group = docMeta.find((g) => g.category === 'api')
    for (const g of group?.groups || []) {
      const doc = g.docs.find((d) => d.slug === slug)
      if (doc) return doc
    }
  }
  return null
}

export { docMeta }
```

**知识点：**
- `import.meta.glob()` Vite 特有的动态导入
- 自定义 Hook 封装复用逻辑
- `useState` 管理多个状态
- `useEffect` 处理异步数据加载
- 返回对象便于解构使用

---

### docsStore.js - Zustand Store

```jsx
import { create } from 'zustand'

const useDocsStore = create((set) => ({
  // 状态
  sidebarOpen: true,
  currentDoc: null,

  // 方法
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentDoc: (doc) => set({ currentDoc: doc }),
}))

export default useDocsStore
```

**知识点：**
- `create()` 创建 Zustand Store
- 状态和方法都在同一个对象中
- `set()` 接收函数或对象来更新状态
- 在组件中通过选择器获取状态

---

## 实践练习

### 练习 1：创建个人简介页面

**目标：** 创建一个展示个人信息的页面

**步骤：**

1. 创建新文件 `src/pages/Profile.jsx`
2. 添加路由配置
3. 添加导航链接

**代码：**

```jsx
// src/pages/Profile.jsx
import React from 'react'

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">个人简介</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">姓名</h2>
          <p className="text-muted">张三</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">学习目标</h2>
          <p className="text-muted">掌握 React 基础知识</p>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">项目经验</h2>
          <ul className="list-disc list-inside text-muted">
            <li>DTS Docs 文档网站</li>
            <li>Todo List 应用</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// 修改 src/App.jsx 添加路由
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/docs/:category/*" element={<DocLayout />} />
    </Routes>
  )
}

// 修改 src/components/Layout/Header.jsx 添加导航
const navLinks = [
  { to: '/', label: '首页' },
  { to: '/profile', label: '个人简介' },  // 新增
  { to: '/docs/tutorials/hello-world', label: '开发教程', matchPrefix: '/docs/tutorials' },
  { to: '/docs/api/quickstart/digital-twin-api', label: 'API 文档', matchPrefix: '/docs/api' }
]
```

---

### 练习 2：实现搜索功能

**目标：** 在文档页面添加搜索功能

**步骤：**

1. 在 `useDocs.js` 中添加搜索逻辑
2. 创建搜索组件
3. 集成到页面中

**代码：**

```jsx
// 在 src/hooks/useDocs.js 中添加
export function useSearch(query) {
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    // 搜索文档标题
    const allDocs = []
    docMeta.forEach(group => {
      if (group.docs) {
        group.docs.forEach(doc => {
          allDocs.push({ ...doc, category: group.category })
        })
      }
      if (group.groups) {
        group.groups.forEach(g => {
          g.docs.forEach(doc => {
            allDocs.push({ ...doc, category: 'api' })
          })
        })
      }
    })

    const filtered = allDocs.filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.sidebar_label.toLowerCase().includes(query.toLowerCase())
    )

    setResults(filtered)
  }, [query])

  return results
}

// 创建搜索组件 src/components/Search.jsx
import { useState } from 'react'
import { useSearch } from '../hooks/useDocs'
import { Link } from 'react-router-dom'

export default function Search() {
  const [query, setQuery] = useState('')
  const results = useSearch(query)

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文档..."
        className="w-full px-4 py-2 border border-edge rounded-lg"
      />
      
      {results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-edge rounded-lg mt-1 shadow-lg z-50">
          {results.slice(0, 5).map((doc, index) => (
            <li key={index}>
              <Link
                to={`/docs/${doc.category}/${doc.slug}`}
                className="block px-4 py-2 hover:bg-surface"
                onClick={() => setQuery('')}
              >
                {doc.sidebar_label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

### 练习 3：实现主题切换

**目标：** 实现深色/浅色主题切换

**步骤：**

1. 修改 Zustand Store 添加主题状态
2. 创建主题切换组件
3. 应用主题样式

**代码：**

```jsx
// 修改 src/stores/docsStore.js
import { create } from 'zustand'

const useDocsStore = create((set) => ({
  sidebarOpen: true,
  currentDoc: null,
  theme: 'light',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentDoc: (doc) => set({ currentDoc: doc }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}))

export default useDocsStore

// 创建主题切换组件 src/components/ThemeToggle.jsx
import useDocsStore from '../stores/docsStore'

export default function ThemeToggle() {
  const theme = useDocsStore(s => s.theme)
  const toggleTheme = useDocsStore(s => s.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-surface transition-smooth"
      title={`切换到${theme === 'light' ? '深色' : '浅色'}主题`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

// 在 Header.jsx 中使用
import ThemeToggle from '../ThemeToggle'

export default function Header() {
  return (
    <header>
      {/* ... 其他内容 */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
```

---

## 常见问题

### Q1：为什么我的组件不显示？

**可能原因：**
1. 组件名没有大写
2. 没有正确导出/导入
3. 路由配置错误

**解决方法：**
```jsx
// ❌ 错误
export default function myComponent() { ... }

// ✅ 正确
export default function MyComponent() { ... }
```

---

### Q2：State 更新后组件没有重新渲染？

**可能原因：**
1. 直接修改了 State 对象
2. 异步更新问题

**解决方法：**
```jsx
// ❌ 错误
const [user, setUser] = useState({ name: '张三' })
user.name = '李四'  // 直接修改
setUser(user)

// ✅ 正确
setUser({ ...user, name: '李四' })
// 或者
setUser(prev => ({ ...prev, name: '李四' }))
```

---

### Q3：useEffect 无限循环？

**可能原因：**
1. 依赖数组中包含会变化的对象
2. 没有正确设置依赖数组

**解决方法：**
```jsx
// ❌ 错误
useEffect(() => {
  fetchData()
})  // 没有依赖数组，每次渲染都执行

// ✅ 正确
useEffect(() => {
  fetchData()
}, [])  // 空数组，只在挂载时执行

// ✅ 正确
useEffect(() => {
  fetchData(id)
}, [id])  // id 变化时才执行
```

---

### Q4：如何调试组件？

**方法 1：React Developer Tools**
- 安装浏览器插件
- 查看组件树和 Props/State

**方法 2：console.log**
```jsx
function MyComponent(props) {
  console.log('props:', props)
  console.log('渲染了')
  
  return <div>...</div>
}
```

**方法 3：React DevTools Profiler**
- 分析组件渲染性能
- 找出不必要的重渲染

---

### Q5：如何优化性能？

**方法 1：React.memo**
```jsx
const MyComponent = React.memo(function MyComponent({ data }) {
  // 只有 data 变化时才重新渲染
  return <div>{data}</div>
})
```

**方法 2：useMemo**
```jsx
function MyComponent({ items }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.active)
  }, [items])  // 只有 items 变化时才重新计算

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

**方法 3：useCallback**
```jsx
function MyComponent({ onClick }) {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])  // 只有 onClick 变化时才重新创建函数

  return <button onClick={handleClick}>点击</button>
}
```

---

## 学习资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [React Router 文档](https://reactrouter.com/)
- [Zustand 文档](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS 文档](https://tailwindcss.com/)

### 推荐教程
- [React 入门教程](https://react.dev/learn)
- [React Hooks 详解](https://react.dev/reference/react/hooks)

### 实践项目
- Todo List 应用
- 天气查询应用
- 博客系统
- 电商网站

---

## 总结

本项目是一个很好的 React 学习案例，涵盖了：

1. **组件化开发** - 函数组件、Props
2. **状态管理** - useState、Zustand
3. **副作用处理** - useEffect
4. **路由管理** - React Router
5. **样式方案** - Tailwind CSS
6. **性能优化** - 动态导入、自定义 Hook

建议按照学习路径逐步深入，多动手实践，遇到问题多查阅官方文档。

祝你学习愉快！ 🚀
