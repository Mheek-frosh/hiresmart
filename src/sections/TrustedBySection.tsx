import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const companies = ['Apex', 'Nexus', 'Vertex', 'Prism', 'Cipher', 'Orbit']

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const logos = logosRef.current
    if (!section || !logos) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(section, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from(logos.children, {
      y: 10,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: logos,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section || t.trigger === logos) t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-white py-12">
      <div className="max-w-[1280px] mx-auto px-6">
        <p className="text-sm font-medium text-slate-400 text-center mb-8">
          Trusted by forward-thinking companies
        </p>
        <div
          ref={logosRef}
          className="flex flex-wrap items-center justify-center gap-12"
        >
          {companies.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold text-slate-400/60 tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
