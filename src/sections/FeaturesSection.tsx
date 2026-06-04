import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import { Sparkles, BarChart3, Users, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Matching',
    description:
      'Our neural network analyzes candidate profiles and job requirements to deliver precise match scores, reducing screening time by 87%.',
    accent: '#2563EB',
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    description:
      'Forecast hiring outcomes with machine learning models trained on millions of successful placements across industries.',
    accent: '#7C3AED',
  },
  {
    icon: Users,
    title: 'Collaborative Hiring',
    description:
      'Built-in team workflows, interview scheduling, and shared candidate scorecards for seamless stakeholder collaboration.',
    accent: '#06B6D4',
  },
  {
    icon: Shield,
    title: 'Bias Detection',
    description:
      'AI-powered audit flags potential unconscious bias in job descriptions and screening processes to promote equitable hiring.',
    accent: '#22C55E',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    const image = imageRef.current
    if (!section || !cards || !image) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(cards.children, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from(image, {
      x: 40,
      opacity: 0,
      duration: 1,
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
    <section
      ref={sectionRef}
      id="features"
      className="w-full bg-slate-50 py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-start">
          {/* Left: Header + Cards */}
          <div>
            <SectionHeader
              overline="FEATURES"
              heading="Everything you need to hire top talent"
              subheading="Streamline your recruitment workflow with intelligent automation and data-driven insights."
            />

            <div ref={cardsRef} className="flex flex-col gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-md"
                  style={{ borderLeft: `3px solid ${feature.accent}` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${feature.accent}15` }}
                    >
                      <feature.icon
                        className="w-5 h-5"
                        style={{ color: feature.accent }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature illustration */}
          <div ref={imageRef} className="hidden lg:block sticky top-32">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/dashboard-feature.jpg"
                alt="HireSmart Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
