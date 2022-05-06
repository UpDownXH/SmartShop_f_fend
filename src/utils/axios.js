import axios from 'axios'
import router from '@/router/index'
import config from '~/config'
import { ElMessage } from 'element-plus'
import { localGet } from './index'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 请求头，headers 信息
// axios.defaults.headers['cookie'] = 'JWT ' + localGet('tokusernameen')
// axios.defaults.headers['Cookie'] = 'username=' + localGet('tokusernameen')+'; sessionid=' + localGet('sessionid')
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 请求自动携带cookie
axios.defaults.withCredentials = true;


export default axios