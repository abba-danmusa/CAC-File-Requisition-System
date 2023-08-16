import { create } from 'zustand';

const initialState = {
  companyName: '',
  rcNumber: '',
  purpose: '',
  rrrNumber: '',
  remarks: ''
}

export const useRequisitionState = create(set => ({
  ...initialState,
  setCompanyName: name => set({ companyName: name }),
  setRCNumber: number => set({ rcNumber: number }),
  setPurpose: purpose => set({ purpose }),
  setRRRNumber: number => set({ rrrNumber: number }),
  setRemarks: remarks => set({ remarks }),
  setInitialState: () => set(initialState)
}))