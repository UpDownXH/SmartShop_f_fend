export function localGet(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

export function localSet(key, value) {
  window.localStorage.setItem(key, value)
}

export function localRemove(key) {
  window.localStorage.removeItem(key)
}

export const pathMap = {
  index: '首页',
  intruduce: '系统介绍',
  login: '登录',
  // register: '注册',
  // add: '添加商品',
  sku: 'SKU管理',
  pictures: '图片管理',
  user: '用户管理',
  author: '权限管理',
  group: '权限管理',
  admin: '管理员管理',
}