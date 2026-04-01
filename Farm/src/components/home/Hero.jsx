import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, TrendingUp, Users, ShoppingBasket } from 'lucide-react'

const HERO_BG    = 'https://res.cloudinary.com/doqniwpta/image/upload/v1774259353/areal_drone_xnoypv.jpg'
const SUNRISE    = 'https://res.cloudinary.com/doqniwpta/image/upload/v1774259345/sunrise_pvfttf.jpg'
const FARMER     = 'https://res.cloudinary.com/doqniwpta/image/upload/v1774259178/smiling_farmer_hmf8uy.jpg'

const Hero = () => {
  const [search, setSearch] = useState('')

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="Ikore" className="w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{background: 'linear-gradient(to right, rgba(13,32,22,0.96) 50%, rgba(13,32,22,0.4) 100%)'}} />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full pt-24 pb-16">

          {/* LEFT */}
          <div>
            {/* TAG */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full"
              style={{background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)'}}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: '#D4A017'}} />
              <span className="text-[10px] tracking-[3px] uppercase font-medium" style={{color: '#D4A017'}}>
                Nigeria's Farm Marketplace
              </span>
            </div>

            {/* HEADLINE */}
            <h1 className="font-display font-bold text-white mb-6"
              style={{fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 1.05, letterSpacing: '-1px'}}>
              From soil
              <br />
              <span style={{color: '#D4A017'}}>to your</span>
              <br />
              table.
            </h1>

            <p className="mb-10 leading-relaxed max-w-md"
              style={{color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', fontWeight: 300}}>
              Ikore connects Nigerian farmers directly with buyers.
              No middlemen. Fair prices. Fresh produce.
              From any farm in Nigeria to your doorstep.
            </p>

            {/* SEARCH */}
            <div className="flex gap-0 mb-10 max-w-lg shadow-2xl">
              <div className="flex items-center gap-3 flex-1 px-5 bg-white">
                <Search size={16} style={{color: '#D4A017'}} className="shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tomatoes, yam, maize..."
                  className="flex-1 py-4 text-sm focus:outline-none bg-transparent"
                  style={{color: '#2D2D2D'}}
                />
              </div>
              <Link
                to={`/marketplace${search ? `?search=${search}` : ''}`}
                className="btn-gold flex items-center gap-2 whitespace-nowrap"
              >
                <Search size={14} />
                Search
              </Link>
            </div>

            {/* CTAS */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link to="/marketplace" className="btn-gold flex items-center gap-2">
                Browse Marketplace
                <ArrowRight size={15} />
              </Link>
              <Link to="/register"
                style={{border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: '14px 32px', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '8px'}}
              >
                Sell Your Produce
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap gap-8">
              {[
                { icon: Users,          value: '2,400+', label: 'Farmers'         },
                { icon: ShoppingBasket, value: '18,000+', label: 'Orders Fulfilled' },
                { icon: TrendingUp,     value: '36',      label: 'States Covered'  },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={16} style={{color: '#D4A017'}} />
                  <div>
                    <p className="font-display font-bold text-white text-lg leading-none">{value}</p>
                    <p className="text-[10px] tracking-wider uppercase mt-0.5"
                      style={{color: 'rgba(255,255,255,0.4)'}}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — IMAGE COLLAGE */}
          <div className="hidden lg:block relative h-[600px]">
            {/* MAIN IMAGE */}
            <div className="absolute right-0 top-0 w-72 h-80 overflow-hidden"
              style={{border: '3px solid rgba(212,160,23,0.3)'}}>
              <img src={SUNRISE} alt="Farm" className="w-full h-full object-cover" />
            </div>

            {/* FARMER IMAGE */}
            <div className="absolute left-0 bottom-0 w-64 h-72 overflow-hidden"
              style={{border: '3px solid rgba(255,255,255,0.1)'}}>
              <img src={FARMER} alt="Farmer" className="w-full h-full object-cover" />
            </div>

            {/* FLOATING CARD */}
            <div className="absolute right-4 bottom-24 bg-white p-4 shadow-2xl w-48">
              <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{color: '#D4A017'}}>
                Latest Price
              </p>
              <p className="font-display font-bold text-lg" style={{color: '#1B4332'}}>
                Tomatoes
              </p>
              <p className="text-sm font-medium" style={{color: '#2D2D2D'}}>
                ₦4,500 / basket
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={12} style={{color: '#22c55e'}} />
                <span className="text-xs" style={{color: '#22c55e'}}>+12% this week</span>
              </div>
            </div>

            {/* FLOATING TAG */}
            <div className="absolute left-8 top-16 px-4 py-2"
              style={{background: '#D4A017'}}>
              <p className="text-[10px] tracking-[2px] uppercase text-white font-bold">
                No Middlemen
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="absolute bottom-0 left-0 right-0"
        style={{background: 'rgba(212,160,23,0.95)'}}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-4 flex flex-wrap gap-8 items-center justify-between">
          <p className="text-white text-xs tracking-wider uppercase font-medium">
            Trusted by farmers across Nigeria
          </p>
          <div className="flex flex-wrap gap-8">
            {['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Enugu', 'Port Harcourt'].map((city) => (
              <span key={city} className="text-white text-xs opacity-80">{city}</span>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero