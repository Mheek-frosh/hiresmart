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

        <div className="rounded-[2rem] border border-white/[0.08] bg-slate-950/90 p-8 sm:p-10 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-slate-400 max-w-xl">
                Get hiring insights, new product updates, and recruiting trends delivered straight to your inbox.
              </p>
            </div>
            <form className="w-full max-w-xl" onSubmit={(event) => event.preventDefault()}>
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
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
