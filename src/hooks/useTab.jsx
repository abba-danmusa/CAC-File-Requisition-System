import { create } from 'zustand'

const initialState = {
  currentTab: 'Dashboard'
}

export const useTab = create(set => ({
  ...initialState,
  setCurrentTab: tab => set({currentTab: tab})
}))