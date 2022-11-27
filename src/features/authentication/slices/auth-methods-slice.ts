import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthMethodParams } from "./auth-types";

interface iAuthMethodsSlice {
  isRegistered: boolean,
  registrationMethod: AuthMethodParams,
  loginMethod: AuthMethodParams,
  signOutMethod: () => void,
  generateTestData: (uuid: string) => void,
}

const initialState: iAuthMethodsSlice = {
  isRegistered: false,
  registrationMethod: () => {
  },
  loginMethod: () => {
  },
  signOutMethod: () => {
  },
  generateTestData: (uuid) => {
  },
}

const authMethodsSlice = createSlice({
  name: 'auth-methods-slices',
  initialState,
  reducers: {
    setIsRegistered: state => {
      state.isRegistered = !state.isRegistered
    },
    setRegistrationMethod: (state, action: PayloadAction<AuthMethodParams>) => {
      state.registrationMethod = action.payload
    },
    setLoginMethod: (state, action: PayloadAction<AuthMethodParams>) => {
      state.loginMethod = action.payload
    },
    setSignOutMethod: (state, action: PayloadAction<() => void>) => {
      state.signOutMethod = action.payload
    },
    setGenerateTestData: (state, action: PayloadAction<(uuid: string) => void>) => {
      state.generateTestData = action.payload
    }
  }
})

export const {
  setIsRegistered,
  setRegistrationMethod,
  setLoginMethod,
  setSignOutMethod,
  setGenerateTestData,
} = authMethodsSlice.actions
export default authMethodsSlice.reducer
