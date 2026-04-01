import { useState, useEffect } from 'react'
import { Package, ShoppingBasket, Users, TrendingUp } from 'lucide-react'
import { getProduce, getOrders } from '../../services/api'
import api from '../../services/api'

const statusConfig = {
  pending:    { color: '#F5A623', bg: '#fff8ed' },
  confirmed:  { color: '#1B4332', bg: '#f0fdf4' },
  processing: { color: '#3b82f6', bg: '#eff6ff' },
  shipped:    { color: '#8b5cf6', bg: '#f5f3ff' },
  delivered:  { color: '#1B4332', bg: '#f0fdf4' },
  cancelled:  { color: '#ef4444', bg: '#fef2f2' },
}

const AdminDashboard = () => {
  const [produce, setProduce] = useState([])
  const [orders,  setOrders]  = useState([])
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, o, u] = await Promise.all([
          getProduce(),
          getOrders(),
          api.get('/auth/users'),
        ])
        setProduce(p.data)
        setOrders(o.data)
        setUsers(u.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const revenue   = orders.filter((o) => o.status === 'delivered').reduce((acc, o) => acc + o.totalPrice, 0)
  const farmers   = users.filter((u) => u.role === 'farmer').length
  const buyers    = users.filter((u) => u.role === 'buyer').length
  const pending   = orders.filter((o) => o.status === 'pending').length

  const stats = [
    { icon: Package,       label: 'Total Produce',  value: produce.length              },
    { icon: ShoppingBasket, label: 'Total Orders',  value: orders.length               },
    { icon: Users,         label: 'Total Users',    value: users.length                },
    { icon: TrendingUp,    label: 'Total Revenue',  value: `₦${revenue.toLocaleString()}` },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{borderColor: '#D4A017', borderTopColor: 'transparent'}} />
    </div>
  )

  return (
    <div className="p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="font-display font-bold text-3xl mb-1" style={{color: '#1B4332'}}>
          Dashboard
        </h1>
        <p className="text-sm font-light" style={{color: '#6b6b6b'}}>
          Welcome back — here's what's happening on Ikore
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
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

      {/* QUICK STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Farmers',        value: farmers, color: '#1B4332' },
          { label: 'Buyers',         value: buyers,  color: '#D4A017' },
          { label: 'Pending Orders', value: pending, color: '#ef4444' },
        ].map((item) => (
          <div key={item.label} className="bg-white p-6 flex items-center justify-between"
            style={{border: '1px solid #e5e0d5'}}>
            <p className="text-sm font-medium" style={{color: '#6b6b6b'}}>{item.label}</p>
            <p className="font-display font-bold text-3xl" style={{color: item.color}}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white" style={{border: '1px solid #e5e0d5'}}>
        <div className="flex items-center justify-between px-6 py-5"
          style={{borderBottom: '1px solid #e5e0d5'}}>
          <h2 className="font-display font-bold text-lg" style={{color: '#1B4332'}}>
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{borderBottom: '1px solid #e5e0d5'}}>
                {['Produce', 'Buyer', 'Farmer', 'Total', 'Status'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-[10px] tracking-[2px] uppercase"
                    style={{color: '#D4A017'}}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((o) => {
                const cfg = statusConfig[o.status] || statusConfig.pending
                return (
                  <tr key={o._id} style={{borderBottom: '1px solid #f5f0e8'}}>
                    <td className="px-6 py-4 font-medium text-sm" style={{color: '#1B4332'}}>
                      {o.produce?.name}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{color: '#6b6b6b'}}>
                      {o.buyer?.name}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{color: '#6b6b6b'}}>
                      {o.farmer?.farmName || o.farmer?.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium" style={{color: '#1B4332'}}>
                      ₦{o.totalPrice?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium capitalize"
                        style={{background: cfg.bg, color: cfg.color}}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard