// 封装一个插件：为 vue 提供一个额外的方法来进行登录验证

// 导入 Vue
import Vue from 'vue'
// 导入 store
import store from '../store/index.js'
// 导入 router
import router from '../router/index.js'
// 导入 toast
import { Toast } from 'vant'

// 使用 toast
Vue.use(Toast)

// 创建一个插件对象
var pluginObj = {}

// 设置一个 install 方法
pluginObj.install = function (VueObj) {
  // 为 vue 添加一个 $login 方法
  VueObj.prototype.$login = function () {
    // 完成登录验证的逻辑
    // 获取到 token
    var token = store.state.userInfo.token
    // 判断
    if (!token) {
      // 提示用户需要登录
      Toast('你咋没登录')
      // 跳转登录页面
      router.push('/checklogin')
      return false
    } else {
      return true
    }
  }
}

export default pluginObj
