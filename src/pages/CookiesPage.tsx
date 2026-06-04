import { useRef, useEffect } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CookiesPage() {
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
        <section ref={heroRef} className="overflow-hidden bg-white">
          <div className="max-w-[1080px] mx-auto px-6 py-20">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-14 text-white shadow-2xl">
              <SectionHeader
                overline="LEGAL"
                heading="Cookies and tracking policies explained clearly"
                subheading="We use cookies to improve your experience while keeping tracking minimal and transparent."
                dark
                className="mb-10 reveal"
              />
              <div className="grid gap-8 lg:grid-cols-3">
                {[
                  {
                    title: 'Essential cookies',
                    text: 'Necessary cookies keep the application functioning properly and support secure sessions.',
                  },
                  {
                    title: 'Performance cookies',
                    text: 'Anonymous performance cookies help us improve page speed and product usability.',
                  },
                  {
                    title: 'Preference cookies',
                    text: 'Optional cookies remember your preferences and personalization choices. ',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl bg-slate-950/90 p-6 border border-white/10 reveal">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1080px] mx-auto px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm reveal">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Cookie controls</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                You can manage cookie preferences through your browser, and we only use tracking tools with explicit consent.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• No third-party advertising cookies by default</li>
                <li>• Consent-based analytics only</li>
                <li>• Secure session storage for authenticated users</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm reveal">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Privacy-first stack</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We keep tracking lightweight and only collect data necessary for service delivery and performance measurement.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• No hidden tracking</li>
                <li>• Clear opt-out guidance</li>
                <li>• Periodic cookie reviews</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
