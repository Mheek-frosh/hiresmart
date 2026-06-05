import { Link } from 'react-router-dom'
import { SignIn } from '@clerk/clerk-react'
import { Brain } from 'lucide-react'

export default function LoginPage() {
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
            Sign in with email or OTP and get instant access to your dashboard.
          </p>

          <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
            <SignIn
              path="/login"
              routing="path"
              signUpUrl="/register"
              afterSignInUrl="/dashboard"
            />
          </div>

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
