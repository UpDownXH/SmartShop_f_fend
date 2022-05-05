export function localGet(key) {
   var r = document.cookie.match("\\b" + key + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}

export function localSet(key, value) {
  window.localStorage.setItem(key, value)
}

export function localRemove(key) {
  // window.localStorage.removeItem(key)
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