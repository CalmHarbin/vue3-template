import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import logo from '@/assets/logo.png'
import router from '@/router'
import App from './App.vue'
import store from './store'
import 'element-plus/dist/index.css'

const imgUrl = new URL('./assets/logo.png', import.meta.url)
console.log(imgUrl)
console.log(logo)
console.log(import.meta.env.VITE_APP_TITLE)

console.log(router)

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
