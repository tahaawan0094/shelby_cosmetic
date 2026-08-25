import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import SeoHead from '../components/SeoHead'
import { useAuth } from '../lib/contexts/AuthContext'

export default function AuthPage() {
  const router = useRouter()
  const { user, loginWithGoogle, loading } = useAuth()

  const [errorMsg, setErrorMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showDevGoogleModal, setShowDevGoogleModal] = useState(false)
  const [googleEmailInput, setGoogleEmailInput] = useState('')
  const [googleNameInput, setGoogleNameInput] = useState('')

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/')
    }
  }, [user, loading, router])

  // Initialize official Google Identity Services if client ID exists
  useEffect(() => {
    if (googleClientId && window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
        })
        const btnContainer = document.getElementById('google-signin-btn-container')
        if (btnContainer) {
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            width: 320,
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          })
        }
      } catch (err) {
        console.error('Google Auth Init Error:', err)
      }
    }
  }, [googleClientId])

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (e) {
      return null
    }
  }

  const handleGoogleCredentialResponse = async (response) => {
    setSubmitting(true)
    setErrorMsg('')
    try {
      const payload = parseJwt(response.credential)
      if (!payload || !payload.email) {
        throw new Error('Could not read Google account details.')
      }

      await loginWithGoogle({
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        picture: payload.picture || '',
        googleId: payload.sub || '',
      })
      router.push('/')
    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Google sign in failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleButtonClick = () => {
    if (googleClientId && window.google) {
      window.google.accounts.id.prompt()
    } else {
      setShowDevGoogleModal(true)
    }
  }

  const handleDevGoogleSubmit = async (e) => {
    e.preventDefault()
    if (!googleEmailInput) {
      setErrorMsg('Please enter a valid Gmail address.')
      return
    }

    setSubmitting(true)
    setErrorMsg('')

    try {
      let cleanEmail = googleEmailInput.trim()
      if (!cleanEmail.includes('@')) {
        cleanEmail += '@gmail.com'
      }

      const formattedName = googleNameInput.trim() || cleanEmail.split('@')[0]
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`

      await loginWithGoogle({
        email: cleanEmail,
        name: formattedName,
        picture: avatarUrl,
        googleId: `google_${Date.now()}`,
      })

      setShowDevGoogleModal(false)
      router.push('/')
    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Google authentication failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || user) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] text-[#1b1b1b]">
        <Navbar solid />
        <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-32 text-center">
          <div className="flex justify-center items-center h-[40vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#be315b]"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
      <SeoHead
        title="Sign In | Shelby Cosmetics"
        description="Sign in or create an account with Google to sync your wishlist and shopping cart seamlessly."
      />

      {googleClientId && (
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.google) {
              window.google.accounts.id.initialize({
                client_id: googleClientId,
                callback: handleGoogleCredentialResponse,
              })
              const btnContainer = document.getElementById('google-signin-btn-container')
              if (btnContainer) {
                window.google.accounts.id.renderButton(btnContainer, {
                  theme: 'outline',
                  size: 'large',
                  width: 320,
                  text: 'continue_with',
                  shape: 'rectangular',
                  logo_alignment: 'left'
                })
              }
            }
          }}
        />
      )}

      <div className="min-h-screen flex flex-col bg-[#F9F9F9] text-[#1b1b1b]">
        <Navbar solid />

        <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
          <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60">
            
            {/* Header Section with Transparent Google Logo */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-5">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                Welcome to Shelby
              </h1>
              <p className="text-neutral-500 text-sm mt-2.5 leading-relaxed">
                Log in or create an account to save your cart and manage your wishlist.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium text-left border border-red-100/50 flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Google Sign In Area */}
            <div className="space-y-5">
              {googleClientId ? (
                <div className="flex justify-center min-h-[44px]">
                  <div id="google-signin-btn-container" className="w-full flex justify-center" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleButtonClick}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-700 font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-offset-1 focus:ring-neutral-200 disabled:opacity-60"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>
                    {submitting ? 'Connecting...' : 'Continue with Google'}
                  </span>
                </button>
              )}

              {/* Trust/Info Box */}
              <div className="bg-neutral-50 rounded-lg p-4 mt-8 flex items-start gap-3 border border-neutral-100">
                <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs text-neutral-500 leading-snug">
                  Your privacy is important to us. Your data is securely encrypted and linked to your Gmail account.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Fallback Google Account Modal */}
        {showDevGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 p-4 backdrop-blur-[2px]">
            <div className="w-full max-w-[400px] bg-white rounded-2xl p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5 text-neutral-900 font-semibold text-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  </svg>
                  Developer Login
                </div>
                <button
                  type="button"
                  onClick={() => setShowDevGoogleModal(false)}
                  className="text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <form onSubmit={handleDevGoogleSubmit} className="space-y-4.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={googleEmailInput}
                    onChange={(e) => setGoogleEmailInput(e.target.value)}
                    placeholder="user@gmail.com"
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-[#be315b] focus:ring-1 focus:ring-[#be315b] focus:outline-none transition-all placeholder:text-neutral-400"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Display Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={googleNameInput}
                    onChange={(e) => setGoogleNameInput(e.target.value)}
                    placeholder="e.g. Sarah Khan"
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-[#be315b] focus:ring-1 focus:ring-[#be315b] focus:outline-none transition-all placeholder:text-neutral-400"
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowDevGoogleModal(false)}
                    className="w-1/3 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-2/3 py-2.5 text-sm font-medium text-white bg-[#be315b] hover:bg-[#a62a4f] rounded-lg shadow-sm transition-colors disabled:opacity-70 flex justify-center items-center"
                  >
                    {submitting ? (
                       <span className="flex items-center gap-2">
                         <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         Signing in...
                       </span>
                    ) : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <FooterSection />
      </div>
    </>
  )
}   