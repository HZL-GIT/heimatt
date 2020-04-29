import instance from '@/utils/request.js'
// 获取企业信息
function searchData (value) {
  return instance({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q: value
    }
  })
}
export { searchData }
