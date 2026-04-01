import { useEffect, useRef } from 'react'

const testimonials = [
  {
    name:     'Musa Abdullahi',
    role:     'Tomato Farmer, Kaduna',
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259178/smiling_farmer_hmf8uy.jpg',
    text:     `Before Ikore I was selling to middlemen at ₦2,000 per basket. Now I sell directly at ₦4,500. My income nearly doubled in 3 months. My family eats better. I can send my children to school. Ikore changed everything for us.`,
    stat:     '+124%',
    statLabel: 'Income increase',
  },
  {
    name:     'Chidinma Okafor',
    role:     'Buyer, Lagos',
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259158/vegetable_woman_iigbwh.jpg',
    text:     `I run a catering business and I need fresh produce every week. Ikore saves me at least ₦30,000 monthly compared to buying from Mile 12. The produce comes directly from farms — it is fresher and lasts longer in my kitchen.`,
    stat:     '₦30k',
    statLabel: 'Saved monthly',
  },
  {
    name:     'Emeka Nwachukwu',
    role:     'Rice Farmer, Ebonyi',
    image:    'https://res.cloudinary.com/doqniwpta/image/upload/v1774259165/young_farmer_n9u6k0.jpg',
    text:     `I used to lose up to 30% of my harvest because I could not find buyers fast enough. Now I list on Ikore and get orders before I even finish harvesting. The platform is simple and the payment is instant via Paystack.`,
    stat:     '0%',
    statLabel: 'Post-harvest loss',
  },
]

const Testimonials = () => {
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
            }, i * 150)
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
        <div ref={sectionRef} className="reveal text-center mb-16">
          <span className="section-tag">Real Stories</span>
          <h2 className="section-title">
            Farmers earning more.
            <br />
            <span style={{color: '#D4A017'}}>Buyers saving more.</span>
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className="flex flex-col"
              style={{
                opacity:    0,
                transform:  'translateY(40px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                background: 'white',
                border:     '1px solid #e5e0d5',
              }}
            >
              {/* STAT BAR */}
              <div className="px-8 py-6 flex items-center justify-between"
                style={{background: '#1B4332'}}>
                <div>
                  <p className="font-display font-bold text-3xl text-white">
                    {t.stat}
                  </p>
                  <p className="text-[10px] tracking-[2px] uppercase mt-1"
                    style={{color: 'rgba(255,255,255,0.5)'}}>
                    {t.statLabel}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{color: '#D4A017', fontSize: '14px'}}>★</span>
                  ))}
                </div>
              </div>

              {/* QUOTE */}
              <div className="p-8 flex-1">
                <p className="text-sm leading-relaxed font-light mb-8"
                  style={{color: '#6b6b6b'}}>
                  "{t.text}"
                </p>

                {/* PERSON */}
                <div className="flex items-center gap-4 pt-6"
                  style={{borderTop: '1px solid #e5e0d5'}}>
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 object-cover rounded-full"
                    style={{border: '2px solid #e5e0d5'}}
                  />
                  <div>
                    <p className="font-display font-bold text-sm"
                      style={{color: '#1B4332'}}>
                      {t.name}
                    </p>
                    <p className="text-[11px] tracking-wider"
                      style={{color: '#D4A017'}}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          <div className="p-12 flex flex-col justify-center"
            style={{background: '#1B4332'}}>
            <span className="section-tag" style={{color: '#D4A017'}}>
              Join Ikore Today
            </span>
            <h3 className="font-display font-bold text-white mb-4"
              style={{fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.2}}>
              Are you a farmer?
              <br />
              Start selling today.
            </h3>
            <p className="text-sm font-light mb-8"
              style={{color: 'rgba(255,255,255,0.55)'}}>
              Join 2,400+ farmers already earning more on Ikore.
              Free to sign up. No hidden fees.
            </p>
            <div className="flex gap-4">
              <a href="/register" className="btn-gold">
                Register as Farmer
              </a>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <img
              src="https://res.cloudinary.com/doqniwpta/image/upload/v1774259132/family_farm_wz1jam.jpg"
              alt="Farm family"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0"
              style={{background: 'rgba(27,67,50,0.3)'}} />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonials