import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleCloud from '@/components/ParticleCloud'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const overlineRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(overlineRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.5)
      .from(headlineRef.current, { y: 30, opacity: 0, duration: 1 }, 0.7)
      .from(sublineRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.9)
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8 }, 1.1)

    // Pin + implosion scroll effect
    const heroContainer = heroRef.current
    if (heroContainer) {
      const particleGroup = { scale: 1, rotation: 0, lineOpacity: 0.15 }

      ScrollTrigger.create({
        trigger: heroContainer,
        start: 'top top',
        end: '+=1200',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          particleGroup.scale = 1 - progress * 0.5
          particleGroup.rotation = progress * Math.PI * 2
          particleGroup.lineOpacity = 0.15 * (1 - progress * 0.67)
        },
      })
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === heroContainer) t.kill()
      })
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Particle cloud background */}
      <ParticleCloud />

      {/* Radial gradient overlay behind text */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.5) 50%, transparent 80%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p
          ref={overlineRef}
          className="text-xs font-semibold uppercase tracking-[0.12em] text-purple-400 mb-6"
        >
          AI-POWERED RECRUITMENT
        </p>

        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] text-slate-50 leading-[1.1] mb-6"
          style={{ textShadow: '0 2px 30px rgba(15, 23, 42, 0.3)' }}
        >
          Hire Smarter with
          <br />
          AI-Powered Recruitment
        </h1>

        <p
          ref={sublineRef}
          className="text-base sm:text-lg text-slate-400 max-w-[560px] mx-auto mb-10 leading-relaxed"
        >
          Automate resume screening, identify top talent faster, and reduce
          hiring bias with intelligent candidate evaluation.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="gradient-blue-purple text-white px-8 py-3.5 rounded-[10px] text-[15px] font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
          >
            Start Free Trial
          </Link>
          <Link
            to="/register"
            className="bg-transparent border-[1.5px] border-white/30 text-slate-50 px-8 py-3.5 rounded-[10px] text-[15px] font-semibold transition-all duration-300 hover:bg-white/[0.08]"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
