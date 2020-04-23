import Vue from 'vue'
import VueRouter from 'vue-router'

import vantdemo from '@/views/vantdemo.vue'
import Login from '@/views/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vantdemo',
    component: vantdemo
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
