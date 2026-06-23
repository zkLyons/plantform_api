import { create } from 'zustand'

const useDocsStore = create((set) => ({
  sidebarOpen: true,
  currentDoc: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentDoc: (doc) => set({ currentDoc: doc }),
}))

export default useDocsStore
