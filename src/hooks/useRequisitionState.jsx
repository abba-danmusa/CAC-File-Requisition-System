import { create } from 'zustand';

const initialState = {
  companyName: '',
  bnNumber: null,
  purpose: '',
  rrrNumber: null,
  remarks: ''
}

export const useRequisitionState = create(set => ({
  ...initialState,
  setCompanyName: name => set({ companyName: name }),
  setBNNumber: number => set({ bnNumber: number }),
  setPurpose: purpose => set({ purpose }),
  setRRRNumber: number => set({ rrrNumber: number }),
  setRemarks: remarks => set({ remarks })
}))