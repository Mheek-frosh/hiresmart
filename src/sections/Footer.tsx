import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Github, Twitter, Linkedin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  Product: [
    { label: 'Features', to: '/#features' },
    { label: 'Pricing', to: '/#pricing' },
    { label: 'Integrations', to: '/documentation' },
    { label: 'API', to: '/documentation' },
    { label: 'Changelog', to: '/documentation#changelog' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
    { label: 'Press', to: '/blog#press' },
    { label: 'Contact', to: '/about#contact' },
  ],
  Resources: [
    { label: 'Documentation', to: '/documentation' },
    { label: 'Guides', to: '/documentation#guides' },
    { label: 'Webinars', to: '/documentation#webinars' },
    { label: 'Community', to: '/documentation#community' },
  ],
  Legal: [
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Security', to: '/security' },
    { label: 'Cookies', to: '/cookies' },
  ],
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(footer, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === footer) t.kill()
      })
    }
  }, [])

  return (
    <footer ref={footerRef} className="w-full bg-slate-900 pt-16 pb-8 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-slate-50">HireSmart</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-[240px]">
              AI-powered recruitment automation for modern teams.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-slate-300 mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            2026 HireSmart AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Github className="w-5 h-5 text-slate-600 hover:text-slate-300 transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-slate-600 hover:text-slate-300 transition-colors cursor-pointer" />
            <Linkedin className="w-5 h-5 text-slate-600 hover:text-slate-300 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
