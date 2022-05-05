// config/index.js
export default {
    development: {
      baseUrl: '//192.168.178.1:8000' // 开发代理地址
    },
    beta: {
      baseUrl: '//192.168.178.137:8000' // 测试接口域名
    },
    release: {
      baseUrl: '//192.168.178.137:8000' // 正式接口域名
    }
  }