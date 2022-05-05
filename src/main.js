import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import * as ElIcons from '@element-plus/icons-vue'

const app = createApp(App) // 生成 Vue 实例 app

// 导入图标
for (let iconName in ElIcons) {
	app.component(iconName, ElIcons[iconName])
}	


app.use(router) // 引用路由实例

app.mount('#app') // 挂载到 #app