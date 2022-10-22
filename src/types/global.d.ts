// import type { AxiosPromise } from 'axios'

declare type ResponseCommonDataType<T = null> = {
  data: T
  message?: string
  status: number | string
}

declare type ResponseCommonType<T = null> = Promise<ResponseCommonDataType<T>>

declare type LoginResponseType = {
  tokenId: number
  token: string
  username: string
  nickname: string
  userId: number
  avatar: string
  gender: number
  role: number
  roleDescription: string
}
