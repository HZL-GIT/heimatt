import Vue from 'vue'
import Vuex from 'vuex'
import { localGet } from '../utils/token.js'
Vue.use(Vuex)
// 复习：
//  vuex 它是用来保存整个项目的公用数据
//  用来保存数据的是： state
//    它是一个对象
//  一般情况下 state 不能够直接操作，应该使用 mutations 来进行处理
// 用来修改 state 中数据的对象： mutations
export default new Vuex.Store({
  state: {
    // 定义一个变量用来保存用户登录后的信息
    // 判断 localstorage 中是否存在数据，如果有直接取出，如果没有放一个空对象
    userInfo: localGet('userInfo') || {}
  },
  mutations: {
    // 给 state 中的属性赋值
    // 参数： state：代表的是上面的 state 对象,  payload:代表调用这个方法时传入的参数
    setUserInfo: function (state, payload) {
      state.userInfo = payload
    }
  }
})
