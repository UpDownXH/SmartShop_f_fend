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
  category: '所有商品',
  search: '搜索商品',
  detail: '商品详情',
}