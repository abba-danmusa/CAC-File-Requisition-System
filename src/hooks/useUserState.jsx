import { create } from 'zustand'

const initialState = {
  user: null
}

export const useUserState = create(set => ({
  ...initialState,
  setUser: (user) => set({...initialState, user})
}))