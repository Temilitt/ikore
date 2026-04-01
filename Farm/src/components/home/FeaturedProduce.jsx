import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Star } from 'lucide-react'

const produce = [
  {
    name:     'Fresh Tomatoes',
    farm:     'Kaduna Fresh Farms',
    location: 'Kaduna',
    price:    '₦4,500',
    unit:     'per basket',
    category: 'Vegetables',
    rating:   4.8,
    sold:     234,
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259329/tomato_y7uae8.webp',
    tag:      'Best Seller',
    tagColor: '#D4A017',
  },
  {
    name:     'Yam Tubers',
    farm:     'Benue Yam Estate',
    location: 'Benue',
    price:    '₦12,000',
    unit:     'per bag',
    category: 'Tubers',
    rating:   4.9,
    sold:     189,
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259313/yam_lgz0pl.webp',
    tag:      'Fresh',
    tagColor: '#1B4332',
  },
  {
    name:     'Cassava',
    farm:     'Oyo Cassava Hub',
    location: 'Oyo',
    price:    '₦8,000',
    unit:     'per bag',
    category: 'Tubers',
    rating:   4.7,
    sold:     312,
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259295/cassava_dmqrlv.jpg',
    tag:      'Popular',
    tagColor: '#D4A017',
  },
  {
    name:     'Fresh Pepper',
    farm:     'Sokoto Pepper Farm',
    location: 'Sokoto',
    price:    '₦3,200',
    unit:     'per basket',
    category: 'Spices',
    rating:   4.6,
    sold:     156,
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259279/pepper_market_yraqph.jpg',
    tag:      'Hot Deal',
    tagColor: '#ef4444',
  },
  {
    name:     'Sweet Plantain',
    farm:     'Cross River Farms',
    location: 'Cross River',
    price:    '₦5,500',
    unit:     'per bunch',
    category: 'Fruits',
    rating:   4.8,
    sold:     278,
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259220/plaintain_brrfqo.jpg',
    tag:      'Fresh',
    tagColor: '#1B4332',
  },
  {
    name:     'Watermelon',
    farm:     'Kano Fresh Gardens',
    location: 'Kano',
    price:    '₦2,800',
    unit:     'per piece',
    category: 'Fruits',
    rating:   4.9,
    sold:     421,
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259210/watermelon_xjvu63.jpg',
    tag:      'Best Seller',
    tagColor: '#D4A017',
  },
]

const FeaturedProduce = () => {
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
    <section className="py-28 px-8 md:px-16" style={{background: '#F8F4E9'}}>
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div ref={sectionRef} className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="section-tag">Fresh From The Farm</span>
            <h2 className="section-title">
              Featured
              <br />
              <span style={{color: '#D4A017'}}>Produce</span>
            </h2>
          </div>
          <Link to="/marketplace"
            className="flex items-center gap-2 text-sm font-medium self-start md:self-auto"
            style={{color: '#1B4332'}}>
            View all produce
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* PRODUCE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produce.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group cursor-pointer overflow-hidden"
              style={{
                opacity:    0,
                transform:  'translateY(40px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                background: 'white',
                border:     '1px solid #e5e0d5',
              }}
            >
              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-all duration-300"
                  style={{background: 'rgba(0,0,0,0)'}}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
                />
                {/* TAG */}
                <div className="absolute top-4 left-4 px-3 py-1"
                  style={{background: item.tagColor}}>
                  <p className="text-[9px] tracking-[2px] uppercase text-white font-bold">
                    {item.tag}
                  </p>
                </div>
                {/* CATEGORY */}
                <div className="absolute top-4 right-4 px-3 py-1"
                  style={{background: 'rgba(255,255,255,0.9)'}}>
                  <p className="text-[9px] tracking-[2px] uppercase font-bold"
                    style={{color: '#1B4332'}}>
                    {item.category}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-1"
                      style={{color: '#1B4332'}}>
                      {item.name}
                    </h3>
                    <p className="text-xs font-medium" style={{color: '#D4A017'}}>
                      {item.farm}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-xl"
                      style={{color: '#1B4332'}}>
                      {item.price}
                    </p>
                    <p className="text-[10px]" style={{color: '#9a8a7a'}}>
                      {item.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4"
                  style={{borderTop: '1px solid #e5e0d5'}}>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} style={{color: '#D4A017'}} />
                    <span className="text-xs" style={{color: '#9a8a7a'}}>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} style={{color: '#D4A017'}} fill="#D4A017" />
                    <span className="text-xs font-medium" style={{color: '#2D2D2D'}}>{item.rating}</span>
                    <span className="text-xs" style={{color: '#9a8a7a'}}>({item.sold} sold)</span>
                  </div>
                </div>

                <Link to="/marketplace"
                  className="btn-primary w-full text-center mt-4 block text-[11px]">
                  Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturedProduce