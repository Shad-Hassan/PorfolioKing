/**
 * devMode.config.ts
 * ─────────────────────────────────────────────────────────────
 * Central registry for every dev toggle.
 * Add a new entry here to automatically surface it in DevBar.
 *
 * `key`    — must match a field in DevState (devSlice.ts)
 * `label`  — display name shown on the bar
 * `desc`   — one-line tooltip / description
 * ─────────────────────────────────────────────────────────────
 */

import type { DevState } from '@/hooks/devSlice'

export interface DevToggleConfig {
  key:   keyof DevState
  label: string
  desc:  string
}

export const DEV_TOGGLES: DevToggleConfig[] = [
  {
    key:   'skeletonMode',
    label: 'Skeleton',
    desc:  'Show grid layout scaffold with silver borders',
  },
  // ── add more toggles here ──
]
