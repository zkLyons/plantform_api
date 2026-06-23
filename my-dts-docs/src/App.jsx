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
          <Route path="/docs/:category/:slug" element={<DocLayout />} />
        </Routes>
      </div>
    </div>
  )
}
