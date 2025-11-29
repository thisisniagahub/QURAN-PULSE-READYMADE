import React, { useState } from 'react'
import { supabase } from '@lib/supabaseClient'
import { Button } from '@shared/components/ui/BaseComponents'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@stores/useUserStore'

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { fetchProfile } = useUserStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/home`,
        },
      })

      if (error) throw error

      setMessage('A magic link has been sent to your email. Please check your inbox.')
    } catch (error) {
      setMessage('Error sending magic link: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`,
        },
      })
      
      if (error) throw error
    } catch (error) {
      setMessage('Error with Google login: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mb-4">
            <div className="text-4xl">📖</div>
          </div>
          <h1 className="text-3xl font-bold text-white">QuranPulse</h1>
          <p className="text-gray-400 mt-2">AI-Powered Islamic Learning Platform</p>
        </div>

        <div className="bg-brand-surface backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Welcome Back</h2>
          
          {message && (
            <div className="mb-4 p-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-200 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-3" 
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Sending Magic Link...' : 'Continue with Email'}
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full py-3 flex items-center justify-center"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/register')}
              className="text-brand-primary hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}