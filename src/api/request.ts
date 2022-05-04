import axios from 'axios'

const baseURL = 'http://localhost:3001/shop-admin'
const request = axios.create({
  baseURL,
  timeout: 20000,
})

request.interceptors.request.use(
  config => {
    config.data = config.data ? JSON.stringify(config.data) : undefined
    return config
  },
  error => {
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    Promise.reject(error)
  }
)

export default request
