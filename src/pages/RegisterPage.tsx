import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, Eye, EyeOff, ArrowRight, User, Building2, Loader } from 'lucide-react'
import { useSignUp } from '@clerk/react/legacy'

type Role = 'candidate' | 'recruiter'

export default function RegisterPage() {
  const navigate = useNavigate()
    const { signUp, isLoaded, setActive } = useSignUp()
  const [role, setRole] = useState<Role>('recruiter')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const [resendStatus, setResendStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getClerkErrorMessage = (err: any) => {
    const clerkError = err?.errors?.[0]
    return clerkError?.longMessage || clerkError?.message || err?.message || 'An error occurred'
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoaded || !signUp || !setActive) {
      console.warn('Clerk is not ready yet: isLoaded=', isLoaded, 'signUp=', signUp)
      return
    }
    setLoading(true)
    setError(null)
    setResendStatus(null)

    if (needsVerification) {
      try {
        const verified = await signUp.attemptEmailAddressVerification({
          code: verificationCode,
        })
        console.log('attemptEmailAddressVerification result:', verified)

        if (verified.status === 'complete') {
          await setActive({ session: verified.createdSessionId })
          navigate('/dashboard')
        } else {
          console.warn('Sign-up status incomplete after verification:', verified.status)
          setError('Verification succeeded but sign up is not complete. Please check for missing requirements.')
        }
      } catch (err: any) {
        console.error('attemptEmailAddressVerification error:', err)
        setError(getClerkErrorMessage(err))
      } finally {
        setLoading(false)
      }
      return
    }

    try {
      const createdSignUp = await signUp.create({
        firstName: name,
        emailAddress: email,
        password: password,
        unsafeMetadata: {
          role,
          company,
        },
      })
      console.log('createdSignUp result:', createdSignUp)

      if (createdSignUp.status === 'complete') {
        await setActive({ session: createdSignUp.createdSessionId })
        navigate('/dashboard')
      } else if (createdSignUp.status === 'missing_requirements') {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        setNeedsVerification(true)
      } else {
        console.warn('Unexpected sign-up status:', createdSignUp.status)
        setError('Unexpected status during signup. Please check your email to complete registration.')
      }
    } catch (err: any) {
      console.error('signUp create error:', err)
      setError(getClerkErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    if (!signUp) return
    setLoading(true)
    setError(null)
    setResendStatus(null)

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setResendStatus('Verification code resent. Check your email.')
    } catch (err: any) {
      console.error('Resend verification error:', err)
      setError(getClerkErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-blue-purple items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-white/30" />
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-white/20" />
        </div>
        <div className="relative z-10 text-center px-12">
          <Brain className="w-16 h-16 text-white/90 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Start Hiring Smarter</h2>
          <p className="text-white/80 text-lg max-w-sm">
            Join thousands of companies using AI to find the best talent faster.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-slate-900">HireSmart</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">Create your account</h1>
          <p className="text-sm text-slate-500 mb-6">Sign up with email, password, and verify your email via OTP.</p>

          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                role === 'recruiter'
                  ? 'border-primary bg-blue-50 text-primary'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-all ${
                role === 'candidate'
                  ? 'border-primary bg-blue-50 text-primary'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <User className="w-4 h-4" />
              Candidate
            </button>
          </div>

          {needsVerification ? (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify your email</h2>
                <p className="text-sm text-slate-600">
                  We sent a 6-digit code to <span className="font-medium text-slate-900">{email}</span>. Enter it below to finish creating your account.
                </p>
              </div>

              <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter code from email"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    required
                  />
                </div>

                {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                {resendStatus && <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">{resendStatus}</div>}

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={loading}
                    className="text-sm text-primary hover:underline disabled:text-slate-400"
                  >
                    Resend code
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !isLoaded}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Verifying…' : 'Verify & Continue'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {role === 'recruiter' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              )}

              <div className="flex items-start gap-2 text-sm mt-1">
                <input type="checkbox" className="rounded border-slate-300 mt-0.5" required />
                <span className="text-slate-500">
                  I agree to the{' '}
                  <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
                </span>
              </div>

              {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

              <button
                type="submit"
                disabled={loading || !isLoaded}
                className="w-full gradient-blue-purple text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.01] hover:shadow-glow flex items-center justify-center gap-2 mt-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Create Account…
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

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
