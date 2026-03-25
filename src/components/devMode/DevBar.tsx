/**
 * DevBar.tsx
 * ─────────────────────────────────────────────────────────────
 * Dev-only floating control panel.
 * Rendered only when import.meta.env.DEV === true.
 * Never bundled into production.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { toggleSkeletonMode } from '@/hooks/devSlice'
import type { DevState } from '@/hooks/devSlice'
import { DEV_TOGGLES } from './devMode.config'
import type { AppDispatch } from '@/hooks/store'

const HIDE_DURATION = 10 // seconds

const DISPATCH_MAP: Record<keyof DevState, (dispatch: AppDispatch) => void> = {
  skeletonMode: (d) => d(toggleSkeletonMode()),
}

export default function DevBar() {
  const [collapsed,  setCollapsed]  = useState(false)
  const [countdown,  setCountdown]  = useState<number | null>(null) // null = visible
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dispatch    = useAppDispatch()
  const devState    = useAppSelector(s => s.dev)

  const isHidden = countdown !== null

  const hideFor10 = () => {
    setCountdown(HIDE_DURATION)
  }

  // Tick the countdown down, restore when it hits 0
  useEffect(() => {
    if (countdown === null) return

    if (countdown === 0) {
      setCountdown(null)
      return
    }

    intervalRef.current = setTimeout(() => setCountdown(c => (c ?? 1) - 1), 1000)
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [countdown])

  return (
    <>

      {/* ── Main panel (hidden during countdown) ── */}
      <div style={{
        position:   'fixed',
        right:      0,
        top:        '50%',
        transform:  'translateY(-50%)',
        zIndex:     9999,
        display:    'flex',
        alignItems: 'stretch',
        opacity:     isHidden ? 0 : 1,
        pointerEvents: isHidden ? 'none' : 'auto',
        transition: 'opacity 0.3s ease',
      }}>
        {/* Collapse tab */}
        <button
          onClick={() => setCollapsed(v => !v)}
          title={collapsed ? 'Expand dev panel' : 'Collapse dev panel'}
          style={{
            width:          '18px',
            background:     'rgba(8,8,8,0.9)',
            border:         '1px solid rgba(255,220,60,0.3)',
            borderRight:    'none',
            borderRadius:   '6px 0 0 6px',
            cursor:         'pointer',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            color:          'rgba(255,220,60,0.6)',
            fontSize:       '10px',
            padding:        0,
            transition:     'background 0.2s, border-color 0.2s',
            alignSelf:      'stretch',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,220,60,0.7)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,220,60,0.3)' }}
        >
          {collapsed ? '‹' : '›'}
        </button>

        {/* Panel body */}
        <div style={{
          width:          collapsed ? 0 : '180px',
          overflow:       'hidden',
          transition:     'width 0.25s ease',
          background:     'rgba(6,6,8,0.95)',
          border:         collapsed ? 'none' : '1px solid rgba(255,220,60,0.25)',
          borderLeft:     'none',
          borderRadius:   '0 6px 6px 0',
          backdropFilter: 'blur(20px)',
          boxShadow:      '0 0 30px rgba(0,0,0,0.6), -4px 0 20px rgba(255,220,60,0.04)',
        }}>
          <div style={{ width: '180px', padding: '14px 14px 16px' }}>

            {/* Header row */}
            <div style={{
              display:       'flex',
              alignItems:    'center',
              gap:           '8px',
              marginBottom:  '14px',
              paddingBottom: '10px',
              borderBottom:  '1px solid rgba(255,220,60,0.12)',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#FFD43B', boxShadow: '0 0 6px rgba(255,212,59,0.9)',
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px',
                letterSpacing: '0.25em', color: 'rgba(255,212,59,0.7)', textTransform: 'uppercase',
                flex: 1,
              }}>DEV MODE</span>

              {/* Hide-for-10s button */}
              <button
                onClick={hideFor10}
                title="Hide panel for 10 s (screenshot mode)"
                style={{
                  background:   'none',
                  border:       '1px solid rgba(255,220,60,0.2)',
                  borderRadius: '4px',
                  cursor:       'pointer',
                  padding:      '2px 5px',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '3px',
                  color:        'rgba(255,212,59,0.5)',
                  fontSize:     '10px',
                  lineHeight:   1,
                  transition:   'border-color 0.2s, color 0.2s',
                  flexShrink:   0,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,220,60,0.6)'; el.style.color = 'rgba(255,212,59,0.9)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,220,60,0.2)'; el.style.color = 'rgba(255,212,59,0.5)' }}
              >
                {/* Camera icon */}
                <svg width="11" height="10" viewBox="0 0 11 10" fill="currentColor">
                  <path d="M3.5 1L2.5 2.5H1a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H8.5L7.5 1h-4zm2 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                </svg>
                10s
              </button>
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DEV_TOGGLES.map(({ key, label, desc }) => {
                const active = devState[key] as boolean
                return (
                  <div key={key} title={desc}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'space-between',
                      gap:            '10px',
                      cursor:         'pointer',
                      padding:        '6px 8px',
                      borderRadius:   '6px',
                      background:     active ? 'rgba(255,212,59,0.06)' : 'transparent',
                      border:         active ? '1px solid rgba(255,212,59,0.18)' : '1px solid transparent',
                      transition:     'background 0.2s, border-color 0.2s',
                    }}
                    onClick={() => DISPATCH_MAP[key]?.(dispatch)}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <span style={{
                      fontFamily:    'Rajdhani, sans-serif', fontWeight: 600, fontSize: '12px',
                      color:         active ? 'rgba(255,212,59,0.9)' : 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.06em', lineHeight: 1,
                      transition:    'color 0.2s', userSelect: 'none',
                    }}>{label}</span>

                    {/* Toggle pill */}
                    <div style={{
                      width: '32px', height: '17px', borderRadius: '9999px',
                      background: active ? 'rgba(255,212,59,0.85)' : 'rgba(255,255,255,0.1)',
                      position: 'relative', flexShrink: 0,
                      transition: 'background 0.2s',
                      boxShadow: active ? '0 0 8px rgba(255,212,59,0.5)' : 'none',
                    }}>
                      <div style={{
                        position: 'absolute', top: '2.5px',
                        left: active ? '16px' : '2.5px',
                        width: '12px', height: '12px', borderRadius: '50%',
                        background: active ? '#1a1600' : 'rgba(255,255,255,0.3)',
                        transition: 'left 0.2s, background 0.2s',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,220,60,0.08)', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '9px',
                letterSpacing: '0.2em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase',
              }}>localhost · dev only</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
