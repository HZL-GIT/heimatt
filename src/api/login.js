import instance from '@/utils/request.js'
// 获取企业信息
function checkLogin (data) {
  return instance({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
export { checkLogin }
