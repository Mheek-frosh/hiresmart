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
      stagger: 0.18,
      duration: 0.9,
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
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch"
        >
          {plans.map((plan) => (
            <div key={plan.name} className="flex">
              <div className="relative w-full rounded-3xl p-1 transition-transform duration-300">
                <div
                  className={`relative overflow-hidden rounded-[1.6rem] h-full shadow-md flex flex-col ${
                    plan.name === 'Premium'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white transform md:-translate-y-4'
                      : plan.name === 'Free'
                      ? 'bg-white text-slate-900 border border-slate-100'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  <div className="p-8 lg:p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <p className={`text-xs uppercase tracking-[0.24em] mb-3 ${plan.name === 'Premium' ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {plan.description}
                      </p>
                      <h3 className={`text-2xl font-semibold mb-4 ${plan.name === 'Premium' ? 'text-white' : ''}`}>
                        {plan.name}
                      </h3>

                      <div className="flex items-baseline gap-3 mb-6">
                        <span className={`text-4xl md:text-5xl font-bold ${plan.name === 'Premium' ? 'text-white' : ''}`}>
                          {plan.price}
                        </span>
                        {plan.price !== 'Custom' && (
                          <span className={`text-sm ${plan.name === 'Premium' ? 'text-indigo-100' : 'text-slate-400'}`}>
                            /month
                          </span>
                        )}
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm">
                            <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${plan.name === 'Premium' ? 'bg-white/20 text-white' : plan.name === 'Free' ? 'bg-slate-100 text-sky-500' : 'bg-emerald-500 text-white'}`}>
                              <Check className="h-3 w-3" />
                            </span>
                            <span className={`${plan.name === 'Premium' ? 'text-indigo-50' : plan.name === 'Free' ? 'text-slate-700' : 'text-slate-200'}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Link
                        to="/register"
                        className={`block w-full rounded-2xl py-3 text-sm font-semibold text-center ${
                          plan.name === 'Premium'
                            ? 'bg-white text-indigo-600 shadow-lg'
                            : plan.name === 'Free'
                            ? 'border border-slate-200 bg-white text-slate-900'
                            : 'bg-slate-800 text-white'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
