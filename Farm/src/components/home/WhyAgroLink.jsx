import { useEffect, useRef } from 'react'
import { ShieldCheck, Banknote, Leaf, Clock, BarChart3, HeartHandshake } from 'lucide-react'

const LANDSCAPE = 'https://res.cloudinary.com/doqniwpta/image/upload/v1774259334/landscape_wwq1ju.jpg'
const WOMAN     = 'https://res.cloudinary.com/doqniwpta/image/upload/v1774259158/vegetable_woman_iigbwh.jpg'

const features = [
  {
    icon:        ShieldCheck,
    title:       'Verified Farmers',
    description: 'Every farmer on Ikore is verified. You know exactly who grew your food and where it came from.',
  },
  {
    icon:        Banknote,
    title:       'Fair Prices',
    description: 'No middlemen means farmers earn more and buyers pay less. Direct trade, transparent pricing.',
  },
  {
    icon:        Leaf,
    title:       'Fresh Produce',
    description: 'Farm-fresh produce ordered directly from the source. What you see is what you get.',
  },
  {
    icon:        Clock,
    title:       'Fast Delivery',
    description: 'Orders processed within 24 hours. Delivery across all 36 states in Nigeria.',
  },
  {
    icon:        BarChart3,
    title:       'Market Prices',
    description: 'Real-time market price data helps farmers sell at the right time and buyers budget better.',
  },
  {
    icon:        HeartHandshake,
    title:       'Farmer Support',
    description: 'We provide farmers with tools, training and a platform to grow their business digitally.',
  },
]

const WhyAgroLink = () => {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1'
              entry.target.style.transform = 'translateY(0)'
            }, i * 100)
          }
        })
      },
      { threshold: 0.1 }
    )
    cardRefs.current.forEach((c) => { if (c) cardObserver.observe(c) })
    return () => { observer.disconnect(); cardObserver.disconnect() }
  }, [])

  return (
    <section className="py-28 overflow-hidden" style={{background: 'white'}}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* HEADER */}
        <div ref={sectionRef} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <span className="section-tag">Why Ikore</span>
            <h2 className="section-title">
              Built for Nigeria's
              <br />
              <span style={{color: '#D4A017'}}>farming future.</span>
            </h2>
          </div>
          <div>
            <p className="leading-relaxed font-light mb-6"
              style={{color: '#6b6b6b', fontSize: '1rem'}}>
              Nigeria loses over 40% of its food to post-harvest waste every year.
              Ikore exists to fix that — by connecting the people who grow food
              directly with the people who need it.
            </p>
            <div className="divider" />
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — IMAGES */}
          <div className="relative h-[500px]">
            <div className="absolute left-0 top-0 w-3/4 h-72 overflow-hidden"
              style={{border: '4px solid #F8F4E9'}}>
              <img src={LANDSCAPE} alt="Farm landscape"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-0 bottom-0 w-2/3 h-64 overflow-hidden"
              style={{border: '4px solid #F8F4E9'}}>
              <img src={WOMAN} alt="Farmer"
                className="w-full h-full object-cover" />
            </div>
            {/* STAT CARD */}
            <div className="absolute left-4 bottom-16 bg-white p-6 shadow-xl"
              style={{border: '1px solid #e5e0d5'}}>
              <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{color: '#D4A017'}}>
                Farmers Earning More
              </p>
              <p className="font-display font-bold text-3xl" style={{color: '#1B4332'}}>
                +68%
              </p>
              <p className="text-xs mt-1" style={{color: '#9a8a7a'}}>
                Average income increase
              </p>
            </div>
            {/* GREEN TAG */}
            <div className="absolute right-4 top-16 px-4 py-3"
              style={{background: '#1B4332'}}>
              <p className="text-[10px] tracking-[2px] uppercase text-white font-bold">
                Zero Middlemen
              </p>
            </div>
          </div>

          {/* RIGHT — FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="p-6 transition-all duration-300 group cursor-default"
                  style={{
                    opacity:    0,
                    transform:  'translateY(40px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease, background 0.3s ease, border-color 0.3s ease',
                    background: '#F8F4E9',
                    border:     '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background    = 'white'
                    e.currentTarget.style.borderColor   = '#e5e0d5'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background    = '#F8F4E9'
                    e.currentTarget.style.borderColor   = 'transparent'
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{background: 'rgba(27,67,50,0.08)'}}>
                    <Icon size={18} style={{color: '#1B4332'}} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2"
                    style={{color: '#1B4332'}}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light"
                    style={{color: '#6b6b6b'}}>
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

export default WhyAgroLink