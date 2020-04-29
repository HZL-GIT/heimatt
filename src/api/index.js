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

// 不感兴趣
function delArtData (artid) {
  return instance({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: artid
    }
  })
}
// 反馈垃圾内容
function reportsArtData ({ artid, type }) {
  return instance({
    url: '/app/v1_0/article/reports',
    method: 'post',
    data: {
      target: artid,
      type: type
    }
  })
}
// 拉黑作者
function blackList (autid) {
  return instance({
    url: '/app/v1_0/user/blacklists',
    method: 'post',
    data: {
      target: autid
    }
  })
}
export { getChannelsList, getArticleList, getAllChannel, resetChannel, delArtData, reportsArtData, blackList }
