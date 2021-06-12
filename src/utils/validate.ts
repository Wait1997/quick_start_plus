/**
 * @param path 路由的路径
 */
export function isExternal(path: string): boolean {
  return /^(https?:|tel:)/.test(path)
}
