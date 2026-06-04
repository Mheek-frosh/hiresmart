import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts'
import { Briefcase, Users, Clock, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const chartData = [
  { month: 'Jan', candidates: 180, quality: 72 },
  { month: 'Feb', candidates: 250, quality: 68 },
  { month: 'Mar', candidates: 320, quality: 78 },
  { month: 'Apr', candidates: 280, quality: 82 },
  { month: 'May', candidates: 400, quality: 85 },
  { month: 'Jun', candidates: 350, quality: 88 },
  { month: 'Jul', candidates: 450, quality: 90 },
  { month: 'Aug', candidates: 380, quality: 87 },
]

const stats = [
  { icon: Briefcase, label: 'Total Candidates', value: '2,847', color: '#2563EB' },
  { icon: Users, label: 'Match Rate', value: '94%', color: '#7C3AED' },
  { icon: Clock, label: 'Avg. Time to Hire', value: '12 days', color: '#06B6D4' },
  { icon: TrendingUp, label: 'Success Rate', value: '87%', color: '#22C55E' },
]

const topCandidates = [
  { name: 'Alex Rivera', role: 'Senior Frontend Dev', match: 96, color: '#2563EB' },
  { name: 'Jordan Chen', role: 'Product Designer', match: 93, color: '#7C3AED' },
  { name: 'Morgan Patel', role: 'Backend Engineer', match: 91, color: '#06B6D4' },
  { name: 'Casey Kim', role: 'Data Scientist', match: 89, color: '#22C55E' },
]

export default function DashboardPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const mockup = mockupRef.current
    const statsEl = statsRef.current
    if (!section || !mockup || !statsEl) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    gsap.from(statsEl.children, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.from(mockup, {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    // Stats counter animation
    const statValues = statsEl.querySelectorAll('.stat-value')
    statValues.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0')
      const suffix = el.getAttribute('data-suffix') || ''
      if (target === 0) return

      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onStart: () => {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.floor(obj.val).toLocaleString() + suffix
            },
          })
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section || t.trigger === mockup) t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-slate-900 py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          overline="DASHBOARD"
          heading="Command center for your hiring pipeline"
          subheading="Track candidates, analyze performance, and manage your entire recruitment workflow in one place."
          dark
          className="text-center !items-center"
        />

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/60 rounded-xl p-5 border border-white/[0.06]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <p
                className="stat-value text-2xl font-bold text-slate-50"
                data-target={parseInt(stat.value.replace(/[^0-9]/g, ''))}
                data-suffix={stat.value.replace(/[0-9,]/g, '')}
              >
                0{stat.value.replace(/[0-9,]/g, '')}
              </p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Mockup */}
        <div
          ref={mockupRef}
          className="bg-slate-800/80 rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-slate-500 ml-3">Analytics Overview</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            {/* Chart area */}
            <div className="p-6">
              <h4 className="text-sm font-medium text-slate-400 mb-4">
                Candidates Overview
              </h4>
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.06)"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                    }}
                  />
                  <Bar
                    dataKey="candidates"
                    fill="#2563EB"
                    radius={[4, 4, 0, 0]}
                    opacity={0.8}
                  />
                  <Line
                    type="monotone"
                    dataKey="quality"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={{ fill: '#7C3AED', r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Top Candidates panel */}
            <div className="p-6 border-t lg:border-t-0 lg:border-l border-white/[0.06]">
              <h4 className="text-sm font-medium text-slate-400 mb-4">
                Top Candidates
              </h4>
              <div className="flex flex-col gap-4">
                {topCandidates.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate">
                        {c.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{c.role}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-bold"
                        style={{ color: c.color }}
                      >
                        {c.match}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
