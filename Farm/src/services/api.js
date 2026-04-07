import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('ikore_user') || '{}')
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

// AUTH
export const loginApi    = (data) => api.post('/auth/login',   data)
export const registerApi = (data) => api.post('/auth/register', data)
export const getMe       = ()     => api.get('/auth/me')
export const updateProfile = (data) => api.put('/auth/profile', data)

// PRODUCE
export const getProduce        = (params) => api.get('/produce', { params })
export const getFeatured       = ()       => api.get('/produce/featured')
export const getMyProduce      = ()       => api.get('/produce/my')
export const getProduceById    = (id)     => api.get(`/produce/${id}`)
export const createProduce     = (data)   => api.post('/produce', data)
export const updateProduce     = (id, data) => api.put(`/produce/${id}`, data)
export const deleteProduce     = (id)     => api.delete(`/produce/${id}`)
export const addReview         = (id, data) => api.post(`/produce/${id}/review`, data)

// ORDERS
export const getOrders        = ()         => api.get('/orders')
export const getMyOrders      = ()         => api.get('/orders/my')
export const getFarmerOrders  = ()         => api.get('/orders/farmer')
export const getOrderById     = (id)       => api.get(`/orders/${id}`)
export const createOrder      = (data)     => api.post('/orders', data)
export const updateOrder      = (id, data) => api.put(`/orders/${id}`, data)



console.log('API URL:', import.meta.env.VITE_API_URL)

export default api