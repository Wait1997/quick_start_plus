import Cookies from 'js-cookie'

const TokenKey = 'quick_start_plus_token'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token)
}
