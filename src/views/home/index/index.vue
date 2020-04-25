<template>
  <div class="index">
    <!-- 头部标题 -->
    <van-nav-bar title="主页" :fixed="true" />
    <!-- 频道区域 -->
    <van-tabs v-model="active">
      <!-- 区域下的文章内容 -->
      <van-tab v-for="(item,index) in channelsList" :key="index" :title="item.name">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <button class="channelBtn">
      <van-icon name="wap-nav" />
    </button>
  </div>
</template>

<script>
import { getChannelsList } from '@/api/index.js'
export default {
  data () {
    return {
      // 默认选中的tab
      active: 0,
      // list 组件的加载状态
      loading: false,
      // list 组件中的数据源是否加载完毕
      finished: false,
      // 文章的数据源
      list: [],
      // 下拉刷新的状态
      isLoading: false,
      // 用户频道数据
      channelsList: []
    }
  },
  mounted () {
    this.getChannelsData()
  },
  methods: {
    // 执行时机：
    //   1.0 当 list 组件被加载时会执行一次
    //   2.0 当页面的滚动条触底时会再次执行 onload
    // 注意点
    //   1.0 onload 如果要执行必须保证 list 组件的 v-model 对应的值的为 false
    //   2.0 每次 onload 执行之后会自动将 v-model 对应的值设置为 true，
    //        所在每次 onload 执行完成之后需要手动将 v-model 对应的值改为 false
    //   3.0 如果 list 的 finished 属性为 true, 那么 onload 事件不会再执行
    // list 加载数据时执行  当 list 为 0 条数据时，会默认执行一次 onLoad 事件
    onLoad () {
      setTimeout(() => {
        // 定义一个初始数据
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        // 利用 拓展运算符 对新旧数据进行拼接
        this.list = [...this.list, ...arr]
        // 当 onLoad 执行后，loading会被默认改为true，而loading为true时，onLoad不会再执行，所以要将loading改为false
        this.loading = false
        // 当数据源达到一定量的时候结束
        if (this.list.length >= 60) {
          // 当 finished 为 true 时，onLoad 也不会再执行
          this.finished = true
        }
        console.log('onLoad')
        console.log(this.list.length)
      }, 1000)
    },
    // 执行时机：
    //   1.0 当下拉组件被下拉时执行
    // 注意点：
    //   当 v-model 对应的值为 true 时，无法继续执行这个事件，并且一直处于加载状态
    //   每当 onRefresh 执行之后，会自动将 v-model 对应的值设置为 true
    //      执行完这个事件之后需要手动将 v-model 对应的值改为 false
    onRefresh () {
      setTimeout(() => {
        console.log('onRefresh')
        this.list = []// 将 list 组件中数据的长度重置为 0
        this.loading = false// 将 list 的加载状态设置为 false
        this.finished = false// 将 list 的完结状态设置为 false
        this.isLoading = false// 将下拉刷新的等待效果设置为 false
        this.onLoad()// 重新请求数据
      }, 1000)
    },
    // 获取用户频道数据
    async getChannelsData () {
      try {
        var res = await getChannelsList()
        console.log(res)
        this.channelsList = res.data.data.channels
      } catch (error) {
        console.log('请求数据错误')
      }
    }
  }
}
</script>

<style lang="less">
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3195f9;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  .van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom {
    position: fixed;
    top: 46px;
    left: 0;
    width: 90%;
    z-index: 999;
  }
  .channelBtn {
    position: fixed;
    top: 46px;
    right: 0;
    width: 10%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    border: none;
    background-color: #3195f9;
  }
}
</style>
