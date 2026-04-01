import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { getOrders, updateOrder } from '../../services/api'

const statusConfig = {
  pending:    { color: '#F5A623', bg: '#fff8ed' },
  confirmed:  { color: '#1B4332', bg: '#f0fdf4' },
  processing: { color: '#3b82f6', bg: '#eff6ff' },
  shipped:    { color: '#8b5cf6', bg: '#f5f3ff' },
  delivered:  { color: '#1B4332', bg: '#f0fdf4' },
  cancelled:  { color: '#ef4444', bg: '#fef2f2' },
}

const statusOptions = ['pending','confirmed','processing','shipped','delivered','cancelled']

const AdminOrders = () => {
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [editing, setEditing] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await getOrders()
      setOrders(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (id) => {
    try {
      await updateOrder(id, { status: newStatus })
      setEditing(null)
      fetchOrders()
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = orders.filter((o) =>
    o.produce?.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.buyer?.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{borderColor: '#D4A017', borderTopColor: 'transparent'}} />
    </div>
  )

  return (
    <div className="p-6 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display font-bold text-3xl mb-1" style={{color: '#1B4332'}}>
            Orders
          </h1>
          <p className="text-sm font-light" style={{color: '#6b6b6b'}}>
            {orders.length} total orders
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-3 w-full md:w-80"
          style={{border: '1px solid #e5e0d5'}}>
          <Search size={15} style={{color: '#D4A017'}} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by produce or buyer..."
            className="flex-1 text-sm focus:outline-none bg-transparent"
            style={{color: '#2D2D2D'}}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white overflow-x-auto" style={{border: '1px solid #e5e0d5'}}>
        <table className="w-full">
          <thead>
            <tr style={{borderBottom: '1px solid #e5e0d5'}}>
              {['Produce', 'Buyer', 'Farmer', 'Qty', 'Total', 'Payment', 'Status', 'Action'].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-[10px] tracking-[2px] uppercase whitespace-nowrap"
                  style={{color: '#D4A017'}}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const cfg = statusConfig[o.status] || statusConfig.pending
              return (
                <tr key={o._id} style={{borderBottom: '1px solid #f5f0e8'}}>
                  <td className="px-5 py-4 font-medium text-sm whitespace-nowrap"
                    style={{color: '#1B4332'}}>
                    {o.produce?.name}
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                    {o.buyer?.name}
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                    {o.farmer?.farmName || o.farmer?.name}
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                    {o.quantity}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium whitespace-nowrap"
                    style={{color: '#1B4332'}}>
                    ₦{o.totalPrice?.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-[9px] tracking-wider uppercase font-bold"
                      style={{
                        background: o.payment?.isPaid ? '#f0fdf4' : '#fff8ed',
                        color:      o.payment?.isPaid ? '#1B4332' : '#F5A623',
                      }}>
                      {o.payment?.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {editing === o._id ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="text-xs border px-2 py-1 focus:outline-none"
                        style={{borderColor: '#e5e0d5', color: '#2D2D2D'}}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s} className="capitalize">{s}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium capitalize"
                        style={{background: cfg.bg, color: cfg.color}}>
                        {o.status}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {editing === o._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(o._id)}
                          className="px-3 py-1 text-xs font-medium"
                          style={{background: '#f0fdf4', color: '#1B4332', border: '1px solid #bbf7d0'}}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="px-3 py-1 text-xs font-medium"
                          style={{background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca'}}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditing(o._id); setNewStatus(o.status) }}
                        className="px-3 py-1 text-xs font-medium"
                        style={{background: '#F8F4E9', color: '#1B4332', border: '1px solid #e5e0d5'}}
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm font-light" style={{color: '#6b6b6b'}}>No orders found</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminOrders