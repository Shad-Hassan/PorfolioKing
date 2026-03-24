interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  /** col-span on the 12-col desktop grid */
  col?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 12
  /** row-span */
  row?: 1 | 2 | 3
  style?: React.CSSProperties
  onClick?: () => void
}

const colClass: Record<number, string> = {
  2:  'md:col-span-2',
  3:  'md:col-span-3',
  4:  'md:col-span-4',
  5:  'md:col-span-5',
  6:  'md:col-span-6',
  7:  'md:col-span-7',
  8:  'md:col-span-8',
  9:  'md:col-span-9',
  12: 'md:col-span-12',
}

const rowClass: Record<number, string> = {
  1: '',
  2: 'md:row-span-2',
  3: 'md:row-span-3',
}

/**
 * 12-column auto-rows bento grid.
 * Set `--bento-row-h` CSS var on the grid to change base row height.
 */
export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 ${className}`}
      style={{ gridAutoRows: 'minmax(140px, auto)' }}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  children,
  className = '',
  col = 6,
  row = 1,
  style,
  onClick,
}: BentoCardProps) {
  return (
    <div
      className={`bento-card p-6 ${colClass[col] ?? 'md:col-span-6'} ${rowClass[row] ?? ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
