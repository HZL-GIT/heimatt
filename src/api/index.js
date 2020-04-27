import instance from '@/utils/request.js'

// 获取用户频道列表
function getChannelsList () {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

// 获取对应 id 的频道的文章数据
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

// 获取所有频道
function getAllChannel () {
  return instance({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}

// 修改用户频道列表
function resetChannel (channels) {
  return instance({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
export { getChannelsList, getArticleList, getAllChannel, resetChannel }
