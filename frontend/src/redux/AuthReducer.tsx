import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  userData: {},
  loading: boolean,
  error:string
}

const initialState: AuthState = {
  userData: {},
  loading: false,
  error:""
}




const AuthReducer = createSlice({
  name: 'group',
  initialState: initialState,
  reducers: {},
  // extraReducers: {
   
  // },
});

// Action creators are generated for each case reducer function
export const {   } = AuthReducer.actions

export default AuthReducer.reducer