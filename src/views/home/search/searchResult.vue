<template>
  <div class="serachResult">
    <!-- 头部标题 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" title="搜索结果" :fixed="true" />
    <!-- 内容列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item, index) in resultList" :key="index">
        <van-cell class="martop" @click="toDetail(item)">
          <template #title>
            <!-- 文章标题 -->
            <h3>{{item.title}}</h3>
            <!-- 文章图片 -->
            <van-grid v-if="item.cover.type !== 0" :border="false" :column-num="3">
              <van-grid-item v-for="(imgItem, imgIndex) in item.cover.images" :key="imgIndex">
                <van-image lazy-load :src="imgItem" />
              </van-grid-item>
            </van-grid>
            <div class="box">
              <span>{{item.art_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate}}</span>
            </div>
          </template>
        </van-cell>
        <van-grid class="gridCol" :column-num="3">
          <van-grid-item @click="comment" icon="comment-o" text="评论" />
          <van-grid-item @click="zan" icon="like-o" text="点赞" />
          <van-grid-item icon="smile-o" text="分享" />
        </van-grid>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search.js'
export default {
  data () {
    return {
      // list 组件加载状态
      loading: false,
      // list 组件数据是否加载完毕
      finished: false,
      page: 0, // 页码
      perpage: 10, // 页容量
      key: '', // 搜索的关键字
      resultList: [] // 搜索结果列表
    }
  },
  methods: {
    // 点击回退按钮
    onClickLeft () {
      // router提供的 back 方法，回退到上一个页面
      this.$router.back()
    },
    // list 加载
    async onLoad () {
      console.log('onLoad')
      console.log(this.key)
      try {
        // 由于接口是有分页的，所以为了避免接口反复请求得到的都是固定的页码内容，要加加
        this.page++
        var res = await getResult({
          page: this.page,
          perpage: this.perpage,
          value: this.key
        })
        console.log(res)
        // 新老数据应该 拼接 ，而不是新数据覆盖旧数据
        this.resultList = [...this.resultList, ...res.data.data.results]
        // 进入onLoad之后，loading会自动改为true，要想实现上拉刷新则需要将其改为false
        this.loading = false
        // 根据接口返回的数据长度，判断其是否已经到达最后的数据，如果是则将其结束状态改为true
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        console.log('请求错误')
      }
    },
    // 评论判断 用户是否登录:直接判断
    comment () {
      var token = this.$store.state.userInfo.token
      if (!token) {
        this.$toast.fail('用户未登录')
        this.$router.push('/checklogin')
        return
      }
      console.log('已评论')
    },
    // 点赞判断用户登录：使用自己封装好的插件判断
    zan () {
      if (!this.$login()) {
        return
      }
      console.log('点赞')
    },
    // 跳转文章详情页
    toDetail (item) {
      this.$router.push('/detail?artid=' + item.art_id)
    }
  },
  mounted () {
    // 进入页面就获取到从页面url传过来的 key 值
    this.key = this.$route.query.key
  }
}
</script>

<style lang="less">
.serachResult {
  .van-nav-bar.van-hairline--bottom {
    background-color: #3195f9;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .martop {
    margin-top: 46px;
  }
  .box {
    span {
      padding: 5px;
      color: #999;
    }
  }
  .van-grid-item__content.van-grid-item__content--center.van-hairline {
    display: flex;
    flex-direction: row;
  }
  .van-grid-item__icon + .van-grid-item__text {
    margin-top: 0px;
    padding: 0 5px;
    font-size: 16px;
  }
  .van-grid-item__icon {
    font-size: 20px;
  }
}
</style>
