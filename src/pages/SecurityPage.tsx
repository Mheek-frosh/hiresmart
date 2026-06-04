import { useRef, useEffect } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SecurityPage() {
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
                heading="Security standards designed for enterprise use"
                subheading="Encryption, audits, and controls that keep candidate and recruiter data protected across every step."
                dark
                className="mb-10 reveal"
              />
              <div className="grid gap-8 lg:grid-cols-3">
                {[
                  {
                    title: 'Encryption',
                    text: 'Data is protected in transit and at rest using strong, modern encryption standards.',
                  },
                  {
                    title: 'Audits',
                    text: 'Regular reviews and third-party audits help us maintain a resilient, secure platform.',
                  },
                  {
                    title: 'Access controls',
                    text: 'Role-based permissions and single sign-on protect access to sensitive hiring workflows.',
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
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Trust and compliance</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We build security controls that support compliance programs while still enabling recruiting teams to move quickly.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• SOC, ISO, and GDPR-ready controls</li>
                <li>• Secure audit trail for user actions</li>
                <li>• Continuous monitoring and alerting</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm reveal">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Secure product design</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Security is built into our workflows from the start, including fine-grained permissions and data minimization by default.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• Candidate data isolation</li>
                <li>• MFA and SSO support</li>
                <li>• Secure API keys and audit logging</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
