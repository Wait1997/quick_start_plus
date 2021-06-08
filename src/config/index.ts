/*
 * @Author: @guofang
 * @Date: 2021-06-08 12:29:28
 * @Last Modified by: @guofang
 * @Last Modified time: 2021-06-08 16:04:54
 */

import Axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import store from '@/store'
import router from '@/router'
import { ElLoading, ElMessage } from 'element-plus'
import { baseURL } from './config'

import { WebReq, Response } from './url'
import { getHeaders } from './utils'

// 继承axiosRequestConfig并添加一个类型
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  contentType?: 'application/json' | 'multipart/form-data' | 'application/x-www-form-urlencoded'
}

export interface Headers {
  Authorization: string
  'Content-Type'?: string
}

export interface Options {
  headers?: Headers
  config?: CustomAxiosRequestConfig
}

export class Webapi {
  private axios: AxiosInstance

  protected reqInterceptors: number

  protected resInterceptors: number

  private loading: any

  constructor(options: Options) {
    this.axios = Axios.create(options.config)
    this.reqInterceptors = this.axios.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        this.loading = ElLoading.service({ text: '拼命加载中' })
        // 获取token
        const token = store.getters.token
        config.headers = {
          ...config.headers,
          ...getHeaders(config, token)
        }
        return config
      },
      error => Promise.reject(error)
    )
    this.resInterceptors = this.axios.interceptors.response.use(
      response => {
        if (this.loading) {
          this.loading.close()
        }
        const code: number = response.status
        if ((code >= 200 && code < 300) || code === 304) {
          return response.data
        }
        return Promise.reject(response)
      },
      error => {
        if (this.loading) {
          this.loading.close()
        }
        const response = error?.response
        if (response) {
          switch (response.status) {
            case 401:
              store.commit('DEL_TOKEN')
              router.replace({
                path: '/login',
                query: {
                  // redirect: router.currentRoute.fullPath
                }
              })
              break
            case 404:
              ElMessage.error('网络请求不存在')
              break
            default:
              ElMessage.error(response.data.message)
          }
        } else {
          // 请求超时或者网络有问题
          if (error.message.includes('timeout')) {
            ElMessage.error('请求超时！请检查网络是否正常')
          } else {
            ElMessage.error('请求失败，请检查网络是否已连接')
          }
        }
        Promise.reject(error)
      }
    )
  }

  public get<T>(url: string, params?: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'get')
  }

  public post<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'post')
  }

  public put<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'put')
  }

  public delete<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'delete')
  }

  public patch<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'patch')
  }

  private api<T>(url: string, req: WebReq, method: Method = 'get'): Promise<Response<T>> {
    method = method.toLocaleLowerCase() as Method
    switch (method) {
      case 'get':
        return this.axios.get(url, req.config)
      case 'delete':
        return this.axios.delete(url, req.config)
      case 'post':
        return this.axios.post(url, req.params, req.config)
      case 'put':
        return this.axios.put(url, req.params, req.config)
      case 'patch':
        return this.axios.patch(url, req.params, req.config)
      default:
        return this.axios.get(url, { params: req.params })
    }
  }
}

export const webapi: Webapi = new Webapi({
  config: {
    baseURL: `${baseURL}`,
    timeout: 1000000
  }
})
