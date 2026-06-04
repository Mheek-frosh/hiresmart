import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "HireSmart reduced our time-to-hire from 45 days to 12 days. The AI matching is eerily accurate.",
    name: 'Sarah Chen',
    role: 'VP Talent at TechCorp',
    avatar: '/avatar-1.jpg',
  },
  {
    quote:
      "We've seen a 40% improvement in candidate quality since switching. The predictive analytics are game-changing.",
    name: 'Marcus Johnson',
    role: 'Head of Recruiting at Finova',
    avatar: '/avatar-2.jpg',
  },
  {
    quote:
      "The bias detection feature helped us diversify our engineering team by 35% in just one quarter.",
    name: 'Priya Sharma',
    role: 'People Director at CloudScale',
    avatar: '/avatar-3.jpg',
  },
  {
    quote:
      "The onboarding experience was seamless and our hiring velocity doubled within weeks. Support is exceptional.",
    name: 'Nina Lopez',
    role: 'Talent Operations Lead at NovaWorks',
    avatar: '/avatar-2.jpg',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(cards.children, {
      y: 40,
      opacity: 0,
      scale: 0.97,
      stagger: 0.15,
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
      id="testimonials"
      className="w-full bg-slate-50 py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center">
          <SectionHeader
            overline="TESTIMONIALS"
            heading="Loved by recruiters worldwide"
            className="!mb-12"
          />
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-100 p-3 text-sky-600 transition-colors duration-300 group-hover:bg-sky-50">
                <Quote className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-600 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
