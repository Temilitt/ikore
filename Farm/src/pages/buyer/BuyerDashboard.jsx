import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBasket, Package, TrendingUp, ArrowRight } from 'lucide-react'
import { getMyOrders } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const statusConfig = {
  pending:    { color: '#F5A623', bg: '#fff8ed', label: 'Pending'    },
  confirmed:  { color: '#1B4332', bg: '#f0fdf4', label: 'Confirmed'  },
  processing: { color: '#3b82f6', bg: '#eff6ff', label: 'Processing' },
  shipped:    { color: '#8b5cf6', bg: '#f5f3ff', label: 'Shipped'    },
  delivered:  { color: '#1B4332', bg: '#f0fdf4', label: 'Delivered'  },
  cancelled:  { color: '#ef4444', bg: '#fef2f2', label: 'Cancelled'  },
}

const BuyerDashboard = () => {
  const { user }               = useAuth()
  const [orders,  setOrders]   = useState([])
  const [loading, setLoading]  = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMyOrders()
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const totalSpent    = orders.filter((o) => o.status === 'delivered').reduce((acc, o) => acc + o.totalPrice, 0)
  const activeOrders  = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status)).length

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
        style={{borderColor: '#1B4332', borderTopColor: 'transparent'}} />
    </div>
  )

  return (
    <div className="min-h-screen pb-24" style={{background: '#F8F4E9', paddingTop: '100px'}}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="section-tag">Buyer Dashboard</span>
            <h1 className="font-display font-bold text-3xl" style={{color: '#1B4332'}}>
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-sm font-light mt-1" style={{color: '#6b6b6b'}}>
              Track your orders and manage your account
            </p>
          </div>
          <Link to="/marketplace" className="btn-primary flex items-center gap-2">
            <ShoppingBasket size={15} />
            Shop More
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: ShoppingBasket, label: 'Total Orders',   value: orders.length                      },
            { icon: Package,        label: 'Active Orders',  value: activeOrders                        },
            { icon: TrendingUp,     label: 'Total Spent',    value: `₦${totalSpent.toLocaleString()}`   },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white p-6"
                style={{border: '1px solid #e5e0d5'}}>
                <div className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{background: '#f0fdf4'}}>
                  <Icon size={18} style={{color: '#1B4332'}} />
                </div>
                <p className="font-display font-bold text-2xl mb-1" style={{color: '#1B4332'}}>
                  {stat.value}
                </p>
                <p className="text-xs tracking-wider uppercase" style={{color: '#D4A017'}}>
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* ORDERS */}
        <div className="bg-white" style={{border: '1px solid #e5e0d5'}}>
          <div className="flex items-center justify-between px-6 py-5"
            style={{borderBottom: '1px solid #e5e0d5'}}>
            <h2 className="font-display font-bold text-xl" style={{color: '#1B4332'}}>
              My Orders
            </h2>
            <Link to="/marketplace"
              className="flex items-center gap-1 text-xs font-medium"
              style={{color: '#D4A017'}}>
              Browse more
              <ArrowRight size={13} />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBasket size={40} className="mx-auto mb-4" style={{color: '#e5e0d5'}} />
              <p className="font-display font-bold text-xl mb-2" style={{color: '#1B4332'}}>
                No orders yet
              </p>
              <p className="text-sm font-light mb-6" style={{color: '#6b6b6b'}}>
                Browse the marketplace and place your first order
              </p>
              <Link to="/marketplace" className="btn-primary">
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              {orders.map((order) => {
                const cfg = statusConfig[order.status] || statusConfig.pending
                return (
                  <div key={order._id} className="flex flex-col md:flex-row md:items-center gap-4 p-6"
                    style={{borderBottom: '1px solid #f5f0e8'}}>
                    {/* IMAGE */}
                    <div className="w-16 h-16 overflow-hidden shrink-0"
                      style={{border: '1px solid #e5e0d5'}}>
                      <img
                        src={order.produce?.images?.[0]}
                        alt={order.produce?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <p className="font-display font-bold text-lg mb-1" style={{color: '#1B4332'}}>
                        {order.produce?.name}
                      </p>
                      <p className="text-xs mb-1" style={{color: '#6b6b6b'}}>
                        From: {order.farmer?.farmName || order.farmer?.name}
                      </p>
                      <p className="text-xs" style={{color: '#6b6b6b'}}>
                        Qty: {order.quantity} {order.produce?.unit} ·{' '}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                      <p className="font-display font-bold text-xl mb-2" style={{color: '#1B4332'}}>
                        ₦{order.totalPrice?.toLocaleString()}
                      </p>
                      <span className="px-3 py-1 text-xs font-medium capitalize"
                        style={{background: cfg.bg, color: cfg.color}}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default BuyerDashboard