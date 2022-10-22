import request from '../request'

export const login = (data: { username: string; password: string | number }): ResponseCommonType<LoginResponseType> => {
  return request({
    method: 'POST',
    url: '/login',
    data,
  })
}
