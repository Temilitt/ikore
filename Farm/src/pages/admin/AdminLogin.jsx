import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminLogin = () => {
  const { login }                       = useAuth()
  const navigate                        = useNavigate()
  const [email,    setEmail]            = useState('')
  const [password, setPassword]         = useState('')
  const [error,    setError]            = useState('')
  const [loading,  setLoading]          = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const user = await login(email, password)
      if (user.role !== 'admin') {
        setError('Access denied. Admins only.')
        return
      }
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{background: '#0D2016'}}>
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <span className="font-display font-bold text-4xl text-white"
            style={{letterSpacing: '-0.5px'}}>
            Ikore
          </span>
          <p className="text-[10px] tracking-[3px] uppercase mt-2"
            style={{color: 'rgba(255,255,255,0.3)'}}>
            Admin Access
          </p>
        </div>

        <div className="bg-white p-8">
          <h2 className="font-display font-bold text-2xl mb-8" style={{color: '#1B4332'}}>
            Sign In
          </h2>

          {error && (
            <div className="p-4 mb-6 text-sm"
              style={{background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca'}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ikore.ng"
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full text-center">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs" style={{color: 'rgba(255,255,255,0.2)'}}>
          © 2022 Ikore. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin