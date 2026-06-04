import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import { ArrowRight, Sparkles, ShieldCheck, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(hero.querySelectorAll('.reveal'), {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: hero,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 pt-16">
        <section ref={heroRef} className="overflow-hidden bg-slate-950 text-white">
          <div className="max-w-[1280px] mx-auto px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white/5 px-4 py-2 text-sm text-slate-200 reveal">
                <Sparkles className="w-4 h-4 text-primary" />
                Built for hiring teams who move fast
              </div>
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-400 reveal">About HireSmart</p>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-tight reveal">
                  Modern recruitment from first touch to offer.
                </h1>
                <p className="max-w-xl text-slate-300 leading-relaxed text-lg reveal">
                  HireSmart brings AI-powered sourcing, screening, and collaboration into one beautiful platform, helping teams hire smarter, faster, and with more confidence.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 reveal">
                <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5">
                  <p className="text-sm text-slate-400">Customers onboarded</p>
                  <p className="mt-3 text-3xl font-semibold text-white">+250</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5">
                  <p className="text-sm text-slate-400">Faster hiring</p>
                  <p className="mt-3 text-3xl font-semibold text-white">45%</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5">
                  <p className="text-sm text-slate-400">Candidate quality boost</p>
                  <p className="mt-3 text-3xl font-semibold text-white">35%</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4 reveal">
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg"
                >
                  Join the team
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/documentation"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
                >
                  See our docs
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-gradient-to-r from-sky-500/20 to-purple-500/10 blur-3xl" />
              <div className="absolute right-0 bottom-6 h-48 w-48 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-sky-500/0 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl">
                <img
                  src="/dashboard-feature.jpg"
                  alt="Team working together on recruitment platform"
                  className="h-[420px] w-full rounded-[1.75rem] object-cover"
                />
                <div className="absolute left-6 top-6 rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-100 ring-1 ring-white/10">
                  Built for enterprise teams
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeader
            overline="MISSION"
            heading="Why teams trust HireSmart for every hire"
            subheading="From sourcing to compliant offers, every step is engineered for speed and transparency."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'AI-first candidate matching',
                details:
                  'Smart profiles, skill signals, and culture fit predictions that reduce screening time and surface better hires.',
                icon: Users,
              },
              {
                title: 'Human-centered workflows',
                details:
                  'Collaborative hiring pipelines with automated notes, bias checks, and interview scorecards built for modern teams.',
                icon: ShieldCheck,
              },
              {
                title: 'Built to scale',
                details:
                  'Flexible plans, custom integrations, and security controls so enterprise recruiting stays fast and safe.',
                icon: Sparkles,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-lg">
                  <item.icon className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
