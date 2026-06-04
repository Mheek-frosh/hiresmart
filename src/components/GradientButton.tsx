import { cn } from '@/lib/utils'

interface GradientButtonProps {
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  className?: string
  onClick?: () => void
  href?: string
}

export default function GradientButton({
  children,
  variant = 'filled',
  className,
  onClick,
  href,
}: GradientButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-[15px] tracking-[0.01em] transition-all duration-300',
    variant === 'filled' &&
      'gradient-blue-purple text-white hover:scale-[1.03] hover:shadow-glow',
    variant === 'outline' &&
      'bg-transparent border-[1.5px] border-white/30 text-slate-50 hover:bg-white/[0.08]',
    className
  )

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {children}
    </button>
  )
}
