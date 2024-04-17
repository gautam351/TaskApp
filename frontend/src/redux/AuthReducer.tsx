import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  value: number
}

const initialState: AuthState = {
  value: 0,
}

export const AuthReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  incrementByAmount } = AuthReducer.actions

export default AuthReducer.reducer