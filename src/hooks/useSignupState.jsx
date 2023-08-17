import { create } from 'zustand'

const initialState = {
  username: '',
  name: '',
  rank: '',
  department: '',
  staffId: '',
  password: '',
  accountType: '',
}

export const useSignupState = create(set => ({
  ...initialState,
  setName: (name) => set({ name }),
  setRank: (rank) => set({ rank }),
  setUsername: (username) => set({ username }),
  setDepartment: (department) => set({ department }),
  setStaffId: (staffId) => set({ staffId }),
  setPassword: (password) => set({ password }),
  setAccountType: (accountType) => set({ accountType }),
  setInitialState: () => set(initialState)
}))