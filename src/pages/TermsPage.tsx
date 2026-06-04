import { useRef, useEffect } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TermsPage() {
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
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-14 text-white shadow-2xl">
              <SectionHeader
                overline="LEGAL"
                heading="Terms of service with clear commitments and expectations"
                subheading="Our platform terms are designed to be understandable, fair, and aligned with modern SaaS teams."
                dark
                className="mb-10 reveal"
              />
              <div className="grid gap-8 lg:grid-cols-3">
                {[
                  {
                    title: 'Usage guidelines',
                    text: 'Use HireSmart in accordance with local hiring laws and our service rules. We help reduce risk through clear documentation.',
                  },
                  {
                    title: 'Service availability',
                    text: 'We commit to keeping the platform reliable and to notifying customers of planned maintenance and updates.',
                  },
                  {
                    title: 'Account responsibilities',
                    text: 'Customers are responsible for secure sign-in, access controls, and managing team member permissions.',
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
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Fair partner terms</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We keep the service agreement simple, while giving customers flexibility to scale and exit gracefully if needed.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• Standard uptime commitment</li>
                <li>• Transparent pricing and renewal terms</li>
                <li>• Fair cancellation policy</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm reveal">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Responsible usage</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Customers can trust HireSmart to support compliant hiring practices and to safeguard data across the candidate lifecycle.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• No unauthorized data resale</li>
                <li>• Privacy-first candidate storage</li>
                <li>• Secure administrative controls</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
