import Vue from 'vue'
import App from './App.vue'
import router from './router'// 导入了路由
import store from './store'// 导入了vuex
import Vant from 'vant'// 导入了vant
import 'vant/lib/index.css'// 导入了vant 需要的样式
import '@/assets/style/index.css'// 导入iconfont
import './filter/myfilter.js'// 导入全局过滤器

Vue.use(Vant)// 注册vant

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
