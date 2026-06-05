import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, Eye, EyeOff, ArrowRight, Loader } from 'lucide-react'
import { useSignIn } from '@clerk/react/legacy'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn, isLoaded, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [useOtp, setUseOtp] = useState(false)
  const [isAwaitingCode, setIsAwaitingCode] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getClerkErrorMessage = (err: any) => {
    const clerkError = err?.errors?.[0]
    return clerkError?.longMessage || clerkError?.message || err?.message || 'An error occurred'
  }

  const signInWithPassword = async () => {
    if (!signIn || !setActive) return
    setLoading(true)
    setError(null)

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/dashboard')
      } else {
        console.warn('Sign-in status incomplete:', result.status)
        setError('Unable to complete sign-in. Additional steps required.')
      }
    } catch (err: any) {
      console.error('Sign-in with password error:', err)
      setError(getClerkErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async () => {
    if (!signIn) return
    setLoading(true)
    setError(null)

    try {
      const result = await signIn.create({ identifier: email })
      const emailCodeFactor = result.supportedFirstFactors?.find(
        (factor) => factor.strategy === 'email_code'
      )

      if (!emailCodeFactor) {
        setError('Email code sign-in is not supported or allowed for this user.')
        return
      }

      const prepResult = await signIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: (emailCodeFactor as any).emailAddressId,
      })

      if (prepResult.status === 'needs_first_factor') {
        setIsAwaitingCode(true)
      } else {
        console.warn('Prepare factor status:', prepResult.status)
        setError('Unable to start verification. Please try again.')
      }
    } catch (err: any) {
      console.error('Send OTP error:', err)
      setError(getClerkErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!signIn || !setActive) return
    setLoading(true)
    setError(null)

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: code,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/dashboard')
      } else {
        console.warn('Verify OTP status incomplete:', result.status)
        setError('Verification incomplete. Additional verification steps required.')
      }
    } catch (err: any) {
      console.error('Verify OTP error:', err)
      setError(getClerkErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isLoaded) return

    if (useOtp) {
      if (isAwaitingCode) {
        await verifyOtp()
      } else {
        await sendOtp()
      }
    } else {
      await signInWithPassword()
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
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
          <p className="text-white/80 text-lg max-w-sm">
            Sign in to access your hiring dashboard and manage your recruitment pipeline.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-slate-900">HireSmart</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to your account</h1>
          <p className="text-sm text-slate-500 mb-8">
            Use your email and password, or switch to OTP sign in to get a secure code by email.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

            {!useOtp && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors pr-10"
                    required={!useOtp}
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
            )}

            {useOtp && isAwaitingCode && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">OTP Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter code from email"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  required
                />
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              {!useOtp ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-slate-600">Remember me</span>
                </label>
              ) : (
                <span className="text-slate-500">OTP will be sent to your email address.</span>
              )}
              <button
                type="button"
                onClick={() => {
                  setUseOtp((prev) => !prev)
                  setIsAwaitingCode(false)
                  setCode('')
                  setError(null)
                }}
                className="text-primary hover:underline"
              >
                {useOtp ? 'Use password instead' : 'Sign in with OTP'}
              </button>
            </div>

            {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

            <button
              type="submit"
              disabled={loading || !isLoaded}
              className="w-full gradient-blue-purple text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.01] hover:shadow-glow flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {useOtp ? (isAwaitingCode ? 'Verifying OTP...' : 'Sending OTP...') : 'Signing In...'}
                </>
              ) : (
                <>
                  {useOtp ? (isAwaitingCode ? 'Verify OTP' : 'Send OTP') : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
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
