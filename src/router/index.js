import Vue from 'vue'
import VueRouter from 'vue-router'

import vantdemo from '@/views/vantdemo.vue'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 练习页面
    path: '/vantdemo',
    component: vantdemo
  },
  {
    path: '/',
    redirect: '/home', // 路由重定向
    component: Home
  },
  {
    // 登录页面
    path: '/login',
    component: Login
  },
  {
    // 主页
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
