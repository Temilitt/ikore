import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const AdminRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/admin" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export const FarmerRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'farmer' && user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export const BuyerRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}