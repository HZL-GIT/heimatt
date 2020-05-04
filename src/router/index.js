import Vue from 'vue'
import VueRouter from 'vue-router'

import vantdemo from '@/views/vantdemo.vue'
import Login from '@/views/login/login.vue'
import Layout from '../views/home/layout.vue'
import Index from '@/views/home/index/index.vue'
import My from '@/views/home/my/my.vue'
import Search from '@/views/home/search/search.vue'
import SearchResult from '@/views/home/search/searchResult.vue'
import Detail from '@/views/home/detail/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 练习页面
    path: '/vantdemo',
    component: vantdemo
  },
  {
    path: '/',
    redirect: '/index', // 路由重定向
    component: Index
  },
  {
    // 登录页面
    path: '/login',
    component: Login
  },
  {
    // 登录验证页面
    path: '/checklogin',
    component: Login
  },
  {
    // 主页
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/my',
        component: My
      },
      {
        path: '/search',
        component: Search
      }
    ]
  },
  // 搜索结果页面
  {
    path: '/searchresult',
    component: SearchResult
  },
  // 文章详情
  {
    path: '/detail',
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

export default router
