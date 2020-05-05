<template>
  <div class="replay">
    <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
      <h4 class="mleft">当前评论</h4>
      <comment :item="currentItem"></comment>
      <h4 class="mleft">评论回复</h4>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <comment :isReplay="true" v-for="(item, index) in replayList" :key="index" :item="item"></comment>
      </van-list>
      // 评论书写组件
      <write></write>
    </van-popup>
  </div>
</template>

<script>
// 导入评论组件
import comment from './comment.vue'
// 导入评论书写组件
import write from './write'
// 导入 bus
import bus from '@/utils/bus.js'
import { getReplayList } from '@/api/detail.js'
export default {
  components: {
    comment,
    write
  },
  data () {
    return {
      // 回复面板显示与否
      show: false,
      loading: false,
      finished: false,
      // 定义一个当前评论
      currentItem: {},
      // 下一页标识
      offset: null,
      // 页容量
      limit: 10,
      // 留言列表
      replayList: [],
      // 最后一条数据标识
      endid: null
    }
  },
  methods: {
    async onLoad () {
      // 接口获取回复数据
      var res = await getReplayList({
        commid: this.currentItem.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      console.log(res)
      // 将回复数据保存起来
      this.replayList = [...this.replayList, ...res.data.data.results]
      // 得到下一页的标识
      this.offset = res.data.data.last_id
      // 得到最后一条数据的标识
      this.endid = res.data.data.end_id
      // list 加载状态改为 false
      this.loading = false
      // 判断下一页标识与最后一条数据标识是否相等，相等则 list 显示结束状态
      if (this.offset === this.endid) {
        this.finished = true
      }
    }
  },
  mounted () {
    // 接收 bus 中的参数
    bus.$on('passitem', item => {
      this.currentItem = item
    })
  }
}
</script>

<style lang="less">
.replay {
  .mleft {
    padding-left: 10px;
  }
  .van-popup.van-popup--bottom {
    margin: 0 0 55px;
  }
}
</style>
