import instance from '@/utils/request.js'

// 得到用户自己的信息
function getSelf () {
  return instance({
    url: '/app/v1_0/user'
  })
}

// 得到用户个人资料
function getProfile () {
  return instance({
    url: '/app/v1_0/user/profile'
  })
}

// 编辑个人资料
function editUserData ({ name, gender, intro, birthday }) {
  return instance({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      intro: intro,
      birthday: birthday
    }
  })
}

// 上传用户头像
function uploadPhoto (photo) {
  // 由于传入的是带文件的接口，所以必须要使用 FormData
  var fd = new FormData()
  // 它是一个对象 给它添加一个参数
  fd.append('photo', photo)
  return instance({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}

export { getSelf, getProfile, editUserData, uploadPhoto }
