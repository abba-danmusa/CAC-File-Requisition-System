import { create } from 'zustand'

const initialState = {
  remarks: '',
  reason: '',
  openBackdrop: false,
  id: '',
  modal: ''
}

export const useNotificationStore = create(set => ({
  ...initialState,
  setId: id => set({ id }),
  setModal: modal => set({ modal }),
  setReason: reason => set({ reason }),
  setRemarks: remarks => set({ remarks }),
  setOpenBackdrop: openBackdrop => set({ openBackdrop }),
  setInitialState: () => set(initialState)
}))