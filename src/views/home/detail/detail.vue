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
        <van-button @click="followed" type="info" v-if="detailObj.is_followed === false">+ 关注</van-button>
        <van-button @click="unfollowed" type="info" v-else>取消关注</van-button>
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
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item, index) in commentList" :key="index">
        <comment :isReplay="false" @openReplay="openReplay" :item="item" class="comment" ref="comment"></comment>
      </div>
    </van-list>
    <!-- 发表评论 -->
    <write @passcomment="passcomment"></write>
    <!-- 回复组件 -->
    <replay ref="replay"></replay>
  </div>
</template>

<script>
import comment from './comment.vue'
import write from './write.vue'
import replay from './replay.vue'
import { getDetail, followedAut, unFollowedAut, getCommentList } from '@/api/detail.js'
export default {
  components: {
    comment,
    write,
    replay
  },
  data () {
    return {
      // 文章id
      artid: '',
      // 文章详情对象
      detailObj: {},
      // list 的加载状态
      loading: false,
      // list 的完结状态
      finished: false,
      // 下一页的标识
      offset: null,
      // 页容量
      limit: 10,
      // 评论数据
      commentList: [],
      // 结束的标识
      endid: ''
    }
  },
  methods: {
    // 顶部箭头，点击回退上一个页面
    onClickLeft () {
      this.$router.back()
    },
    // 点击关注
    async followed () {
      // 获取用户的 id
      var id = this.detailObj.aut_id
      console.log(id)
      // 请求接口
      var res = await followedAut(id)
      console.log(res)
      // 因为接口没返回什么有用的信息，所以我们要手动将关注的状态进行修改
      this.detailObj.is_followed = true
    },
    // 取消关注   与点击关注类似的操作
    async unfollowed () {
      var id = this.detailObj.aut_id
      await unFollowedAut(id)
      this.detailObj.is_followed = false
    },
    // list 的组件功能
    async onLoad () {
      // 加载评论数据
      var res = await getCommentList({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      console.log(res)
      // 报存评论数据
      this.commentList = [...this.commentList, ...res.data.data.results]
      // 报存下一页的标识
      this.offset = res.data.data.last_id
      // 报存最后一页的标识
      this.endid = res.data.data.end_id
      // 将 list 的加载状态设置为 false
      this.loading = false
      // 判断是否数据源加载完毕
      if (this.endid === this.offset) {
        this.finished = true
      }
    },
    // 将从子组件传过来的，发表的新评论加入评论列表进行实时渲染
    passcomment (obj) {
      this.commentList.unshift(obj)
    },
    // 控制回复组件的显示与否
    openReplay (value) {
      // 打开回复面板
      this.$refs.replay.show = value
    }
  },
  // 进入页面就请求文章的详情
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
