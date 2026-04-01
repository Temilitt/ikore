import { useEffect, useRef } from 'react'
import { UserPlus, ListChecks, ShoppingBasket, Truck } from 'lucide-react'

const FARMER_IMG = 'https://res.cloudinary.com/doqniwpta/image/upload/v1774259165/young_farmer_n9u6k0.jpg'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up as a farmer or buyer in less than 2 minutes. Verify your profile and you are ready to go.',
    tag: 'Both',
    tagColor: '#D4A017',
  },
  {
    number: '02',
    icon: ListChecks,
    title: 'List Your Produce',
    description: 'Farmers add their produce with photos, price, quantity and location. Your farm store is live instantly.',
    tag: 'Farmers',
    tagColor: '#1B4332',
  },
  {
    number: '03',
    icon: ShoppingBasket,
    title: 'Browse & Order',
    description: 'Buyers browse fresh produce from verified farms across Nigeria. Order directly at farm prices.',
    tag: 'Buyers',
    tagColor: '#D4A017',
  },
  {
    number: '04',
    icon: Truck,
    title: 'Pay & Receive',
    description: 'Secure payment via Paystack. Farmer gets paid instantly. Buyer receives fresh produce at their door.',
    tag: 'Both',
    tagColor: '#1B4332',
  },
]

const HowItWorks = () => {
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
    <section className="py-28 overflow-hidden" style={{background: '#0D2016'}}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* HEADER */}
        <div ref={sectionRef} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <span className="section-tag">How Ikore Works</span>
            <h2 className="font-display font-bold leading-tight"
              style={{fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white'}}>
              Simple for farmers.
              <br />
              <span style={{color: '#D4A017'}}>Simple for buyers.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="leading-relaxed font-light"
              style={{color: 'rgba(255,255,255,0.5)', fontSize: '1rem'}}>
              We removed every barrier between the person who grows your food
              and the person who eats it. Four simple steps is all it takes.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2" style={{background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)'}}>
                <p className="text-xs tracking-wider" style={{color: '#D4A017'}}>For Farmers</p>
              </div>
              <div className="px-4 py-2" style={{background: 'rgba(27,67,50,0.5)', border: '1px solid rgba(27,67,50,0.8)'}}>
                <p className="text-xs tracking-wider" style={{color: 'rgba(255,255,255,0.6)'}}>For Buyers</p>
              </div>
            </div>
          </div>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{background: 'rgba(255,255,255,0.06)'}}>
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                ref={(el) => (cardRefs.current[i] = el)}
                className="p-8 flex flex-col gap-6 group cursor-default transition-all duration-300"
                style={{
                  opacity:    0,
                  transform:  'translateY(40px)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease, background 0.3s ease',
                  background: '#0D2016',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1B4332'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0D2016'}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 flex items-center justify-center"
                    style={{background: 'rgba(212,160,23,0.12)'}}>
                    <Icon size={20} style={{color: '#D4A017'}} />
                  </div>
                  <span className="px-3 py-1 text-[9px] tracking-[2px] uppercase font-bold"
                    style={{background: step.tagColor, color: 'white'}}>
                    {step.tag}
                  </span>
                </div>

                <p className="font-display font-bold"
                  style={{fontSize: '4rem', color: 'rgba(255,255,255,0.06)', lineHeight: 1}}>
                  {step.number}
                </p>

                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light"
                    style={{color: 'rgba(255,255,255,0.45)'}}>
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* BOTTOM IMAGE STRIP */}
        <div className="mt-16 grid grid-cols-3 gap-px">
          {[
            'https://res.cloudinary.com/doqniwpta/image/upload/v1774259172/women_farmers_skdlel.jpg',
            'https://res.cloudinary.com/doqniwpta/image/upload/v1774259165/young_farmer_n9u6k0.jpg',
            'https://res.cloudinary.com/doqniwpta/image/upload/v1774259132/family_farm_wz1jam.jpg',
          ].map((img, i) => (
            <div key={i} className="h-48 overflow-hidden relative">
              <img src={img} alt="Farm" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{background: 'rgba(13,32,22,0.4)'}} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks