import axios from 'axios'
import { message } from 'antd'

const baseURL = '/gateway'

const request = axios.create({
  baseURL,
  timeout: 20000,
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    message.error(`请求错误`)
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  res => {
    const quitLoginStatus = [500, 501, 502, 503]

    const response = res.data as ResponseCommonDataType

    if (response.status !== 200) {
      message.error(response.message)
      if (quitLoginStatus.includes(response.status as number)) {
        window.localStorage.removeItem('currentUser')
        window.location.href = `/#/login`
      }
    }

    return response
  },
  error => {
    message.error(`响应错误`)
    Promise.reject(error)
  }
)

export default request
