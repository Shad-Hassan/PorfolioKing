import { configureStore } from '@reduxjs/toolkit'
import devReducer from './devSlice'
import uiReducer  from './uiSlice'

export const store = configureStore({
  reducer: {
    dev: devReducer,
    ui:  uiReducer,
  },
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
