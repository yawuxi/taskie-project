import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProjectsColumnTypes } from "../features/projects-table/types/projects-column-types";

export interface iUserSlice {
  uuid: string,
  avatar: File | null,
  colorTheme: 'light' | 'dark',
  displayName: string,
  displayPosition: string,
  columns: iProjectsColumnTypes[],
}

const initialState: iUserSlice = {
  uuid: '',
  avatar: null,
  colorTheme: 'light',
  displayName: 'Change name',
  displayPosition: 'Change position',
  columns: [],
}

const userSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {
    setAllData: (state, action: PayloadAction<iUserSlice>) => (
      {
        ...action.payload,
        uuid: state.uuid
      }
    ),
    setUUID: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload
    },
    setAvatar: (state, action: PayloadAction<File>) => {
      state.avatar = action.payload
    },
  }
})

export const {setUUID, setAvatar, setAllData} = userSlice.actions
export default userSlice.reducer
