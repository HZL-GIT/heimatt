<template>
  <div class="personInfo">
    <!-- 头部标题 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      right-text="保存"
      @click-right="onClickRight"
      title="我的页面"
      :fixed="true"
    />

    <van-cell-group class="top">
      <van-cell title="头像" is-link>
        <template #default>
          <img @click="changeImg" :src="infoObj.photo" alt />
        </template>
      </van-cell>
      <van-cell @click="nameShow" title="昵称" is-link>
        <template #default>{{infoObj.name}}</template>
      </van-cell>
      <van-cell title="介绍" is-link>
        <template #default>{{infoObj.intro}}</template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="bottom">
      <van-cell title="性别" is-link>
        <template #default>{{infoObj.gender===0?'男':'女'}}</template>
      </van-cell>
      <van-cell title="生日" is-link>
        <template #default>{{infoObj.birthday}}</template>
      </van-cell>
    </van-cell-group>
    <!-- 修改头像 -->
    <upload ref="upload" @getPhoto="getPhoto"></upload>
    <!-- 修改昵称的面板 -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
      <van-field required v-model="infoObj.name" />
    </van-popup>
  </div>
</template>

<script>
import { getSelf, getProfile, editUserData } from '@/api/my.js'
import upload from './upload.vue'
export default {
  components: {
    upload
  },
  data () {
    return {
      // 用户信息对象
      infoObj: {},
      nameshow: false
    }
  },
  methods: {
    // 点击保存按钮
    async onClickRight () {
      await editUserData({
        name: this.infoObj.name,
        gender: this.infoObj.gender,
        intro: this.infoObj.intro,
        birthday: this.infoObj.birthday
      })
      // console.log(res)
      this.$toast.success('保存成功')
    },
    // 打开修改头像的面板
    changeImg () {
      this.$refs.upload.show = true
    },
    // 打开修改名字的面板
    nameShow () {
      this.nameshow = true
    },
    // 将upload组件传过来的头像路径渲染出来
    getPhoto (img) {
      this.infoObj.photo = img
    }
  },
  async created () {
    // 请求用户接口得到：头像，昵称，介绍
    var res = await getSelf()
    console.log(res)
    // 由于数据是动态渲染的，这样的写法无法渲染到页面上，这样的写法需要在 data 的 infoObj 中定义一个 photo
    // this.infoObj.photo = res.data.data.photo
    // $set 用于动态添加的数据
    this.$set(this.infoObj, 'photo', res.data.data.photo)
    this.$set(this.infoObj, 'name', res.data.data.name)
    this.$set(this.infoObj, 'intro', res.data.data.intro)

    // 请求用户接口得到：性别，生日
    var res1 = await getProfile()
    console.log(res1)
    this.$set(this.infoObj, 'gender', res1.data.data.gender)
    this.$set(this.infoObj, 'birthday', res1.data.data.birthday)
  }
}
</script>

<style lang="less">
.personInfo {
  margin-top: 46px;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3195f9;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  span.van-nav-bar__text {
    color: #fff;
  }
  span {
    font-size: 18px;
  }
  .top {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .bottom {
    margin-top: 10px;
  }
}
</style>
