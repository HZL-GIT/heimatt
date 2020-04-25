import instance from '@/utils/request.js'

// 获取用户频道列表
function getChannelsList () {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

export { getChannelsList }
