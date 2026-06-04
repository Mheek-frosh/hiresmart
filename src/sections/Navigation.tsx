import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Brain, ChevronDown } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (isLanding) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.location.href = `/${href}`
  }

  const handleCompanyLink = () => {
    setMobileOpen(false)
    setCompanyOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(248,250,252,0.92)] backdrop-blur-xl border-b border-[rgba(203,213,225,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] w-full mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <span
            className={`text-xl font-bold tracking-tight transition-colors ${
              scrolled ? 'text-slate-900' : 'text-slate-50'
            }`}
          >
            HireSmart
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="relative" onMouseLeave={() => setCompanyOpen(false)}>
            <button
              type="button"
              onClick={() => setCompanyOpen(!companyOpen)}
              onMouseEnter={() => setCompanyOpen(true)}
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 hover:text-primary ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              Company
              <ChevronDown className="w-4 h-4" />
            </button>
            <div
              className={`absolute right-0 mt-3 w-44 rounded-3xl border border-slate-200/80 bg-white py-3 shadow-2xl transition-all duration-200 ${
                companyOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={handleCompanyLink}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Link
            to="/register"
            className="gradient-blue-purple text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-[1.03] hover:shadow-glow"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-slate-900' : 'text-slate-50'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-slate-900' : 'text-slate-50'}`} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 md:hidden">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-sm font-medium text-slate-700 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-slate-200 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">Company</p>
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="gradient-blue-purple text-white px-6 py-2.5 rounded-lg text-sm font-medium text-center transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
