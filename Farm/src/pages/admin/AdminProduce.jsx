import { useState, useEffect } from 'react'
import { Search, Trash2, ToggleLeft, ToggleRight, Star } from 'lucide-react'
import { getProduce, updateProduce, deleteProduce } from '../../services/api'

const AdminProduce = () => {
  const [produce,  setProduce]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')

  useEffect(() => { fetchProduce() }, [])

  const fetchProduce = async () => {
    try {
      const { data } = await getProduce()
      setProduce(data)
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
      fetchProduce()
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggle = async (id, current) => {
    try {
      await updateProduce(id, { isAvailable: !current })
      fetchProduce()
    } catch (err) {
      console.error(err)
    }
  }

  const handleFeature = async (id, current) => {
    try {
      await updateProduce(id, { isFeatured: !current })
      fetchProduce()
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = produce.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.farmer?.farmName?.toLowerCase().includes(search.toLowerCase())
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
            Produce
          </h1>
          <p className="text-sm font-light" style={{color: '#6b6b6b'}}>
            {produce.length} total listings
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-3 w-full md:w-80"
          style={{border: '1px solid #e5e0d5'}}>
          <Search size={15} style={{color: '#D4A017'}} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search produce or farm..."
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
              {['Produce', 'Farmer', 'Category', 'Price', 'Qty', 'Rating', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-[10px] tracking-[2px] uppercase whitespace-nowrap"
                  style={{color: '#D4A017'}}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item._id} style={{borderBottom: '1px solid #f5f0e8'}}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden shrink-0"
                      style={{border: '1px solid #e5e0d5'}}>
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm whitespace-nowrap"
                      style={{color: '#1B4332'}}>
                      {item.name}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                  {item.farmer?.farmName || item.farmer?.name}
                </td>
                <td className="px-5 py-4 text-sm capitalize whitespace-nowrap"
                  style={{color: '#6b6b6b'}}>
                  {item.category}
                </td>
                <td className="px-5 py-4 text-sm font-medium whitespace-nowrap"
                  style={{color: '#1B4332'}}>
                  ₦{item.price?.toLocaleString()}
                </td>
                <td className="px-5 py-4 text-sm whitespace-nowrap" style={{color: '#6b6b6b'}}>
                  {item.quantity}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Star size={11} style={{color: '#D4A017'}} fill="#D4A017" />
                    <span className="text-sm">{item.rating?.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-[9px] tracking-wider uppercase font-bold"
                    style={{
                      background: item.isAvailable ? '#f0fdf4' : '#fef2f2',
                      color:      item.isAvailable ? '#1B4332' : '#ef4444',
                    }}>
                    {item.isAvailable ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleFeature(item._id, item.isFeatured)}
                      className="w-8 h-8 flex items-center justify-center transition-all"
                      title={item.isFeatured ? 'Unfeature' : 'Feature'}
                      style={{background: item.isFeatured ? '#fff8ed' : '#f5f0e8'}}
                    >
                      <Star size={13}
                        fill={item.isFeatured ? '#D4A017' : 'none'}
                        style={{color: '#D4A017'}} />
                    </button>
                    <button
                      onClick={() => handleToggle(item._id, item.isAvailable)}
                      className="w-8 h-8 flex items-center justify-center transition-all"
                      style={{background: '#f5f0e8'}}
                    >
                      {item.isAvailable
                        ? <ToggleRight size={13} style={{color: '#1B4332'}} />
                        : <ToggleLeft  size={13} style={{color: '#9a8a7a'}} />
                      }
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-8 h-8 flex items-center justify-center"
                      style={{background: '#fef2f2'}}
                    >
                      <Trash2 size={13} style={{color: '#ef4444'}} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm font-light" style={{color: '#6b6b6b'}}>No produce found</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default AdminProduce