import { useRef, useEffect } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import SectionHeader from '@/components/SectionHeader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PrivacyPage() {
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
                heading="Privacy policy built for trust and transparency"
                subheading="We treat candidate data with confidentiality, strong access controls, and secure storage practices."
                dark
                className="mb-10 reveal"
              />
              <div className="grid gap-8 lg:grid-cols-3">
                {[
                  {
                    title: 'Data collection',
                    text: 'We only collect information that helps teams hire efficiently and does not compromise candidate privacy.',
                  },
                  {
                    title: 'Storage & retention',
                    text: 'Encrypted datasets and clear retention policies keep your workflows compliant and auditable.',
                  },
                  {
                    title: 'Access controls',
                    text: 'Role-based permissions make sure only authorized team members can see sensitive hiring details.',
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
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">What we share</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Candidate contact details and interview feedback are only shared with authorized team members and hiring stakeholders.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• No resale of personal information.</li>
                <li>• Secure candidate profile storage.</li>
                <li>• Audit logs for recruiter actions.</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm reveal">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Your rights</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Users can request data access, updates, or deletion through our customer portal at any time.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li>• Data access requests</li>
                <li>• Correction or export of records</li>
                <li>• Secure data erasure options</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
