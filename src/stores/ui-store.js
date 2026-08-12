import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  darkMode: false,
  mobileMenuOpen: false,
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setDarkMode: (dark) => set({ darkMode: dark }),
}));