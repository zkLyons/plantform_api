import { create } from 'zustand'
// 一个轻量、快速的 React 状态管理库。
// useDocsStore接受接受一个set函数作为参数，并返回一个对象{}
// set 函数的来源：由 Zustand 库提供，作为参数传递给你定义的 store 创建函数。其实修改store状态的唯一途径，
const useDocsStore = create(set => ({
    sidebarOpen: true,
    currentDoc: null,

    toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: open => set({ sidebarOpen: open }),
    setCurrentDoc: doc => set({ currentDoc: doc })
}))

export default useDocsStore
