import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronRight,
  Upload,
  CheckCircle2,
  Brain,
  Plus,
  Filter,
  MoreHorizontal,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

type Tab = 'overview' | 'jobs' | 'applications' | 'candidates' | 'analytics' | 'settings'

const sidebarItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'candidates', label: 'Candidates', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const overviewStats = [
  { label: 'Active Jobs', value: '12', icon: Briefcase, color: '#2563EB', change: '+2' },
  { label: 'Total Applications', value: '348', icon: FileText, color: '#7C3AED', change: '+24' },
  { label: 'Qualified Candidates', value: '86', icon: Users, color: '#22C55E', change: '+8' },
  { label: 'Interview Ready', value: '34', icon: CheckCircle2, color: '#06B6D4', change: '+5' },
]

const trendData = [
  { month: 'Jan', applications: 120, qualified: 30 },
  { month: 'Feb', applications: 180, qualified: 45 },
  { month: 'Mar', applications: 250, qualified: 62 },
  { month: 'Apr', applications: 310, qualified: 78 },
  { month: 'May', applications: 280, qualified: 70 },
  { month: 'Jun', applications: 348, qualified: 86 },
]

const statusData = [
  { name: 'Applied', value: 142, color: '#2563EB' },
  { name: 'Screening', value: 86, color: '#7C3AED' },
  { name: 'Interview', value: 62, color: '#06B6D4' },
  { name: 'Offered', value: 34, color: '#22C55E' },
  { name: 'Rejected', value: 24, color: '#EF4444' },
]

const jobsList = [
  { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', applicants: 48, status: 'Active', posted: '2 days ago' },
  { id: 2, title: 'Product Designer', department: 'Design', location: 'New York', applicants: 32, status: 'Active', posted: '5 days ago' },
  { id: 3, title: 'Backend Engineer', department: 'Engineering', location: 'San Francisco', applicants: 56, status: 'Active', posted: '1 week ago' },
  { id: 4, title: 'Data Scientist', department: 'Data', location: 'Remote', applicants: 28, status: 'Paused', posted: '2 weeks ago' },
  { id: 5, title: 'DevOps Engineer', department: 'Engineering', location: 'Austin', applicants: 19, status: 'Active', posted: '3 days ago' },
]

const candidatesList = [
  { id: 1, name: 'Alex Rivera', role: 'Senior Frontend Dev', match: 96, status: 'Interview', applied: '2 days ago', avatar: 'AR', color: '#2563EB' },
  { id: 2, name: 'Jordan Chen', role: 'Product Designer', match: 93, status: 'Screening', applied: '3 days ago', avatar: 'JC', color: '#7C3AED' },
  { id: 3, name: 'Morgan Patel', role: 'Backend Engineer', match: 91, status: 'Offered', applied: '5 days ago', avatar: 'MP', color: '#06B6D4' },
  { id: 4, name: 'Casey Kim', role: 'Data Scientist', match: 89, status: 'Interview', applied: '1 week ago', avatar: 'CK', color: '#22C55E' },
  { id: 5, name: 'Taylor Reed', role: 'DevOps Engineer', match: 87, status: 'Screening', applied: '4 days ago', avatar: 'TR', color: '#F59E0B' },
  { id: 6, name: 'Sam Lopez', role: 'Full Stack Dev', match: 85, status: 'Applied', applied: '1 day ago', avatar: 'SL', color: '#EF4444' },
]

const recentActivity = [
  { text: 'Alex Rivera applied for Senior Frontend Developer', time: '2 hours ago', type: 'apply' },
  { text: 'Jordan Chen moved to Interview stage', time: '4 hours ago', type: 'move' },
  { text: 'Morgan Patel was offered a position', time: '6 hours ago', type: 'offer' },
  { text: 'New job posting: DevOps Engineer', time: '8 hours ago', type: 'job' },
  { text: 'Casey Kim completed technical assessment', time: '12 hours ago', type: 'assessment' },
]

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-700',
  Paused: 'bg-amber-100 text-amber-700',
  Closed: 'bg-red-100 text-red-700',
  Applied: 'bg-blue-100 text-blue-700',
  Screening: 'bg-purple-100 text-purple-700',
  Interview: 'bg-cyan-100 text-cyan-700',
  Offered: 'bg-green-100 text-green-700',
}

function MatchScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const radius = (size - 4) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 90 ? '#22C55E' : score >= 80 ? '#2563EB' : '#F59E0B'

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
        style={{ color }}
      >
        {score}%
      </span>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Trend chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Application Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={{ stroke: '#E2E8F0' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="applications" fill="#2563EB" radius={[4, 4, 0, 0]} name="Applications" />
              <Bar dataKey="qualified" fill="#22C55E" radius={[4, 4, 0, 0]} name="Qualified" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status pie + activity */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Pipeline Status</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2">
              {statusData.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[11px] text-slate-500">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="flex flex-col gap-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div>
                <p className="text-sm text-slate-700">{activity.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JobsTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Active Job Postings</h3>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-blue-purple text-white text-sm font-medium hover:shadow-glow transition-all">
          <Plus className="w-4 h-4" />
          New Job
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Job Title</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Department</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Location</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Applicants</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Posted</th>
              <th className="text-right text-xs font-medium text-slate-500 px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobsList.map((job) => (
              <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{job.title}</td>
                <td className="px-5 py-3.5 text-sm text-slate-500">{job.department}</td>
                <td className="px-5 py-3.5 text-sm text-slate-500">{job.location}</td>
                <td className="px-5 py-3.5 text-sm text-slate-700">{job.applicants}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[job.status]}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-400">{job.posted}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CandidatesTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Candidate Pipeline</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Candidate</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Match Score</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">Applied</th>
              <th className="text-right text-xs font-medium text-slate-500 px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidatesList.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <MatchScoreRing score={c.match} />
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-400">{c.applied}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-xs font-medium text-primary hover:underline">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Hiring Success Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
              <Bar dataKey="qualified" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Candidate Quality Score</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Avg. Time to Fill', value: '18 days', trend: '-12%', positive: true },
            { label: 'Cost per Hire', value: '$2,400', trend: '-23%', positive: true },
            { label: 'Offer Acceptance', value: '92%', trend: '+5%', positive: true },
            { label: 'Source Quality', value: '8.4/10', trend: '+0.6', positive: true },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-xs text-slate-500 mb-1">{m.label}</p>
              <p className="text-xl font-bold text-slate-900">{m.value}</p>
              <p className={`text-xs mt-1 ${m.positive ? 'text-green-600' : 'text-red-600'}`}>
                {m.trend}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ApplicationsTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
      <Upload className="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Resume Upload</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
        Drag and drop candidate resumes here to automatically parse and score them with our AI engine.
      </p>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 max-w-lg mx-auto hover:border-primary/40 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-700 mb-1">
          Drag & drop resumes here
        </p>
        <p className="text-xs text-slate-400">
          Supports PDF, DOCX up to 10MB
        </p>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Account Settings</h3>
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
          <input type="text" defaultValue="Jane Smith" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input type="email" defaultValue="jane@company.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
          <input type="text" defaultValue="TechCorp Inc." className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Notifications</label>
          <div className="flex flex-col gap-2">
            {['Email alerts for new applications', 'Weekly summary reports', 'Candidate match alerts'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-slate-300" />
                <span className="text-sm text-slate-600">{opt}</span>
              </label>
            ))}
          </div>
        </div>
        <button className="self-start px-6 py-2.5 gradient-blue-purple text-white rounded-lg text-sm font-medium hover:shadow-glow transition-all">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />
      case 'jobs': return <JobsTab />
      case 'applications': return <ApplicationsTab />
      case 'candidates': return <CandidatesTab />
      case 'analytics': return <AnalyticsTab />
      case 'settings': return <SettingsTab />
      default: return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <Brain className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-sidebar-foreground">HireSmart</span>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
              {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-base font-semibold text-slate-900 capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none w-40"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full gradient-blue-purple flex items-center justify-center text-white text-xs font-bold">
              JS
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderTab()}
        </main>
      </div>
    </div>
  )
}
