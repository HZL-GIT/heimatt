import axios from 'axios'
import store from '../store/index.js'
// 自定义实例默认值
var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在 token，如果存在，就直接携带在请求头中，如果没有就不理会
  // 1.0 得到 token
  var token = store.state.userInfo.token
  if (token) { // 2.0 判断是否存在
    // 携带在请求头中
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
