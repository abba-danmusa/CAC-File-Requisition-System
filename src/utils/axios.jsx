import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://2882-197-210-71-119.ngrok-free.app'
})

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
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