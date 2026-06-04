import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTABannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(section, {
      scale: 0.97,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    <section className="w-full bg-slate-50 pb-24 px-6">
      <div
        ref={sectionRef}
        role="region"
        className="max-w-[1280px] mx-auto gradient-blue-purple rounded-[20px] px-8 py-16 md:px-12 md:py-16 text-center"
      >
        <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-[-0.02em] mb-4">
          Ready to transform your hiring process?
        </h2>
        <p className="text-base text-white/80 mb-8 max-w-lg mx-auto">
          Join 2,000+ companies already hiring smarter with AI.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-primary px-8 py-3.5 rounded-[10px] text-[15px] font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
  )
}
