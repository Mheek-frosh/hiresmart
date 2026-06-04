import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import { ArrowRight, BookOpen, TrendingUp, Lightbulb } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    title: 'AI recruiting trends shaping 2026',
    subtitle: 'How intelligent sourcing is changing talent acquisition for startups and enterprises.',
    tag: 'Insights',
  },
  {
    title: 'Designing bias-safe hiring workflows',
    subtitle: 'Practical steps to make your interview process fairer and more consistent.',
    tag: 'People Ops',
  },
  {
    title: 'Reducing time-to-offer with automation',
    subtitle: 'The fastest way to build a candidate experience that delights and converts.',
    tag: 'Growth',
  },
]

export default function BlogPage() {
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
      duration: 0.8,
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
        <section ref={heroRef} className="relative overflow-hidden bg-white">
          <div className="max-w-[1280px] mx-auto px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-500 reveal">From our team</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] leading-tight reveal">
                Insights, trends, and stories from the HireSmart team.
              </h1>
              <p className="max-w-xl text-slate-600 leading-relaxed text-lg reveal">
                Explore our latest thinking on AI talent sourcing, inclusive hiring, and building recruiting operations that scale with speed and clarity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 reveal">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-xl"
                >
                  Subscribe for updates
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/documentation"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Read docs
                </Link>
              </div>
            </div>

            <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-lg">
              <img
                src="/dashboard-feature.jpg"
                alt="Blog launch image"
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute left-6 top-6 rounded-3xl bg-white/95 px-4 py-3 text-sm text-slate-900 shadow-md reveal">
                Latest launch updates
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-6 py-20">
          <SectionHeader
            overline="BLOG"
            heading="Fresh articles for modern recruiting teams"
            subheading="Every post is written to help you move faster, remove bias, and keep hiring aligned with business goals."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="text-xs uppercase tracking-[0.24em] text-sky-400">
                  {article.tag}
                </span>
                <h2 className="mt-5 text-2xl font-semibold leading-tight">
                  {article.title}
                </h2>
                <p className="mt-4 text-slate-300 leading-relaxed">
                  {article.subtitle}
                </p>
                <Link
                  to="/blog"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 transition hover:text-sky-300"
                >
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
