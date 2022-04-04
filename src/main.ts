import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from '@/router/index'
import App from './App.vue'
import store from './store'
import '../mock'

const app = createApp(App)

// 全局属性
// app.config.globalProperties.username = '张三'

app.use(router).use(store).use(ElementPlus).mount('#app')
