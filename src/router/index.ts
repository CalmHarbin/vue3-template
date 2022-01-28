import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import tm from '@/views/test/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/demo',
        name: 'demo',
        component: tm
    }
]
const router = createRouter({
    // history 模式的实现。hash模式:createWebHashHistory()
    history: createWebHistory(),
    routes
})

export default router
