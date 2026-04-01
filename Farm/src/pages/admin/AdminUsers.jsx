import { useState, useEffect } from 'react'
import { Search, Shield, ShieldOff } from 'lucide-react'
import api from '../../services/api'

const roleConfig = {
  farmer: { color: '#1B4332', bg: '#f0fdf4' },
  buyer:  { color: '#D4A017', bg: '#fff8ed' },
  admin:  { color: '#8b5cf6', bg: '#f5f3ff' },
}

const AdminUsers = () => {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/auth/users')
      setUsers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (id, current) => {
    try {
      await api.put(`/auth/verify/${id}`, { isVerified: !current })
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
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
            Users
          </h1>
          <p className="text-sm font-light" style={{color: '#6b6b6b'}}>
            {users.length} registered users
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-3 w-full md:w-80"
          style={{border: '1px solid #e5e0d5'}}>
          <Search size={15} style={{color: '#D4A017'}} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
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
              {['Name', 'Email', 'Phone', 'Role', 'State', 'Verified', 'Action'].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-[10px] tracking-[2px] uppercase whitespace-nowrap"
                  style={{color: '#D4A017'}}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => {
              const cfg = roleConfig[u.role] || roleConfig.buyer
              return (
                <tr key={u._id} style={{borderBottom: '1px solid #f5f0e8'}}>
                  <td className="px-5 py-4 font-medium text-sm whitespace-nowrap"
                    style={{color: '#1B4332'}}>
                    {u.name}
                    {u.farmName && (
                      <p className="text-xs font-light" style={{color: '#6b6b6b'}}>{u.farmName}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                    {u.email}
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                    {u.phone || '—'}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-[9px] tracking-wider uppercase font-bold capitalize"
                      style={{background: cfg.bg, color: cfg.color}}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                    {u.state || '—'}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-[9px] tracking-wider uppercase font-bold"
                      style={{
                        background: u.isVerified ? '#f0fdf4' : '#fef2f2',
                        color:      u.isVerified ? '#1B4332' : '#ef4444',
                      }}>
                      {u.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {u.role === 'farmer' && (
                      <button
                        onClick={() => handleVerify(u._id, u.isVerified)}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-medium transition-all"
                        style={{
                          background: u.isVerified ? '#fef2f2' : '#f0fdf4',
                          color:      u.isVerified ? '#ef4444' : '#1B4332',
                          border:     u.isVerified ? '1px solid #fecaca' : '1px solid #bbf7d0',
                        }}
                      >
                        {u.isVerified
                          ? <><ShieldOff size={12} /> Unverify</>
                          : <><Shield    size={12} /> Verify</>
                        }
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
            <p className="text-sm font-light" style={{color: '#6b6b6b'}}>No users found</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminUsers