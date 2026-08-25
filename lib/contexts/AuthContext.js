import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('shelby_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Failed to parse user session', e)
      }
    }
    setLoading(false)
  }, [])

  const signup = async (name, email, password) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong during sign up')
    }
    return data
  }

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Invalid email or password')
    }
    setUser(data.user)
    localStorage.setItem('shelby_user', JSON.stringify(data.user))
    return data.user
  }

  const loginWithGoogle = async (googlePayload) => {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googlePayload),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Failed to authenticate with Google')
    }
    setUser(data.user)
    localStorage.setItem('shelby_user', JSON.stringify(data.user))
    return data.user
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('shelby_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
