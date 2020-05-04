import axios from 'axios'
import store from '../store/index.js'
// import { localSet } from './token.js'

// 导入 jsonbig （要先下载）用于解决数字过大而导致的精度丢失的问题
import jsonbig from 'json-bigint'
import { localSet } from './token.js'

// 自定义实例默认值
var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  // baseURL: 'http://api-toutiao-web.itheima.net', // 备用接口

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // data 就是服务器返回给 axios 的 json 格式的字符串
    // return JSON.parse(data)
    try {
      return jsonbig.parse(data)
    } catch (error) {
      // 对 data 进行任意转换处理
      return data
    }
  }]
})

// 由于我们发生 token 过期是在 instance 中的请求中发生的，所以如果要更新这个token
// token不能再使用 instance 来发送请求了，应该再创建一个新的发送请求的对象
// 创建一个新的 axios 实例：用于更新 token
var instance1 = axios.create({
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
}, async function (error) {
  // 对响应错误做点什么
  console.dir(error) // 查看错误的详细信息
  // 1.得到响应的错误状态
  var statu = error.response.status
  // 2.判断状态是否是 401
  if (statu === 401) {
    // 3.得到 refresh_token
    var refreshToken = store.state.userInfo.refresh_token
    // 4.将 refresh_token 提交到服务器得到新的 token
    var res = await instance1({
      url: '/app/v1_0/authorizations',
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + refreshToken
      }
    })
    console.log(res)
    // 5.得到新的 token
    var newToken = res.data.data.token
    // 6.使用新的 token 覆盖掉过期的 token
    // 得到一个完整的对象
    var newObj = {
      token: newToken,
      refresh_token: refreshToken
    }
    // 7.将新对象进行保存
    // 1）保存到 store 中
    store.commit('setUserInfo', newObj)
    // 2）保存到 localstorage 中
    localSet('userInfo', newObj)
    // 8.继续未完成的请求
    return instance(error.config)
  }

  return Promise.reject(error)
})

export default instance
