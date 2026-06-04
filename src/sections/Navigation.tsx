import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Brain, ChevronDown } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isLanding) {
      setScrolled(true)
    }
  }, [isLanding])

  const navLinks = [
    { label: 'Product', href: '#features' },
    { label: 'Features', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
  ]

  const companyLinks = [
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
  ]

  const navColorClass = scrolled || !isLanding ? 'text-slate-700' : 'text-slate-50'
  const navBackgroundClass = scrolled || !isLanding
    ? 'bg-white/95 shadow-sm border-b border-slate-200/80 text-slate-900'
    : 'bg-transparent text-slate-50'

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (isLanding && href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        const navEl = document.querySelector('nav') as HTMLElement | null
        const offset = (navEl ? navEl.offsetHeight : 72) + 8
        const top = window.scrollY + (el as HTMLElement).getBoundingClientRect().top - offset
        window.scrollTo({ top, behavior: 'smooth' })
        return
      }
    }
    // if href begins with a slash, navigate directly, otherwise treat as path
    if (href.startsWith('/')) navigate(href)
    else navigate(`/${href}`)
  }

  const handleCompanyLink = (to: string) => {
    setMobileOpen(false)
    setCompanyOpen(false)
    navigate(to)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-300 ${navBackgroundClass}`}
    >
      <div className="max-w-[1280px] mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">HireSmart</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${navColorClass}`}
            >
              {link.label}
            </button>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCompanyOpen(!companyOpen)}
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-primary ${navColorClass}`}
            >
              Company
              <ChevronDown className="w-4 h-4" />
            </button>
            <div
              className={`absolute right-0 z-20 mt-3 w-44 overflow-hidden rounded-3xl border border-slate-200/80 bg-white py-2 shadow-2xl transition-all duration-200 ${
                companyOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              onMouseEnter={() => setCompanyOpen(true)}
            >
              {companyLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleCompanyLink(link.to)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Link
            to="/register"
            className="gradient-blue-purple text-white rounded-full px-6 py-2 text-sm font-semibold transition duration-200 hover:scale-[1.03] hover:shadow-glow"
          >
            Get Started
          </Link>
        </div>

        <button
          className={`md:hidden inline-flex items-center justify-center rounded-full p-2 transition duration-200 ${navColorClass}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden">
          <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm font-medium text-slate-700 transition-colors hover:text-primary"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 mb-3">Company</p>
                <div className="grid gap-2">
                  {companyLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleCompanyLink(link.to)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
