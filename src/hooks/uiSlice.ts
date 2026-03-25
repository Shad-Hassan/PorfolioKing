import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/**
 * uiSlice — production UI state.
 * Lives in the Redux store and is available to any component.
 * Add new interaction states here as the site grows.
 */
export type HeroCta = 'view-work' | 'github' | null

export interface UIState {
  heroCta: HeroCta          // which hero CTA is currently hovered
  // ── add more UI states here ──
}

const initialState: UIState = {
  heroCta: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setHeroCta: (state, action: PayloadAction<HeroCta>) => {
      state.heroCta = action.payload
    },
  },
})

export const { setHeroCta } = uiSlice.actions
export default uiSlice.reducer
