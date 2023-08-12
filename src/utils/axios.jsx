import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://157f-102-91-5-230.ngrok-free.app'
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