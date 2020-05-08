<template>
  <div class="index">
    <!-- 头部标题 -->
    <van-nav-bar title="主页" :fixed="true" />
    <!-- 频道区域 -->
    <van-tabs v-model="active">
      <!-- 区域下的文章内容 -->
      <van-tab v-for="(item,index) in channelsList" :key="index" :title="item.name">
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            border
          >
            <van-cell @click.prevent="$router.push('/detail?artid='+subItem.art_id)" v-for="(subItem,subIndex) in item.articleList" :key="subIndex">
              <template #title>
                <!-- 文章标题 -->
                <h3>{{subItem.title}}</h3>
                <!-- 文章图片 -->
                <van-grid v-if="subItem.cover.type !== 0" :border="false" :column-num="3">
                  <van-grid-item
                    v-for="(imgItem, imgIndex) in subItem.cover.images"
                    :key="imgIndex"
                  >
                    <van-image lazy-load :src="imgItem" />
                  </van-grid-item>
                </van-grid>
                <div class="box">
                  <div class="left">
                    <span>{{subItem.aut_name}}</span>
                    <span>{{subItem.comm_count}}评论</span>
                    <span>{{subItem.pubdate | timeFilter}}</span>
                  </div>
                  <div class="right">
                    <van-icon @click.stop="openMore(subItem)" name="cross" />
                  </div>
                </div>
              </template>
            </van-cell>
            <!-- <van-cell style="height:100px" :key="index" :title="cellItem.title" /> -->
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="channelBtn">
      <van-icon name="wap-nav" @click="popShow" />
    </div>
    <!-- 导入频道操作面板  popUp 组件 -->
    <!-- <channel ref="channel" :active="active" @changeActive="v=>active=v" :channelsListSon="channelsList" ></channel>-->
    <!-- 改写为下一句代码，同样channel中的 $emit 也要改 -->
    <!-- <channel
      ref="channel"
      :active="active"
      @update:active="v=>active=v"
      :channelsListSon="channelsList"
    ></channel>-->
    <!-- 改写后又可以简写为下一句,利用 .sync 简写 -->
    <channel ref="channel" :active.sync="active" :channelsListSon="channelsList"></channel>

    <!-- 更多操作 -->
    <more ref="more" :autId="autId" :artId="artId" @delArt="del"></more>
  </div>
</template>

<script>
// 导入获得频道的方法，操作文章的方法
import { getChannelsList, getArticleList } from '@/api/index.js'
// 导入操作localStorage的方法
import { localGet } from '@/utils/token.js'
// 导入频道操作面板
import channel from './channel.vue'
// 导入更多操作面板
import more from './more.vue'
// 向 vue 注册图片懒加载指令
import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)

export default {
  components: {
    channel,
    more
  },
  data () {
    return {
      // 默认选中的tab
      active: 0,
      // // list 组件的加载状态
      // loading: false,
      // // list 组件中的数据源是否加载完毕
      // finished: false,
      // // 文章的数据源
      // list: [],
      // // 下拉刷新的状态
      // isLoading: false,
      // 用户频道数据
      channelsList: [],
      // 文章 id
      artId: 0,
      // 作者 id
      autId: 0
    }
  },
  mounted () {
    this.getChannelsData()
  },
  methods: {
    // 点击打开更多操作
    openMore (subItem) {
      // 打开更多面板
      this.$refs.more.show = true
      // 获取当前该文章 id
      this.artId = subItem.art_id
      // 获取当前文章作者 id
      this.autId = subItem.aut_id
    },
    // 更多操作，不感兴趣的文章处理
    del (artid) {
      // 获取当前频道下所有的文章列表
      var artList = this.channelsList[this.active].articleList
      artList.map((item, index) => {
        // 如果文章id与子组件进行了不喜欢的操作的文章id一致
        if (item.art_id === artid) {
          // 将当前所有文章列表下的该文章删除
          artList.splice(index, 1)
        }
      })
    },
    // 点击 打开 频道操作 pupup
    popShow () {
      this.$refs.channel.show = true
    },
    /* 执行时机：
      1.0 当 list 组件被加载时会执行一次
      2.0 当页面的滚动条触底时会再次执行 onload
    注意点
      1.0 onload 如果要执行必须保证 list 组件的 v-model 对应的值的为 false
      2.0 每次 onload 执行之后会自动将 v-model 对应的值设置为 true，
           所在每次 onload 执行完成之后需要手动将 v-model 对应的值改为 false
      3.0 如果 list 的 finished 属性为 true, 那么 onload 事件不会再执行
    list 加载数据时执行  当 list 为 0 条数据时，会默认执行一次 onLoad 事件 */
    async onLoad () {
      try {
        // 获取当前的频道
        var currentChannel = this.channelsList[this.active]
        // 获取当前频道的 id
        var id = currentChannel.id
        var res = await getArticleList(id) // 根据 id 请求接口数据
        console.log(res)
        // 将获取到的数据放入当前频道的 articleList 中
        currentChannel.articleList = [...currentChannel.articleList, ...res.data.data.results]
        // 判断 ：返回的数据的 results 长度是否为 0 ，即该频道下是否有数据，如果为 0 就停止加载
        currentChannel.loading = false
        if (res.data.data.results.length === 0) {
          // 将 list 的状态设置为完结状态
          currentChannel.finished = true
        }
      } catch (error) {
        console.log('请求出错')
      }
      /* setTimeout(() => {
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
      }, 1000) */
    },
    /*  执行时机：
       1.0 当下拉组件被下拉时执行
     注意点：
       当 v-model 对应的值为 true 时，无法继续执行这个事件，并且一直处于加载状态
       每当 onRefresh 执行之后，会自动将 v-model 对应的值设置为 true
          执行完这个事件之后需要手动将 v-model 对应的值改为 false
     */
    onRefresh () {
      /* setTimeout(() => {
        console.log('onRefresh')
        this.list = []// 将 list 组件中数据的长度重置为 0
        this.loading = false// 将 list 的加载状态设置为 false
        this.finished = false// 将 list 的完结状态设置为 false
        this.isLoading = false// 将下拉刷新的等待效果设置为 false
        this.onLoad()// 重新请求数据
      }, 1000) */
      setTimeout(() => {
        // 获取到当前的频道
        var currentChannel = this.channelsList[this.active]
        currentChannel.articleList = []
        currentChannel.loading = false
        currentChannel.finished = false
        currentChannel.isLoading = false
        this.onLoad()
      }, 1000)
    },
    // 获取用户频道数据
    async getChannelsData () {
      // 判断用户是否登录
      var token = this.$store.state.userInfo.token
      if (token) { // 用户有登录
        // 从服务器获取用户的频道数据
        var res = await getChannelsList()
        this.channelsList = res.data.data.channels
      } else { // 用户没有登录
        // 注意：用户 没有登录 也应该可以对频道数据进行操作，而操作后要将频道数据保存在本地的 localStorage 中
        // 查看 localStorage 中是否有保存频道数据的 channel 值
        var localChannel = localGet('channel')
        if (localChannel) { // 有保存，则根据 localStorage 中保存的频道数据来渲染
          this.channelsList = localChannel
        } else { // 没有保存，则按接口默认的频道数据来渲染
          var notLocalRes = await getChannelsList()
          this.channelsList = notLocalRes.data.data.channels
        }
      }
      // 给不同的频道下设置不同的数据源
      this.addOtherProp()
      console.log(this.channelsList)
      /* try {
        var res = await getChannelsList()
        console.log(res)
        this.channelsList = res.data.data.channels
      } catch (error) {
        console.log('请求数据错误')
      } */
    },
    // 给频道数据源添加额外的属性
    /* 因为每个频道所需要的数据都应该是不一样的，而频道接口返回的数据只有 id 和 name 所以需要进行动态添加一些内容给到频道列表
    而此时出现进入页面数据未直接渲染，需要切换频道再回来才渲染的 bug
    出现原因 ：动态添加的数据不具备数据的响应式特点
    解决办法：使用 this.$set(obj,key,value) 解决问题 */
    addOtherProp () {
      this.channelsList.forEach(item => {
        /* item.articleList = [] // 不用频道下的文章数据
        item.loading = false // 不同频道下的 List 的加载状态
        item.finished = false // 不同频道下的 list 的完结状态
        item.isLoading = false // 不同频道下的 pullrefresh 的加载状态 */
        this.$set(item, 'articleList', [])
        this.$set(item, 'loadiing', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'isLoading', false)
      })
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
  .van-tabs__wrap.van-hairline--top-bottom {
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
    background-color: #3195f9;
  }
  .box {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    .left {
      span {
        color: #999;
        padding: 10px;
      }
    }
    .right {
      border: 1px solid #999;
      height: 14px;
      line-height: 14px;
      padding: 0 5px;
      color: #999;
    }
  }
}
</style>
