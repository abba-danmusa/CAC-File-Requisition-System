import { create } from 'zustand'

const initialState = {
  remarks: '',
  openBackdrop: false,
  id: '',
  modalTitle: ''
}

export const useNotificationStore = create(set => ({
  ...initialState,
  setId: id => set({id}),
  setRemarks: remarks => set({ remarks }),
  setOpenBackdrop: openBackdrop => set({ openBackdrop }),
  setModalTitle: title => set({modalTitle: title}),
  setInitialState: () => set(initialState)
}))