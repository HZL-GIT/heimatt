<template>
  <!-- 评论区域 -->
  <div class="comment">
    <div class="author">
      <div class="img">
        <img :src="item.aut_photo" alt />
      </div>
      <div class="msg">
        <div class="name">{{item.aut_name}}</div>
        <div class="comm_text">{{item.content}}</div>
        <div>
          <span>{{item.pubdate | timeFilter}}</span>
          <span>
            <van-button
              @click="replayOpen"
              color="#ccc"
              size="mini"
              round
              type="info"
              v-if="isReplay===false"
            >回复 {{item.reply_count}}</van-button>
          </span>
        </div>
      </div>
      <div class="btn">
        <van-icon name="like" color="red" />
        {{item.like_count}}
      </div>
    </div>
  </div>
</template>

<script>
// 导入 bus
import bus from '@/utils/bus.js'
export default {
  // 接口传入的评论数据
  props: ['item', 'isReplay'],
  methods: {
    // 打开回复面板
    replayOpen () {
      // 打开回复面板
      this.$emit('openReplay', true)
      // 将数据传入 bus 中
      bus.$emit('passitem', this.item)
    }
  }
  // mounted () {
  //   console.log(this.item)
  // }
}
</script>

<style lang="less">
.comment {
  .comm_text {
    padding: 10px;
  }
  .name {
    color: #0094ff;
  }
  .msg {
    span:nth-child(2) {
      margin: 0 10px;
    }
  }
}
</style>
