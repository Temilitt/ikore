import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Package, ShoppingBasket, TrendingUp, Star, Edit3, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { getMyProduce, getFarmerOrders, deleteProduce, updateProduce } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const statusConfig = {
  pending:    { color: '#F5A623', bg: '#fff8ed' },
  confirmed:  { color: '#1B4332', bg: '#f0fdf4' },
  processing: { color: '#3b82f6', bg: '#eff6ff' },
  shipped:    { color: '#8b5cf6', bg: '#f5f3ff' },
  delivered:  { color: '#1B4332', bg: '#f0fdf4' },
  cancelled:  { color: '#ef4444', bg: '#fef2f2' },
}

const FarmerDashboard = () => {
  const { user }                  = useAuth()
  const [produce,  setProduce]    = useState([])
  const [orders,   setOrders]     = useState([])
  const [loading,  setLoading]    = useState(true)
  const [tab,      setTab]        = useState('produce')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [p, o] = await Promise.all([getMyProduce(), getFarmerOrders()])
      setProduce(p.data)
      setOrders(o.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this produce?')) return
    try {
      await deleteProduce(id)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggle = async (id, current) => {
    try {
      await updateProduce(id, { isAvailable: !current })
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleOrderStatus = async (id, status) => {
    try {
      const { updateOrder } = await import('../../services/api')
      await updateOrder(id, { status })
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const totalRevenue = orders
    .filter((o) => o.status === 'delivered')
    .reduce((acc, o) => acc + o.totalPrice, 0)

  const pendingOrders   = orders.filter((o) => o.status === 'pending').length
  const totalOrders     = orders.length

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
            <span className="section-tag">Farmer Dashboard</span>
            <h1 className="font-display font-bold text-3xl" style={{color: '#1B4332'}}>
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-sm font-light mt-1" style={{color: '#6b6b6b'}}>
              {user?.farmName || 'Your Farm'}
            </p>
          </div>
          <Link to="/farmer/list" className="btn-primary flex items-center gap-2">
            <Plus size={15} />
            List Produce
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Package,      label: 'My Produce',     value: produce.length                    },
            { icon: ShoppingBasket, label: 'Total Orders', value: totalOrders                       },
            { icon: TrendingUp,   label: 'Pending Orders', value: pendingOrders                     },
            { icon: TrendingUp,   label: 'Revenue Earned', value: `₦${totalRevenue.toLocaleString()}` },
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

        {/* TABS */}
        <div className="flex gap-0 mb-8" style={{borderBottom: '2px solid #e5e0d5'}}>
          {['produce', 'orders'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-8 py-4 text-xs tracking-[2px] uppercase font-semibold transition-all capitalize"
              style={{
                color:       tab === t ? '#1B4332' : '#9a8a7a',
                borderBottom: tab === t ? '2px solid #1B4332' : '2px solid transparent',
                marginBottom: '-2px',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* MY PRODUCE */}
        {tab === 'produce' && (
          <div>
            {produce.length === 0 ? (
              <div className="text-center py-16 bg-white" style={{border: '1px solid #e5e0d5'}}>
                <Package size={40} className="mx-auto mb-4" style={{color: '#e5e0d5'}} />
                <p className="font-display font-bold text-xl mb-2" style={{color: '#1B4332'}}>
                  No produce listed yet
                </p>
                <p className="text-sm font-light mb-6" style={{color: '#6b6b6b'}}>
                  Start selling by listing your first produce
                </p>
                <Link to="/farmer/list" className="btn-primary">
                  List Your First Produce
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {produce.map((item) => (
                  <div key={item._id} className="bg-white overflow-hidden"
                    style={{border: '1px solid #e5e0d5'}}>
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 text-[9px] tracking-wider uppercase font-bold"
                          style={{
                            background: item.isAvailable ? '#1B4332' : '#9a8a7a',
                            color: 'white',
                          }}>
                          {item.isAvailable ? 'Active' : 'Hidden'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg mb-1" style={{color: '#1B4332'}}>
                        {item.name}
                      </h3>
                      <p className="text-sm font-medium mb-3" style={{color: '#D4A017'}}>
                        ₦{item.price?.toLocaleString()} / {item.unit}
                      </p>
                      <div className="flex items-center gap-2 text-xs mb-4" style={{color: '#6b6b6b'}}>
                        <Star size={11} style={{color: '#D4A017'}} fill="#D4A017" />
                        {item.rating?.toFixed(1)} · {item.totalSold} sold · {item.quantity} left
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggle(item._id, item.isAvailable)}
                          className="flex-1 flex items-center justify-center gap-1 py-2 text-xs transition-all"
                          style={{background: '#F8F4E9', border: '1px solid #e5e0d5', color: '#1B4332'}}
                        >
                          {item.isAvailable
                            ? <><ToggleRight size={14} /> Hide</>
                            : <><ToggleLeft size={14} /> Show</>
                          }
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-9 h-9 flex items-center justify-center"
                          style={{background: '#fef2f2', border: '1px solid #fecaca'}}
                        >
                          <Trash2 size={13} style={{color: '#ef4444'}} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div className="bg-white overflow-x-auto" style={{border: '1px solid #e5e0d5'}}>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBasket size={40} className="mx-auto mb-4" style={{color: '#e5e0d5'}} />
                <p className="font-display font-bold text-xl mb-2" style={{color: '#1B4332'}}>
                  No orders yet
                </p>
                <p className="text-sm font-light" style={{color: '#6b6b6b'}}>
                  Orders will appear here when buyers place them
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr style={{borderBottom: '1px solid #e5e0d5'}}>
                    {['Produce', 'Buyer', 'Qty', 'Total', 'Status', 'Action'].map((h) => (
                      <th key={h} className="text-left px-6 py-4 text-[10px] tracking-[2px] uppercase"
                        style={{color: '#D4A017'}}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const cfg = statusConfig[order.status] || statusConfig.pending
                    return (
                      <tr key={order._id} style={{borderBottom: '1px solid #f5f0e8'}}>
                        <td className="px-6 py-4 font-medium text-sm" style={{color: '#1B4332'}}>
                          {order.produce?.name}
                        </td>
                        <td className="px-6 py-4 text-sm" style={{color: '#6b6b6b'}}>
                          {order.buyer?.name}
                        </td>
                        <td className="px-6 py-4 text-sm" style={{color: '#6b6b6b'}}>
                          {order.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium" style={{color: '#1B4332'}}>
                          ₦{order.totalPrice?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-xs font-medium capitalize"
                            style={{background: cfg.bg, color: cfg.color}}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOrderStatus(order._id, 'confirmed')}
                                className="px-3 py-1 text-xs font-medium"
                                style={{background: '#f0fdf4', color: '#1B4332', border: '1px solid #bbf7d0'}}
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleOrderStatus(order._id, 'cancelled')}
                                className="px-3 py-1 text-xs font-medium"
                                style={{background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca'}}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                          {order.status === 'confirmed' && (
                            <button
                              onClick={() => handleOrderStatus(order._id, 'shipped')}
                              className="px-3 py-1 text-xs font-medium"
                              style={{background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe'}}
                            >
                              Mark Shipped
                            </button>
                          )}
                          {order.status === 'shipped' && (
                            <button
                              onClick={() => handleOrderStatus(order._id, 'delivered')}
                              className="px-3 py-1 text-xs font-medium"
                              style={{background: '#f0fdf4', color: '#1B4332', border: '1px solid #bbf7d0'}}
                            >
                              Mark Delivered
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default FarmerDashboard