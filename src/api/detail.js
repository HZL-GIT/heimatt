import instance from '@/utils/request.js'

// 获取文章详情
function getDetail (artid) {
  return instance({
    url: '/app/v1_0/articles/' + artid,
    method: 'get'
  })
}

// 关注用户
function followedAut (autid) {
  return instance({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target: autid
    }
  })
}

// 取消关注
function unFollowedAut (autid) {
  return instance({
    url: '/app/v1_0/user/followings/' + autid,
    method: 'DELETE'
  })
}

// 评论列表
function getCommentList ({ artid, offset, limit }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'get',
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: limit
    }
  })
}

// 发表评论
function sendComment ({ artid, content }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: artid,
      content: content
    }
  })
}

// 获取评论留言
function getReplayList ({ commid, offset, limit }) {
  return instance({
    url: '/app/v1_0/comments',
    method: 'get',
    params: {
      type: 'c',
      source: commid,
      offset: offset,
      limit: limit
    }
  })
}

export { getDetail, followedAut, unFollowedAut, getCommentList, sendComment, getReplayList }
