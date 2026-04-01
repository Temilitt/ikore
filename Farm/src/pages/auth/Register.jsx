import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Leaf, ShoppingBasket } from 'lucide-react'

const nigerianStates = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa',
  'Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger',
  'Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
  'FCT Abuja'
]

const Register = () => {
  const { register }   = useAuth()
  const navigate       = useNavigate()
  const [error,    setError]   = useState('')
  const [loading,  setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    role: 'buyer', state: '', farmName: '', farmDescription: '',
  })

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const user = await register(form)
      if (user.role === 'farmer') navigate('/farmer/dashboard')
      else navigate('/buyer/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{background: '#F8F4E9'}}>
      <div className="w-full max-w-lg">

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
            Create your account
          </h1>
          <p className="text-sm font-light" style={{color: '#6b6b6b'}}>
            Join thousands of farmers and buyers on Ikore
          </p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { role: 'buyer',  icon: ShoppingBasket, label: 'I want to Buy', sub: 'Browse and order fresh produce' },
            { role: 'farmer', icon: Leaf,           label: 'I am a Farmer', sub: 'Sell your produce directly'     },
          ].map(({ role, icon: Icon, label, sub }) => (
            <div
              key={role}
              onClick={() => update('role', role)}
              className="p-5 cursor-pointer transition-all"
              style={{
                background: form.role === role ? '#f0fdf4' : 'white',
                border:     form.role === role ? '2px solid #1B4332' : '1.5px solid #e5e0d5',
              }}
            >
              <Icon size={20} className="mb-3"
                style={{color: form.role === role ? '#1B4332' : '#9a8a7a'}} />
              <p className="font-display font-bold text-sm mb-1"
                style={{color: '#1B4332'}}>
                {label}
              </p>
              <p className="text-xs font-light" style={{color: '#6b6b6b'}}>{sub}</p>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="bg-white p-8" style={{border: '1px solid #e5e0d5'}}>
          {error && (
            <div className="p-4 mb-6 text-sm"
              style={{background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca'}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Adaeze Okonkwo"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="08012345678"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="Min. 6 characters"
                className="form-input"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="form-label">State</label>
              <select
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select your state</option>
                {nigerianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* FARMER EXTRA FIELDS */}
            {form.role === 'farmer' && (
              <>
                <div>
                  <label className="form-label">Farm Name</label>
                  <input
                    type="text"
                    value={form.farmName}
                    onChange={(e) => update('farmName', e.target.value)}
                    placeholder="e.g. Okonkwo Fresh Farms"
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Farm Description</label>
                  <textarea
                    value={form.farmDescription}
                    onChange={(e) => update('farmDescription', e.target.value)}
                    placeholder="Tell buyers about your farm..."
                    className="form-input"
                    rows={3}
                    style={{resize: 'none'}}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center mt-2"
            >
              {loading ? 'Creating account...' : `Create ${form.role === 'farmer' ? 'Farmer' : 'Buyer'} Account`}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm" style={{color: '#6b6b6b'}}>
          Already have an account?{' '}
          <Link to="/login" className="font-medium" style={{color: '#1B4332'}}>
            Sign in here
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register