import { CustomAxiosRequestConfig } from './index'

export interface WebReq {
  params?: { [index: string]: any }
  config?: CustomAxiosRequestConfig
}

// 响应类型
export interface Response<T> {
  code: number
  data: T
}
