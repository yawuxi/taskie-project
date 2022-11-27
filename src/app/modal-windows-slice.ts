import { createSlice } from "@reduxjs/toolkit";

interface iModalWindowsState {
  addTasksModal: boolean,
}

const initialState: iModalWindowsState = {
  addTasksModal: false,
}

const modalWindowsSlice = createSlice({
  name: 'modal-windows',
  initialState,
  reducers: {
    toggleAddTasksModal: state => {
      state.addTasksModal = !state.addTasksModal
    },
  },
})

export const {toggleAddTasksModal} = modalWindowsSlice.actions
export default modalWindowsSlice.reducer
