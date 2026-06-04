import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Upload Your Requirements',
    description:
      'Define job roles, skills, and culture fit criteria through our intuitive job builder.',
    gradient: true,
  },
  {
    number: '02',
    title: 'AI Scans & Ranks',
    description:
      'Our engine processes thousands of profiles, scoring each candidate on skill alignment and potential.',
    gradient: false,
  },
  {
    number: '03',
    title: 'Hire with Confidence',
    description:
      'Review top-ranked candidates with detailed insights and make data-driven hiring decisions.',
    gradient: false,
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stepsEl = stepsRef.current
    if (!section || !stepsEl) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(stepsEl.children, {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
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
    <section
      ref={sectionRef}
      id="how-it-works"
      className="w-full bg-white py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeader
            overline="HOW IT WORKS"
            heading="Three steps to smarter hiring"
            className="!mb-0"
          />
        </div>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting lines - desktop only */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px]">
            <div className="w-full h-full border-t-2 border-dashed border-slate-300" />
          </div>

          {steps.map((step, index) => (
            <div key={step.number} className="text-center relative z-10">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-base font-semibold ${
                  step.gradient
                    ? 'gradient-blue-purple text-white'
                    : 'bg-blue-50 text-primary border-2 border-primary'
                }`}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                {step.description}
              </p>

              {/* Mobile vertical connector */}
              {index < steps.length - 1 && (
                <div className="md:hidden w-[2px] h-8 border-l-2 border-dashed border-slate-300 mx-auto my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
