<template>
  <div class="detail">
    <!-- 头部-->
    <van-nav-bar left-arrow @click-left="onClickLeft" title="文章详情" :fixed="true" />
    <!-- 标题 -->
    <h2 class="title">{{detailObj.title}}</h2>
    <!-- 作者信息 -->
    <div class="author">
      <div class="img">
        <img :src="detailObj.aut_photo" alt />
      </div>
      <div class="msg">
        <div>{{detailObj.aut_name}}</div>
        <div>{{detailObj.pubdate | timeFilter}}</div>
      </div>
      <div class="btn">
        <van-button type="info" v-if="detailObj.is_followed === false">+ 关注</van-button>
        <van-button type="info" v-else>取消关注</van-button>
      </div>
    </div>
    <!-- 文章内容 -->
      <van-cell>
        <template #title>
          <div v-html="detailObj.content">我是文章内容</div>
        </template>
      </van-cell>
    <!-- 喜欢不喜欢区域 -->
    <div class="btnbox">
      <div>
        <van-button v-if="detailObj.attitude === 1" icon="like" plain round type="danger">不点赞</van-button>
        <van-button v-else icon="like" round type="default">点赞</van-button>
      </div>
      <div>
        <van-button v-if="detailObj.attitude === 0" icon="like" plain round type="danger">不喜欢</van-button>
        <van-button v-else icon="like" round type="default">喜欢</van-button>
      </div>
    </div>
    <!-- 评论区域 -->
    <div v-for="(item, index) in 4" :key="index">
      <comment class="comment" ref="comment"></comment>
    </div>
    <!-- 发表评论 -->
    <write ref="write"></write>
  </div>
</template>

<script>
import comment from './comment.vue'
import write from './write.vue'
import { getDetail } from '@/api/detail.js'
export default {
  components: {
    comment,
    write
  },
  data () {
    return {
      artid: '',
      detailObj: {}
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  },
  async mounted () {
    this.artid = this.$route.query.artid
    console.log(this.artid)
    var res = await getDetail(this.artid)
    console.log(res)
    this.detailObj = res.data.data
  }
}
</script>

<style lang="less">
.detail {
  margin-top: 46px;
  margin-bottom: 54px;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3195f9;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .title {
    padding: 10px 20px;
    text-align: center;
  }
  .author {
    display: flex;
    padding: 10px;
    .img {
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 15px;
      }
    }
    .msg {
      flex: 1;
    }
  }
  .content {
    width: 100%;
    padding: 0 20px;
  }
  .btnbox {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .comment {
    margin-top: 20px;
  }
}
</style>
