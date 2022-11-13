import request from '../request'

export const getAllUser = (data: {
  username?: string
  role?: number
  page: number
  pageSize: number
}): ResponseCommonType<{
  total: number
  list: LoginResponseType[]
}> => {
  return request({
    method: 'POST',
    url: '/user/get-user',
    data,
  })
}
