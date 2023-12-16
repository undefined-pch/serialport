import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: '/index',
        name: '首页',
        component: () => import('../view/home.vue')
    },
    {
        path: '/Serialportlist',
        name: '串口列表',
        component: () => import('../view/Serialportlist.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router