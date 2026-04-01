import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ikore_user') || 'null')
  )

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data)
    localStorage.setItem('ikore_user', JSON.stringify(data))
    return data
  }

  const register = async (formData) => {
    const { data } = await api.post('/auth/register', formData)
    setUser(data)
    localStorage.setItem('ikore_user', JSON.stringify(data))
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ikore_user')
  }

  const updateUser = (data) => {
    setUser(data)
    localStorage.setItem('ikore_user', JSON.stringify(data))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)