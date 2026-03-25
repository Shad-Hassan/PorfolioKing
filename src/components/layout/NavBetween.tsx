import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setNavLink } from '@/hooks/uiSlice'
import { NAV_LINKS } from '@/lib/constants'

interface NavBetweenProps {
  pillH:      number
  linkPadX:   number
  active:     string
  registerEl: (id: string, el: HTMLAnchorElement) => void
  scrollTo:   (href: string) => void
}

export default function NavBetween({ pillH, linkPadX, active, registerEl, scrollTo }: NavBetweenProps) {
  const dispatch = useAppDispatch()
  const navLink  = useAppSelector(s => s.ui.navLink)

  return (
    <div className="flex flex-1 items-center justify-center">
      {NAV_LINKS.map(link => {
        const id        = link.href.replace('#', '')
        const isActive  = active === id
        const isHovered = navLink === id
        return (
          <a
            key={link.href}
            href={link.href}
            ref={el => { if (el) registerEl(id, el) }}
            onClick={e => { e.preventDefault(); scrollTo(link.href) }}
            onMouseEnter={() => dispatch(setNavLink(id))}
            onMouseLeave={() => dispatch(setNavLink(null))}
            className="relative z-10 shrink-0 flex items-center no-underline whitespace-nowrap transition-colors duration-250"
            style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
              fontSize: '14px', letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: `0 ${linkPadX}px`, height: `${pillH}px`,
              color: isActive || isHovered ? '#FBFAEE' : 'rgba(251,250,238,0.4)',
            }}
          >
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
