import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Get started with core recruiting tools',
    features: [
      '2 active jobs',
      'AI candidate summaries',
      'Basic interview scheduling',
      'Email support',
    ],
    highlighted: false,
    cta: 'Start Free',
  },
  {
    name: 'Premium',
    price: '$149',
    description: 'Accelerate hiring for growing teams',
    features: [
      '25 active jobs',
      'Unlimited screenings',
      'Advanced analytics',
      'Priority support',
      'Team collaboration',
    ],
    highlighted: true,
    cta: 'Choose Premium',
  },
  {
    name: 'Executive',
    price: '$299',
    description: 'Enterprise-grade automation and support',
    features: [
      'Unlimited everything',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'AI model customization',
    ],
    highlighted: false,
    cta: 'Contact Sales',
  },
]

export default function PricingSection() {
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
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
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
    <section ref={sectionRef} id="pricing" className="relative overflow-hidden bg-slate-50 py-28">
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="max-w-[1280px] mx-auto px-6 relative">
        <div className="text-center mb-14">
          <SectionHeader
            overline="PRICING"
            heading="Plans that scale with your recruiting team"
            subheading="Choose a tier that matches your hiring volume, automation needs, and enterprise priorities."
            className="!mb-8"
          />
          <p className="mx-auto max-w-2xl text-sm text-slate-500">
            Transparent pricing with built-in candidate intelligence, collaborative workflows, and compliance support for every growth stage.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-[2.5rem] border p-1 transition duration-300 ${
                plan.highlighted
                  ? 'border-transparent bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_30px_100px_-40px_rgba(15,23,42,0.65)]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl'
              }`}
            >
              <div className={`relative overflow-hidden rounded-[2.3rem] ${plan.highlighted ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
                {plan.highlighted && (
                  <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 translate-y-1 rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600" />

                <div className="relative p-8 lg:p-10">
                  <p className={`text-xs uppercase tracking-[0.24em] ${plan.highlighted ? 'text-sky-300' : 'text-sky-500'} mb-4`}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <h3 className="text-3xl font-semibold tracking-tight">
                      {plan.name}
                    </h3>
                    <div className="mt-4 flex items-end gap-3">
                      <span className="text-5xl font-bold tracking-[-0.05em]">
                        {plan.price}
                      </span>
                      {plan.price !== 'Custom' && (
                        <span className={`text-sm ${plan.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>
                          /month
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-3 text-sm leading-6 ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}
                      >
                        <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${plan.highlighted ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-100 text-sky-500'}`}>
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-lg hover:brightness-110'
                        : 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
