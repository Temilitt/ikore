import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const { login }                   = useAuth()
  const navigate                    = useNavigate()
  const [email,    setEmail]        = useState('')
  const [password, setPassword]     = useState('')
  const [error,    setError]        = useState('')
  const [loading,  setLoading]      = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const user = await login(email, password)
      if (user.role === 'farmer') navigate('/farmer/dashboard')
      else if (user.role === 'admin') navigate('/admin/dashboard')
      else navigate('/buyer/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{background: '#F8F4E9'}}>
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-10">
          <Link to="/" className="flex flex-col leading-none items-center mb-6">
            <span className="font-display font-bold text-3xl"
              style={{color: '#1B4332', letterSpacing: '-0.5px'}}>
              Ikore
            </span>
            <span className="text-[9px] tracking-[3px] uppercase"
              style={{color: '#D4A017'}}>
              Harvest
            </span>
          </Link>
          <h1 className="font-display font-bold text-2xl mb-2"
            style={{color: '#1B4332'}}>
            Welcome back
          </h1>
          <p className="text-sm font-light" style={{color: '#6b6b6b'}}>
            Sign in to your Ikore account
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-8" style={{border: '1px solid #e5e0d5'}}>
          {error && (
            <div className="p-4 mb-6 text-sm"
              style={{background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca'}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm" style={{color: '#6b6b6b'}}>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium"
            style={{color: '#1B4332'}}>
            Register here
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
