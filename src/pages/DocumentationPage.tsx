import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import { Code, Layers, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const docs = [
  {
    title: 'API reference',
    description: 'Core endpoints, request examples, and response schemas for integrations.',
    icon: Code,
  },
  {
    title: 'Integration guides',
    description: 'Connect HireSmart with your HRIS, ATS, and calendar systems.',
    icon: Layers,
  },
  {
    title: 'Security & compliance',
    description: 'Understand our controls, encryption standards, and privacy posture.',
    icon: ShieldCheck,
  },
]

export default function DocumentationPage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(hero.querySelectorAll('.reveal'), {
      y: 28,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: hero,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-16">
        <section ref={heroRef} className="relative overflow-hidden bg-slate-950 text-white">
          <div className="max-w-[1280px] mx-auto px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400 reveal">Documentation</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-tight reveal">
                Everything you need to ship integrations faster.
              </h1>
              <p className="max-w-xl text-slate-300 leading-relaxed text-lg reveal">
                Find API guides, compliance details, onboarding checklists, and example workflows to make HireSmart part of your recruiting stack.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 reveal">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-xl"
                >
                  Start integration
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
                >
                  Learn about HireSmart
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl">
              <img
                src="/dashboard-feature.jpg"
                alt="Documentation hero"
                className="h-[520px] w-full rounded-[1.75rem] object-cover"
              />
              <div className="absolute left-6 bottom-6 rounded-3xl bg-white/95 px-4 py-3 text-sm text-slate-900 shadow">
                API-first docs for engineering teams
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeader
            overline="RESOURCES"
            heading="Clear, practical documentation for every team member"
            subheading="From product managers to developers, everyone can find what they need in seconds."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {docs.map((doc) => (
              <div key={doc.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950 text-white mb-6">
                  <doc.icon className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">{doc.title}</h3>
                <p className="text-slate-600 leading-relaxed">{doc.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
