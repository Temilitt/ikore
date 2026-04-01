import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProduceDetail from './pages/ProduceDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import FarmerDashboard from './pages/farmer/FarmerDashboard'
import ListProduce from './pages/farmer/ListProduce'
import BuyerDashboard from './pages/buyer/BuyerDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProduce from './pages/admin/AdminProduce'
import AdminOrders from './pages/admin/AdminOrders'
import AdminLayout from './components/admin/AdminLayout'
import { AuthProvider } from './context/AuthContext'
import { AdminRoute, FarmerRoute, BuyerRoute } from './components/ProtectedRoute'

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC */}
          <Route path="/"            element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/marketplace" element={<PublicLayout><Marketplace /></PublicLayout>} />
          <Route path="/produce/:id" element={<PublicLayout><ProduceDetail /></PublicLayout>} />
          <Route path="/contact"     element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/login"       element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/register"    element={<PublicLayout><Register /></PublicLayout>} />

          {/* FARMER */}
          <Route path="/farmer/dashboard" element={<FarmerRoute><PublicLayout><FarmerDashboard /></PublicLayout></FarmerRoute>} />
          <Route path="/farmer/list"      element={<FarmerRoute><PublicLayout><ListProduce /></PublicLayout></FarmerRoute>} />

          {/* BUYER */}
          <Route path="/buyer/dashboard" element={<BuyerRoute><PublicLayout><BuyerDashboard /></PublicLayout></BuyerRoute>} />

          {/* ADMIN */}
          <Route path="/admin"           element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
          <Route path="/admin/produce"   element={<AdminRoute><AdminLayout><AdminProduce /></AdminLayout></AdminRoute>} />
          <Route path="/admin/orders"    element={<AdminRoute><AdminLayout><AdminOrders /></AdminLayout></AdminRoute>} />
          <Route path="/admin/users"     element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />

          {/* 404 */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App