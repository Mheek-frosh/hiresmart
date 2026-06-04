import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeaderProps {
  overline: string
  heading: string
  subheading?: string
  dark?: boolean
  className?: string
}

export default function SectionHeader({
  overline,
  heading,
  subheading,
  dark = false,
  className = '',
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const children = el.children
    gsap.from(children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [])

  return (
    <div ref={ref} className={`mb-12 ${className}`}>
      <p
        className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-500 mb-4"
      >
        {overline}
      </p>
      <h2
        className={`text-3xl md:text-4xl font-semibold tracking-[-0.02em] ${
          dark ? 'text-slate-50' : 'text-slate-900'
        }`}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={`mt-4 text-base max-w-lg mx-auto text-center ${
            dark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}
