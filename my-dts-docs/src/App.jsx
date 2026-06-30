import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import DocPage from './pages/DocPage'
import PlaygroundPage from './pages/PlaygroundPage'

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
    const location = useLocation()
    const isPlayground = location.pathname === '/playground'

    if (isPlayground) {
        return <PlaygroundPage />
    }

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
/**
 * 
 * :category (动态参数): 冒号 : 表示这是一个动态段，或者叫 URL 参数。它会匹配 /docs/ 后面的任何单个路径段，并将其值捕获到一个名为 category 的变量中。

在 URL /docs/tutorials/hello-world 中，:category 的值就是 tutorials。
在 URL /docs/api/camera 中，:category 的值就是 api。
/* (通配符/Splat 参数): 星号 * 是一个通配符，它会匹配该位置之后 所有剩余的 URL 段。这个匹配到的值会被捕获到一个名为 * 的特殊变量中。

在 URL /docs/tutorials/hello-world 中，* 的值是 hello-world。
在 URL /docs/api/camera/methods/setPosition 中，* 的值是 camera/methods/setPosition。
路由匹配: 当 URL 变为 /docs/tutorials/hello-world 时，react-router-dom 匹配到了这个规则：
此时，react-router-dom 内部会记录下 { category: 'tutorials', '*': 'hello-world' } 这组参数。
在DocLayout中就可以通过react-router-dom来访问了：
import { useParams } from 'react-router-dom'
  const { category, '*': wildcard } = useParams()
 * 
 */
