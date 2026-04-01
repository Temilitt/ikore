import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBasket, ChevronDown } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()
  const { user, logout }        = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const links = [
    { label: 'Home',        path: '/'            },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Contact',     path: '/contact'     },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-3' : 'py-5'
    }`}
    style={{
      background:    scrolled ? 'white' : 'transparent',
      backdropFilter: !scrolled ? 'none' : 'none',
      boxShadow:     scrolled ? '0 1px 20px rgba(0,0,0,0.08)' : 'none',
    }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display font-bold text-2xl tracking-tight"
            style={{color: scrolled ? '#1B4332' : 'white', letterSpacing: '-0.5px'}}>
            Ikore
          </span>
          <span className="text-[9px] tracking-[3px] uppercase"
            style={{color: scrolled ? '#D4A017' : 'rgba(255,255,255,0.6)'}}>
            Harvest
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-[2px] uppercase font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-gold-500'
                  : scrolled
                    ? 'text-green-500 hover:text-gold-500'
                    : 'text-white opacity-80 hover:opacity-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={user.role === 'farmer' ? '/farmer/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/buyer/dashboard'}
                className="text-xs tracking-[2px] uppercase font-medium transition-colors"
                style={{color: scrolled ? '#1B4332' : 'white'}}
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn-outline py-2.5 px-6 text-[11px]"
                style={{
                  borderColor: scrolled ? '#1B4332' : 'white',
                  color:       scrolled ? '#1B4332' : 'white',
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs tracking-[2px] uppercase font-medium transition-colors"
                style={{color: scrolled ? '#1B4332' : 'white'}}
              >
                Login
              </Link>
              <Link to="/register" className="btn-gold py-2.5 px-6 text-[11px]">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{color: scrolled ? '#1B4332' : 'white'}}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-8 py-6 flex flex-col gap-5"
          style={{borderColor: '#e5e0d5'}}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-xs tracking-[2px] uppercase font-medium"
              style={{color: location.pathname === link.path ? '#D4A017' : '#1B4332'}}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-3"
            style={{borderTop: '1px solid #e5e0d5'}}>
            {user ? (
              <>
                <Link
                  to={user.role === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard'}
                  className="btn-primary py-3 text-center text-[11px]"
                >
                  Dashboard
                </Link>
                <button onClick={logout} className="btn-outline py-3 text-center text-[11px]">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="btn-outline py-3 text-center text-[11px]">Login</Link>
                <Link to="/register" className="btn-gold py-3 text-center text-[11px]">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
