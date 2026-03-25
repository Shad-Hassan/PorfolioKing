import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type HeroCta = 'view-work' | 'github' | null

export interface UIState {
  heroCta:       HeroCta        // hero CTA hovered
  navLink:       string | null  // desktop nav link id hovered ('hero' | 'about' | …)
  navCta:        boolean        // desktop "Hire Me" hovered
  mobileMenuLink: string | null // mobile overlay link hovered
  mobileClose:   boolean        // mobile overlay close button hovered
}

const initialState: UIState = {
  heroCta:        null,
  navLink:        null,
  navCta:         false,
  mobileMenuLink: null,
  mobileClose:    false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setHeroCta:        (state, action: PayloadAction<HeroCta>)        => { state.heroCta        = action.payload },
    setNavLink:        (state, action: PayloadAction<string | null>)  => { state.navLink         = action.payload },
    setNavCta:         (state, action: PayloadAction<boolean>)        => { state.navCta          = action.payload },
    setMobileMenuLink: (state, action: PayloadAction<string | null>)  => { state.mobileMenuLink  = action.payload },
    setMobileClose:    (state, action: PayloadAction<boolean>)        => { state.mobileClose     = action.payload },
  },
})

export const {
  setHeroCta,
  setNavLink,
  setNavCta,
  setMobileMenuLink,
  setMobileClose,
} = uiSlice.actions

export default uiSlice.reducer
