import { CustomAxiosRequestConfig } from './index'

export const getHeaders = (
  config: CustomAxiosRequestConfig,
  Authorization: string | null
): {
  'Content-Type': 'multipart/form-data' | 'application/x-www-form-urlencoded' | 'application/json' | undefined
  Authorization?: string | null
} => {
  if (Authorization) {
    return {
      Authorization: Authorization,
      'Content-Type': config.contentType || 'application/json'
    }
  }
  return {
    'Content-Type': config.contentType || 'application/json'
  }
}
