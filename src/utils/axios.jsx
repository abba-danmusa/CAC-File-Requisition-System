import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cac-file-requisition-system-server.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  async (config) => {
    let token = null
    if (typeof window !== 'undefined') {
      try {
        token = localStorage.getItem('token')
      } catch (e) {
        token = null
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance