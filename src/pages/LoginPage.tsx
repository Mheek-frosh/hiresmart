import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Brand */}
      <div className="hidden lg:flex lg:w-1/2 gradient-blue-purple items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-white/30" />
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-white/20" />
        </div>
        <div className="relative z-10 text-center px-12">
          <Brain className="w-16 h-16 text-white/90 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-white/80 text-lg max-w-sm">
            Sign in to access your hiring dashboard and manage your recruitment pipeline.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-slate-900">HireSmart</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Sign in to your account
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Enter your credentials to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <span className="text-primary hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full gradient-blue-purple text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.01] hover:shadow-glow flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
