import instance from '@/utils/request.js'

// 获取用户频道列表
function getChannelsList () {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

function getArticleList (channelId) {
  return instance({
    url: 'app/v1_1/articles',
    method: 'get',
    params: {
      channel_id: channelId,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}
export { getChannelsList, getArticleList }
