import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import { Briefcase, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const openings = [
  {
    title: 'Recruiting Operations Lead',
    location: 'Remote / Hybrid',
    description: 'Own hiring workflows, scorecards, and recruitment operations for fast-growing teams.',
  },
  {
    title: 'Product Designer – Talent',
    location: 'New York, NY',
    description: 'Design workflows that help people hire with clarity and fairness.',
  },
  {
    title: 'Full-stack Engineer',
    location: 'Remote',
    description: 'Build the next generation of intelligent recruitment applications.',
  },
]

export default function CareersPage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(hero.querySelectorAll('.reveal'), {
      y: 32,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
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
        <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
          <div className="max-w-[1280px] mx-auto px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400 reveal">Careers</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-tight reveal">
                Build the future of hiring with us.
              </h1>
              <p className="max-w-xl text-slate-300 leading-relaxed text-lg reveal">
                Join a company that values transparency, smart automation, and people-first hiring experiences at every level.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 reveal">
                <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                  <span className="text-sm uppercase tracking-[0.24em] text-sky-400">Benefits</span>
                  <p className="mt-3 text-lg font-semibold">Flexible schedules, equity, and continuous learning.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                  <span className="text-sm uppercase tracking-[0.24em] text-sky-400">Culture</span>
                  <p className="mt-3 text-lg font-semibold">Collaborative teams, inclusive hiring, and rapid iteration.</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
              <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
              <div className="absolute -left-8 bottom-8 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <img
                src="/dashboard-feature.jpg"
                alt="Careers hero image"
                className="h-[480px] w-full rounded-[1.75rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeader
            overline="OPEN ROLES"
            heading="Explore roles that shape our product and impact hiring teams."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {openings.map((opening) => (
              <article key={opening.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-white mb-6">
                  <Briefcase className="w-6 h-6 text-sky-400" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">{opening.title}</h2>
                <p className="text-sm text-slate-500 mb-4">{opening.location}</p>
                <p className="text-slate-600 leading-relaxed">{opening.description}</p>
                <Link
                  to="/careers"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-500"
                >
                  Learn more
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] border border-slate-200 bg-slate-950 p-10 text-white shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  icon: HeartHandshake,
                  title: 'People first',
                  text: 'We design hiring experiences that make candidates feel respected and recruiters feel empowered.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Inclusive by default',
                  text: 'Bias filters, structured scorecards, and transparency are core to our product roadmap.',
                },
                {
                  icon: Sparkles,
                  title: 'Growth mindset',
                  text: 'Team members grow quickly with ownership of product, engineering, and customer success initiatives.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl bg-slate-900/90 p-6">
                  <item.icon className="w-6 h-6 text-sky-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
