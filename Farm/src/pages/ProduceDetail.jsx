import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MapPin, Star, Shield, Truck, ArrowLeft, Plus, Minus, ShoppingBasket } from 'lucide-react'
import { getProduceById, createOrder } from '../services/api'
import { useAuth } from '../context/AuthContext'

const ProduceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [produce, setProduce] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [ordering, setOrdering] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    address: '', city: '', state: '', phone: ''
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getProduceById(id)
        setProduce(data)
      } catch {
        navigate('/marketplace')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

const handleOrder = async () => {
  if (!user) { navigate('/login'); return }
  if (!form.address || !form.city || !form.state || !form.phone) {
    setError('Please fill in all delivery details')
    return
  }
  setOrdering(true)
  setError('')

  const totalAmount = produce.price * quantity

  const handler = window.PaystackPop.setup({
    key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email:    user.email,
    amount:   totalAmount * 100,
    currency: 'NGN',
    ref:      'IKORE-' + Date.now(),
    onClose:  function() {
      setOrdering(false)
      setError('Payment cancelled')
    },
    callback: function(response) {
      createOrder({
        produce:         produce._id,
        quantity,
        deliveryAddress: form,
        payment: {
          reference: response.reference,
          isPaid:    true,
        }
      }).then(() => {
        setOrdered(true)
      }).catch(() => {
        setError('Payment successful but order failed. Contact support.')
      }).finally(() => {
        setOrdering(false)
      })
    }
  })

  handler.openIframe()
}

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#1B4332', borderTopColor: 'transparent' }} />
    </div>
  )

  if (!produce) return null

  if (ordered) return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#F8F4E9', paddingTop: '100px' }}>
      <div className="max-w-md w-full bg-white p-12 text-center"
        style={{ border: '1px solid #e5e0d5' }}>
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
          style={{ background: '#f0fdf4' }}>
          <ShoppingBasket size={32} style={{ color: '#1B4332' }} />
        </div>
        <h2 className="font-display font-bold text-2xl mb-3" style={{ color: '#1B4332' }}>
          Order Placed!
        </h2>
        <p className="text-sm font-light mb-8" style={{ color: '#6b6b6b' }}>
          Your order for <strong>{produce.name}</strong> has been placed successfully.
          The farmer will confirm shortly.
        </p>
        <div className="flex gap-4">
          <Link to="/buyer/dashboard" className="btn-primary flex-1 text-center">
            View Orders
          </Link>
          <Link to="/marketplace" className="btn-outline flex-1 text-center">
            Shop More
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-24" style={{ background: '#F8F4E9', paddingTop: '100px' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* BACK */}
        <Link to="/marketplace"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium"
          style={{ color: '#1B4332' }}>
          <ArrowLeft size={16} />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — IMAGE */}
          <div>
            <div className="w-full h-96 overflow-hidden mb-4"
              style={{ border: '1px solid #e5e0d5' }}>
              <img
                src={produce.images?.[0]}
                alt={produce.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* FARMER CARD */}
            <div className="bg-white p-6" style={{ border: '1px solid #e5e0d5' }}>
              <p className="text-[10px] tracking-[2px] uppercase mb-4"
                style={{ color: '#D4A017' }}>
                About the Farmer
              </p>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center shrink-0 font-display font-bold text-white text-lg"
                  style={{ background: '#1B4332' }}>
                  {produce.farmer?.name?.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-bold" style={{ color: '#1B4332' }}>
                      {produce.farmer?.farmName || produce.farmer?.name}
                    </p>
                    {produce.farmer?.isVerified && (
                      <span className="px-2 py-0.5 text-[9px] tracking-wider uppercase font-bold"
                        style={{ background: '#D4A017', color: 'white' }}>
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin size={12} style={{ color: '#D4A017' }} />
                    <span className="text-xs" style={{ color: '#6b6b6b' }}>
                      {produce.farmer?.state}
                    </span>
                  </div>
                  <p className="text-sm font-light" style={{ color: '#6b6b6b' }}>
                    {produce.farmer?.farmDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div>
            {/* CATEGORY */}
            <div className="inline-block px-3 py-1 mb-4 text-[9px] tracking-[2px] uppercase font-bold capitalize"
              style={{ background: '#1B4332', color: 'white' }}>
              {produce.category}
            </div>

            <h1 className="font-display font-bold mb-3"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#1B4332', lineHeight: 1.1 }}>
              {produce.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(produce.rating) ? '#D4A017' : 'none'}
                    style={{ color: '#D4A017' }} />
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: '#1B4332' }}>
                {produce.rating?.toFixed(1)}
              </span>
              <span className="text-sm" style={{ color: '#6b6b6b' }}>
                ({produce.numReviews} reviews · {produce.totalSold} sold)
              </span>
            </div>

            {/* PRICE */}
            <div className="p-6 mb-6" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <p className="font-display font-bold text-4xl mb-1" style={{ color: '#1B4332' }}>
                ₦{produce.price?.toLocaleString()}
              </p>
              <p className="text-sm" style={{ color: '#6b6b6b' }}>per {produce.unit}</p>
              <p className="text-xs mt-2" style={{ color: '#1B4332' }}>
                {produce.quantity} {produce.unit}s available
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: '#6b6b6b' }}>
              {produce.description}
            </p>

            {/* BADGES */}
            <div className="flex gap-4 mb-8">
              {[
                { icon: Shield, text: 'Verified Farm' },
                { icon: Truck, text: 'Nationwide Delivery' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: '#1B4332' }} />
                  <span className="text-xs" style={{ color: '#6b6b6b' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* DELIVERY FORM */}
            <div className="bg-white p-6 mb-6" style={{ border: '1px solid #e5e0d5' }}>
              <p className="text-[10px] tracking-[2px] uppercase mb-5 font-semibold"
                style={{ color: '#D4A017' }}>
                Delivery Details
              </p>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Delivery address"
                  className="form-input"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="State"
                    className="form-input"
                  />
                </div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                  className="form-input"
                />
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-medium" style={{ color: '#1B4332' }}>Quantity:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: '#F8F4E9', border: '1px solid #e5e0d5' }}
                >
                  <Minus size={14} style={{ color: '#1B4332' }} />
                </button>
                <span className="font-display font-bold text-xl w-8 text-center"
                  style={{ color: '#1B4332' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(produce.quantity, quantity + 1))}
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ background: '#F8F4E9', border: '1px solid #e5e0d5' }}
                >
                  <Plus size={14} style={{ color: '#1B4332' }} />
                </button>
              </div>
              <p className="text-sm font-medium ml-auto" style={{ color: '#1B4332' }}>
                Total: ₦{(produce.price * quantity).toLocaleString()}
              </p>
            </div>

            {error && (
              <p className="text-sm mb-4" style={{ color: '#ef4444' }}>{error}</p>
            )}

            <button
              onClick={handleOrder}
              disabled={ordering}
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
            >
              {ordering ? 'Placing Order...' : (
                <>
                  <ShoppingBasket size={16} />
                  {user ? 'Place Order' : 'Login to Order'}
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProduceDetail