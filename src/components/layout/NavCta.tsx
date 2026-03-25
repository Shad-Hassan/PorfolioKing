import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setNavCta } from '@/hooks/uiSlice'

export default function NavCta() {
  const dispatch = useAppDispatch()
  const navCta   = useAppSelector(s => s.ui.navCta)

  return (
    <a
      href="mailto:shadhassan8991@gmail.com"
      onMouseEnter={() => dispatch(setNavCta(true))}
      onMouseLeave={() => dispatch(setNavCta(false))}
      className="shrink-0 flex items-center no-underline rounded-full transition-[box-shadow,transform] duration-200"
      style={{
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
        fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase',
        height: '48px', padding: '0 28px',
        background: 'linear-gradient(135deg, #933DC9, #53118F)',
        color: '#FBFAEE',
        boxShadow: navCta
          ? '0 0 32px rgba(147,61,201,0.75), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 0 18px rgba(147,61,201,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
        transform: navCta ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      Hire Me
    </a>
  )
}
