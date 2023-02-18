/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import type { Middleware } from 'redux'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import { socketActions, socketConnected } from '@/store/slice/socketSlice'

import { socketListeners } from './util'

export const socketMiddleware: Middleware = ({ dispatch, getState }) => {
  let socket: Socket
  return (next) => {
    socket = io('http://localhost:8000', {})
    socket.on('connect', () => {
      dispatch(socketConnected(''))
      console.log('socket connected!!')
    })

    // Register All Listeners Here
    if (socket) {
      for (const listner of socketListeners) {
        if (!socket.hasListeners(listner)) {
          socket.on(listner, (data: string) => console.log(data))
        }
      }
    }
    return (action) => {
      // Socket
      const isConnected = getState().socket.isConnected && socket

      if (socketActions.socketDisconnected.match(action)) {
        socket.on('disconnect', () => {
          socket.close()
          // @ts-ignore
          socket = null
          console.log('socket disconnected!!')
        })
      }

      if (socketActions.socketGreet.match(action) && isConnected) {
        socket.emit('greet', action.payload)
      }

      // Socket Ends
      next(action)
    }
  }
}
