import { Link } from 'react-router-dom'
import { SignUp } from '@clerk/clerk-react'
import { Brain } from 'lucide-react'

export default function RegisterPage() {
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
            Start Hiring Smarter
          </h2>
          <p className="text-white/80 text-lg max-w-sm">
            Join thousands of companies using AI to find the best talent faster.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-slate-900">HireSmart</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Create your account
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Sign up with email or OTP and start using HireSmart today.
          </p>

          <div className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
            <SignUp
              path="/register"
              routing="path"
              signInUrl="/login"
              afterSignUpUrl="/dashboard"
            />
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
