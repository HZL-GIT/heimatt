import instance from '@/utils/request.js'
// 获取联想建议
function searchData (value) {
  return instance({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q: value
    }
  })
}
// 获取搜索结果
function getResult ({ page, perpage, value }) {
  return instance({
    url: '/app/v1_0/search',
    method: 'get',
    params: {
      page: page,
      per_page: perpage,
      q: value
    }
  })
}
export { searchData, getResult }
