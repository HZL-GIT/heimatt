<template>
  <div class="serachResult">
    <!-- 头部标题 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" title="搜索结果" :fixed="true" />
    <!-- 内容列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item, index) in resultList" :key="index">
        <van-cell class="martop">
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
          <van-grid-item icon="comment-o" text="110" />
          <van-grid-item icon="like-o" text="点赞" />
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
      page: 1, // 页码
      perpage: 10, // 页容量
      key: '', // 搜索的关键字
      resultList: [] // 搜索结果列表
    }
  },
  methods: {
    onClickLeft () {
      // router提供的 back 方法，回退到上一个页面
      this.$router.back()
    },
    // list 加载
    async onLoad () {
      console.log('onLoad')
      console.log(this.key)
      try {
        var res = await getResult({
          page: this.page,
          perpage: this.perpage,
          value: this.key
        })
        this.resultList = res.data.data.results
      } catch (error) {
        console.log('请求错误')
      }
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
