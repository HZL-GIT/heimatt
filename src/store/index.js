import Vue from 'vue'
import Vuex from 'vuex'
import { localGet } from '../utils/token.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localGet('userInfo') || {}
  },
  mutations: {
    setUserInfo: function (state, value) {
      state.userInfo = value
    }
  }
})
