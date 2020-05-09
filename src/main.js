import Vue from 'vue'
import App from './App.vue'
import router from './router'// 导入了路由
import store from './store'// 导入了vuex
import Vant, { Toast } from 'vant'// 导入了vant
import 'vant/lib/index.css'// 导入了vant 需要的样式
import '@/assets/style/index.css'// 导入iconfont
import './filter/myfilter.js'// 导入全局过滤器
import myplugin from './utils/myplugin.js' // 导入自己封装的登录判断插件

import 'amfe-flexible/index.js' // 解决 Vue 移动端适配插件的导入

Vue.use(Vant)// 注册vant
Vue.use(Toast)// 注册Toast
Vue.use(myplugin)// 使用自己封装好的登录判断插件

// 封装一个全局的登录验证
// Vue.prototype.$login = function () {
//   var token = store.state.userInfo.token
//   if (!token) {
//     Toast('用户还未登录')
//     router.push('/login')
//     return false
//   }
//   return true
// }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
