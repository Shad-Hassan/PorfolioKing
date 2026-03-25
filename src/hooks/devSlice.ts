import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface DevState {
  skeletonMode: boolean
  // ── add more dev toggles here as needed ──
}

const initialState: DevState = {
  skeletonMode: false,
}

const devSlice = createSlice({
  name: 'dev',
  initialState,
  reducers: {
    toggleSkeletonMode: (state) => { state.skeletonMode = !state.skeletonMode },
    setSkeletonMode:    (state, action: PayloadAction<boolean>) => { state.skeletonMode = action.payload },
  },
})

export const { toggleSkeletonMode, setSkeletonMode } = devSlice.actions
export default devSlice.reducer
