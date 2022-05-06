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
  cart: '购物车',
  pay: '支付',
  email: '邮箱验证',
  emailVerify: '邮箱验证成功',
  address: '收货地址'
}