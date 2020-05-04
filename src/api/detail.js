import instance from '@/utils/request.js'

function getDetail (artid) {
  return instance({
    url: '/app/v1_0/articles/' + artid,
    method: 'get'
  })
}

export { getDetail }
