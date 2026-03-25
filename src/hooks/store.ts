import { configureStore } from '@reduxjs/toolkit'
import devReducer from './devSlice'

export const store = configureStore({
  reducer: {
    dev: devReducer,
  },
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
