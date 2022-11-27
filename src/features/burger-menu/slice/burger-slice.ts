import { createSlice } from "@reduxjs/toolkit";

interface iBurgerSliceState {
  isOpen: boolean,
}

const initialState: iBurgerSliceState = {
  isOpen: false,
}

const burgerSlice = createSlice({
  name: 'burger-slices',
  initialState,
  reducers: {
    setIsOpen: state => {
      state.isOpen = !state.isOpen
    },
  }
})

export const {setIsOpen} = burgerSlice.actions
export default burgerSlice.reducer
