import Cookies from 'js-cookie'

// token
const TokenKey = 'quick_start_plus_token'
// 侧边栏状态控制
const SidebarKey = 'sidebarStatus'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string): void {
  Cookies.set(TokenKey, token)
}

export function removeToken(): void {
  Cookies.remove(TokenKey)
}

export function getSidebarStatus(): boolean {
  if (Number(localStorage.getItem(SidebarKey))) {
    return Boolean(localStorage.getItem(SidebarKey))
  }
  return false
}

export function setSidebarStatus(status: number): void {
  localStorage.setItem(SidebarKey, String(status))
}

export function removeSidebarStatus(): void {
  localStorage.removeItem(SidebarKey)
}
