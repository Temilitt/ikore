import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Star, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { getProduce } from '../services/api'

const categories = ['all', 'vegetables', 'tubers', 'grains', 'fruits', 'spices', 'livestock', 'other']

const nigerianStates = [
  'All States','Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue',
  'Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara','FCT Abuja'
]

const Marketplace = () => {
  const [searchParams]              = useSearchParams()
  const [produce,    setProduce]    = useState([])
  const [loading,    setLoading]    = useState(true)
  const [search,     setSearch]     = useState(searchParams.get('search') || '')
  const [category,   setCategory]   = useState('all')
  const [state,      setState]      = useState('All States')
  const [sort,       setSort]       = useState('createdAt')
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    fetchProduce()
  }, [category, state, sort])

  const fetchProduce = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search)              params.search   = search
      if (category !== 'all')  params.category = category
      if (state !== 'All States') params.state = state
      if (sort)                params.sort     = sort

      const { data } = await getProduce(params)
setProduce(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProduce()
  }

  return (
    <div className="min-h-screen pb-24" style={{background: '#F8F4E9', paddingTop: '100px'}}>

      {/* HEADER */}
      <div style={{background: '#0D2016'}}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
          <span className="section-tag">Fresh From Nigerian Farms</span>
          <h1 className="font-display font-bold text-white mb-4"
            style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}>
            The Marketplace
          </h1>
          <p className="font-light mb-8 max-w-lg"
            style={{color: 'rgba(255,255,255,0.5)'}}>
            Browse fresh produce directly from verified Nigerian farmers.
            No middlemen. Fair prices.
          </p>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="flex gap-0 max-w-xl">
            <div className="flex items-center gap-3 flex-1 px-5 bg-white">
              <Search size={16} style={{color: '#D4A017'}} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tomatoes, yam, rice..."
                className="flex-1 py-4 text-sm focus:outline-none"
                style={{color: '#2D2D2D'}}
              />
              {search && (
                <button type="button" onClick={() => { setSearch(''); fetchProduce() }}>
                  <X size={14} style={{color: '#9a8a7a'}} />
                </button>
              )}
            </div>
            <button type="submit" className="btn-gold px-8">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-10">

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-2 text-xs tracking-wider uppercase font-medium transition-all capitalize"
                style={{
                  background: category === cat ? '#1B4332' : 'white',
                  color:      category === cat ? 'white'   : '#1B4332',
                  border:     '1px solid #1B4332',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SORT & STATE */}
          <div className="flex gap-3">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-input py-2 text-xs"
              style={{width: 'auto'}}
            >
              {nigerianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-input py-2 text-xs"
              style={{width: 'auto'}}
            >
              <option value="createdAt">Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <p className="text-sm mb-6 font-light" style={{color: '#6b6b6b'}}>
          {loading ? 'Loading...' : `${produce.length} produce found`}
        </p>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
              style={{borderColor: '#1B4332', borderTopColor: 'transparent'}} />
          </div>
        )}

        {/* PRODUCE GRID */}
        {!loading && produce.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produce.map((item) => (
              <Link
                key={item._id}
                to={`/produce/${item._id}`}
                className="group overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:  'white',
                  border:      '1px solid #e5e0d5',
                  boxShadow:   '0 0 0 rgba(0,0,0,0)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)'}
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.images?.[0] || 'https://res.cloudinary.com/doqniwpta/image/upload/v1774259329/tomato_y7uae8.webp'}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 text-[9px] tracking-wider uppercase font-bold capitalize"
                    style={{background: '#1B4332', color: 'white'}}>
                    {item.category}
                  </div>
                  {item.farmer?.isVerified && (
                    <div className="absolute top-3 right-3 px-2 py-1 text-[9px] tracking-wider uppercase font-bold"
                      style={{background: '#D4A017', color: 'white'}}>
                      Verified
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg mb-1"
                    style={{color: '#1B4332'}}>
                    {item.name}
                  </h3>
                  <p className="text-xs mb-3 font-medium" style={{color: '#D4A017'}}>
                    {item.farmer?.farmName || item.farmer?.name}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-display font-bold text-xl" style={{color: '#1B4332'}}>
                        ₦{item.price?.toLocaleString()}
                      </p>
                      <p className="text-[10px]" style={{color: '#9a8a7a'}}>per {item.unit}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Star size={11} style={{color: '#D4A017'}} fill="#D4A017" />
                        <span className="text-xs font-medium">{item.rating?.toFixed(1) || '0.0'}</span>
                      </div>
                      <p className="text-[10px]" style={{color: '#9a8a7a'}}>{item.totalSold} sold</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 pt-3"
                    style={{borderTop: '1px solid #e5e0d5'}}>
                    <MapPin size={11} style={{color: '#D4A017'}} />
                    <span className="text-xs" style={{color: '#9a8a7a'}}>{item.state}</span>
                    <span className="text-xs ml-auto" style={{color: '#9a8a7a'}}>
                      {item.quantity} {item.unit} available
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && produce.length === 0 && (
          <div className="text-center py-24">
            <p className="font-display font-bold text-2xl mb-3" style={{color: '#1B4332'}}>
              No produce found
            </p>
            <p className="text-sm font-light mb-6" style={{color: '#6b6b6b'}}>
              Try a different search or category
            </p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); setState('All States'); fetchProduce() }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Marketplace