import SectionHeader from '@/components/SectionHeader'
import { Quote, Star } from 'lucide-react'

/* ── Avatar helpers ─────────────────────────────────────────────── */
const avatarColors = [
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-indigo-500 to-violet-600',
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/* ── Data ────────────────────────────────────────────────────────── */
interface TestimonialData {
  quote: string
  name: string
  role: string
  rating: number
  colorIdx: number
}

const row1: TestimonialData[] = [
  {
    quote:
      'HireSmart reduced our time-to-hire from 45 days to 12 days. The AI matching is eerily accurate.',
    name: 'Sarah Chen',
    role: 'VP Talent at TechCorp',
    rating: 5,
    colorIdx: 0,
  },
  {
    quote:
      "We've seen a 40% improvement in candidate quality since switching. The predictive analytics are game-changing.",
    name: 'Marcus Johnson',
    role: 'Head of Recruiting at Finova',
    rating: 5,
    colorIdx: 1,
  },
  {
    quote:
      'The bias detection feature helped us diversify our engineering team by 35% in just one quarter.',
    name: 'Priya Sharma',
    role: 'People Director at CloudScale',
    rating: 4,
    colorIdx: 2,
  },
]

const row2: TestimonialData[] = [
  {
    quote:
      'The onboarding experience was seamless and our hiring velocity doubled within weeks. Support is exceptional.',
    name: 'Nina Lopez',
    role: 'Talent Operations Lead at NovaWorks',
    rating: 5,
    colorIdx: 3,
  },
  {
    quote:
      'Our recruiters love the AI notes — they save hours each week and reduce bias in screening.',
    name: 'Omar Khalid',
    role: 'Recruiting Manager at BrightWorks',
    rating: 4,
    colorIdx: 4,
  },
  {
    quote:
      'The interview scheduling automation is a lifesaver. Candidate experience improved dramatically.',
    name: 'Elaine Park',
    role: 'Head of People Ops at Retailo',
    rating: 5,
    colorIdx: 5,
  },
]

/* ── Single Card ─────────────────────────────────────────────────── */
function TestimonialCard({ quote, name, role, rating, colorIdx }: TestimonialData) {
  return (
    <div className="w-[360px] flex-shrink-0 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* Quote icon */}
      <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-100 p-2 text-sky-600">
        <Quote className="w-5 h-5" />
      </div>

      {/* Quote text */}
      <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Stars */}
      <div className="flex items-center gap-1.5 mb-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            className={`w-4 h-4 ${
              idx < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${
            avatarColors[colorIdx % avatarColors.length]
          } flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm flex-shrink-0`}
        >
          {getInitials(name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Marquee Row ─────────────────────────────────────────────────── */
interface MarqueeRowProps {
  items: TestimonialData[]
  direction: 'left' | 'right'
  /** seconds for one full cycle */
  speed?: number
}

function MarqueeRow({ items, direction, speed = 32 }: MarqueeRowProps) {
  /*
   * Duplicate 4× so the track is always wider than any viewport.
   * Animation moves exactly -25% (= 1 copy width), giving a seamless loop:
   *   left:  translateX(0)    → translateX(-25%)
   *   right: translateX(-25%) → translateX(0)
   */
  const track = [...items, ...items, ...items, ...items]
  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight'

  function pause(e: React.MouseEvent<HTMLDivElement>) {
    ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
  }
  function resume(e: React.MouseEvent<HTMLDivElement>) {
    ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
  }

  return (
    <div className="relative overflow-hidden py-3">
      {/* Left fade mask — matches page background #F8FAFC */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 sm:w-40"
        style={{
          background: 'linear-gradient(to right, #F8FAFC 0%, transparent 100%)',
        }}
      />
      {/* Right fade mask */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 sm:w-40"
        style={{
          background: 'linear-gradient(to left, #F8FAFC 0%, transparent 100%)',
        }}
      />

      {/* Scrolling track */}
      <div
        className="flex gap-5 w-max will-change-transform"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
        }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {track.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────────── */
export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-20" style={{ background: '#F8FAFC' }}>
      {/* Header — constrained width */}
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <SectionHeader
            overline="TESTIMONIALS"
            heading="Words of praise from customers"
            subheading="Real feedback from teams using HireSmart to scale hiring."
            className="!mb-6"
          />
        </div>
      </div>

      {/* Full-bleed marquee rows */}
      <div className="space-y-5">
        <MarqueeRow items={row1} direction="left"  speed={34} />
        <MarqueeRow items={row2} direction="right" speed={40} />
      </div>
    </section>
  )
}
