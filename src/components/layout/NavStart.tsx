interface NavStartProps {
  pillH:       number
  linkPadX:    number
  letterRefs:  React.MutableRefObject<HTMLSpanElement[]>
  onLogoHover: () => void
  registerEl:  (id: string, el: HTMLAnchorElement) => void
  scrollTo:    (href: string) => void
}

const LOGO_CHARS = ['X', 'R', 'O', 'S', 'I', 'A', 'N']

export default function NavStart({ pillH, linkPadX, letterRefs, onLogoHover, registerEl, scrollTo }: NavStartProps) {
  return (
    <a
      href="#hero"
      ref={el => { if (el) registerEl('hero', el) }}
      onClick={e => { e.preventDefault(); scrollTo('#hero') }}
      onMouseEnter={onLogoHover}
      className="relative z-10 shrink-0 flex items-center no-underline"
      style={{ padding: `0 ${linkPadX + 2}px`, height: `${pillH}px` }}
    >
      {LOGO_CHARS.map((ch, i) => (
        <span
          key={i}
          ref={el => { if (el) letterRefs.current[i] = el }}
          className="inline-block"
          style={{
            fontFamily: 'Orbitron, monospace', fontWeight: 900,
            fontSize: '16px', letterSpacing: '0.16em',
            color: i >= 3 ? '#933DC9' : '#FBFAEE',
          }}
        >
          {ch}
        </span>
      ))}
    </a>
  )
}
