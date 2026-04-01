import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{background: '#0D2016'}}>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

          {/* BRAND */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col leading-none mb-6">
              <span className="font-display font-bold text-2xl text-white"
                style={{letterSpacing: '-0.5px'}}>
                Ikore
              </span>
              <span className="text-[9px] tracking-[3px] uppercase mt-0.5"
                style={{color: '#D4A017'}}>
                Harvest
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 font-light"
              style={{color: 'rgba(255,255,255,0.4)'}}>
              Nigeria's farm-to-table marketplace.
              Connecting farmers directly with buyers
              across all 36 states.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: 'https://instagram.com/justtemilit'              },
                { icon: Twitter,   href: 'https://x.com/justtemilit'                      },
                { icon: Linkedin,  href: 'https://linkedin.com/in/temiloluwa-adeboye'     },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                  style={{background: 'rgba(255,255,255,0.06)'}}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1B4332'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                >
                  {React.createElement(social.icon, { size: 15, className: 'text-white' })}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <p className="text-[10px] tracking-[3px] uppercase mb-6 font-semibold"
              style={{color: '#D4A017'}}>
              Quick Links
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Home',        path: '/'            },
                { label: 'Marketplace', path: '/marketplace' },
                { label: 'Contact',     path: '/contact'     },
                { label: 'Login',       path: '/login'       },
                { label: 'Register',    path: '/register'    },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-light transition-colors duration-300 hover:text-white"
                  style={{color: 'rgba(255,255,255,0.4)'}}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <p className="text-[10px] tracking-[3px] uppercase mb-6 font-semibold"
              style={{color: '#D4A017'}}>
              Categories
            </p>
            <div className="flex flex-col gap-4">
              {[
                'Vegetables',
                'Tubers & Roots',
                'Grains & Cereals',
                'Fruits',
                'Spices & Herbs',
                'Livestock',
              ].map((cat) => (
                <Link
                  key={cat}
                  to="/marketplace"
                  className="text-sm font-light transition-colors duration-300 hover:text-white"
                  style={{color: 'rgba(255,255,255,0.4)'}}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-[10px] tracking-[3px] uppercase mb-6 font-semibold"
              style={{color: '#D4A017'}}>
              Contact
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: Phone,  text: '09016196558'                        },
                { icon: Mail,   text: 'aderounmutemiloluwa2004@gmail.com'  },
                { icon: MapPin, text: 'Ibadan, Oyo State, Nigeria'         },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  {React.createElement(item.icon, {
                    size: 14,
                    className: 'shrink-0 mt-0.5',
                    style: { color: '#D4A017' },
                  })}
                  <p className="text-sm font-light"
                    style={{color: 'rgba(255,255,255,0.4)'}}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{color: 'rgba(255,255,255,0.25)'}}>
            © 2024 Ikore. All rights reserved.
          </p>
          <p className="text-xs" style={{color: 'rgba(255,255,255,0.25)'}}>
            Built by{' '}
            <a
              href="https://github.com/Temilitt"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
              style={{color: '#D4A017'}}
            >
              Temiloluwa Aderounmu
            </a>
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer
