// 管理当前项目中的所有的过滤器
// 导入Vue
import Vue from 'vue'

// 导入 dayjs
import dayjs from 'dayjs'
// 导入中文语言包
import 'dayjs/locale/zh-cn'
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 将插件使用到 dayjs 中
dayjs.extend(relativeTime)
// 全局使用简体中文
dayjs.locale('zh-cn')

// 时间过滤器
Vue.filter('timeFilter', function (value) {
  // 得到相对时间
  // 将value从固定时间转为一个相对时间
  return dayjs().from(dayjs(value)) // 2 年以前
})
