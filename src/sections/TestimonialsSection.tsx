import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import { Quote, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "HireSmart reduced our time-to-hire from 45 days to 12 days. The AI matching is eerily accurate.",
    name: 'Sarah Chen',
    role: 'VP Talent at TechCorp',
    avatar: '/avatar-1.jpg',
    rating: 5,
  },
  {
    quote:
      "We've seen a 40% improvement in candidate quality since switching. The predictive analytics are game-changing.",
    name: 'Marcus Johnson',
    role: 'Head of Recruiting at Finova',
    avatar: '/avatar-2.jpg',
    rating: 5,
  },
  {
    quote:
      "The bias detection feature helped us diversify our engineering team by 35% in just one quarter.",
    name: 'Priya Sharma',
    role: 'People Director at CloudScale',
    avatar: '/avatar-3.jpg',
    rating: 4,
  },
  {
    quote:
      "The onboarding experience was seamless and our hiring velocity doubled within weeks. Support is exceptional.",
    name: 'Nina Lopez',
    role: 'Talent Operations Lead at NovaWorks',
    avatar: '/avatar-2.jpg',
    rating: 5,
  },
  {
    quote:
      "Our recruiters love the AI notes — they save hours each week and reduce bias in screening.",
    name: 'Omar Khalid',
    role: 'Recruiting Manager at BrightWorks',
    avatar: '/avatar-1.jpg',
    rating: 4,
  },
  {
    quote:
      "The interview scheduling automation is a lifesaver. Candidate experience improved dramatically.",
    name: 'Elaine Park',
    role: 'Head of People Ops at Retailo',
    avatar: '/avatar-3.jpg',
    rating: 5,
  },
  {
    quote:
      "Support and onboarding were exceptional — we rolled out across the company in days.",
    name: 'Carlos Mendes',
    role: 'CTO at NeoHire',
    avatar: '/avatar-2.jpg',
    rating: 5,
  },
  {
    quote:
      "Custom integrations saved us time and the dedicated account manager is top-notch.",
    name: 'Lina Gomez',
    role: 'Director of Talent at HealthPlus',
    avatar: '/avatar-1.jpg',
    rating: 4,
  },
]

const avatarColors = [
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-indigo-500 to-violet-600',
  'from-cyan-500 to-sky-600',
  'from-fuchsia-500 to-purple-600',
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

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
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    // Floating animations: vertical bobbing so cards stay within container bounds
    Array.from(cards.children).forEach((el, i) => {
      const amplitude = 6 + (i % 3) * 3 // vary amplitude: 6, 9, 12 px
      const dur = 3.2 + (i % 4) * 0.5  // stagger durations: 3.2 - 4.7s
      const delay = (i % 5) * 0.4       // offset phases so they don't all move together
      gsap.to(el, {
        y: amplitude,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        duration: dur,
        delay: delay,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="testimonials" className="w-full bg-transparent py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-8">
          <SectionHeader
            overline="TESTIMONIALS"
            heading="Words of praise from customers"
            subheading="Real feedback from teams using HireSmart to scale hiring."
            className="!mb-6"
          />
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-lg overflow-visible">
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, colorIdx) => (
              <div
                key={t.name}
                className="group rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-100 p-2 text-sky-600">
                  <Quote className="w-5 h-5" />
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-2 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${idx < (t.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {/* Gradient avatar with initials — works without image files */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[colorIdx % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm flex-shrink-0`}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
