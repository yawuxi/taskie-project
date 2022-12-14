import { configureStore } from "@reduxjs/toolkit";
import authMethodsSlice from "../features/authentication/slices/auth-methods-slice";
import userSlice from "./user-slice";
import burgerSlice from "../features/burger-menu/slice/burger-slice";
import modalWindowsSlice from "./modal-windows-slice";

export const store = configureStore({
  reducer: {
    authMethodsSlice,
    userSlice,
    burgerSlice,
    modalWindowsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
