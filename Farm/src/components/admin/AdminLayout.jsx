import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBasket, Users, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Produce',   path: '/admin/produce',   icon: Package          },
  { label: 'Orders',    path: '/admin/orders',    icon: ShoppingBasket   },
  { label: 'Users',     path: '/admin/users',     icon: Users            },
]

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const location         = useLocation()
  const navigate         = useNavigate()
  const [open, setOpen]  = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex" style={{background: '#F8F4E9'}}>

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen"
        style={{background: '#0D2016'}}>

        {/* LOGO */}
        <div className="px-8 py-8" style={{borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display font-bold text-2xl text-white"
              style={{letterSpacing: '-0.5px'}}>
              Ikore
            </span>
            <span className="text-[9px] tracking-[3px] uppercase mt-0.5"
              style={{color: '#D4A017'}}>
              Admin Panel
            </span>
          </Link>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 py-8 flex flex-col gap-1">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center gap-3 px-4 py-3 transition-all duration-200"
              style={{
                background:  location.pathname === path ? 'rgba(212,160,23,0.15)' : 'transparent',
                color:       location.pathname === path ? '#D4A017' : 'rgba(255,255,255,0.45)',
                borderLeft:  location.pathname === path ? '2px solid #D4A017' : '2px solid transparent',
              }}
            >
              <Icon size={17} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        {/* USER */}
        <div className="px-6 py-6" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
          <p className="text-sm font-medium text-white mb-0.5">{user?.name}</p>
          <p className="text-xs mb-4" style={{color: 'rgba(255,255,255,0.3)'}}>
            {user?.email}
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs tracking-wider uppercase transition-colors"
            style={{color: 'rgba(255,255,255,0.3)'}}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{background: '#0D2016'}}>
        <span className="font-display font-bold text-xl text-white">Ikore Admin</span>
        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 pt-16"
          style={{background: '#0D2016'}}>
          <nav className="flex flex-col gap-1 px-4 py-6">
            {navItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-4"
                style={{color: location.pathname === path ? '#D4A017' : 'rgba(255,255,255,0.45)'}}
              >
                <Icon size={17} />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-4 mt-4"
              style={{color: '#ef4444'}}>
              <LogOut size={17} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1">
        <div className="pt-16 md:pt-0">
          {children}
        </div>
      </main>

    </div>
  )
}

export default AdminLayout