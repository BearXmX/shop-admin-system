import request from '../request'

export const test = () => {
  return request.get('/get/getBarData')
}
