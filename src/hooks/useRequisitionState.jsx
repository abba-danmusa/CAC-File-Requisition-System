import { create } from 'zustand';

const initialState = {
  companyName: '',
  companyType: '',
  rcNumber: '',
  purpose: '',
  rrrNumber: '',
  section: '',
  remarks: ''
}

export const useRequisitionState = create(set => ({
  ...initialState,
  setPurpose: purpose => set({ purpose }),
  setRemarks: remarks => set({ remarks }),
  setCompanyType: type => set({companyType: type}),
  setCompanyName: name => set({ companyName: name }),
  setRCNumber: number => set({ rcNumber: number }),
  setRRRNumber: number => set({ rrrNumber: number }),
  setSection: section => set({section}),
  setInitialState: () => set(initialState)
}))