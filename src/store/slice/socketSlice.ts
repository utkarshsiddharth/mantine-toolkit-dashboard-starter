import type { Slice } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { InitialState } from '@/store/types'

const initialState: InitialState = {
  isConnecting: false,
  isConnected: false,
  socket: null
}

export const socketSlice: Slice<InitialState> = createSlice({
  name: 'socketSlice',
  initialState,
  reducers: {
    socketConnected: (state, action) => {
      const { payload } = action
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        socket: payload
      }
    },
    socketDisconnected: (state) => {
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
        socket: null
      }
    },
    socketConnecting: (state) => {
      return state
    },
    socketGreet: (state) => {
      return state
    }
  }
})

export const { socketConnected, socketConnecting, socketGreet } =
  socketSlice.actions
export const socketActions = socketSlice.actions

export const socketSliceReducer = socketSlice.reducer
