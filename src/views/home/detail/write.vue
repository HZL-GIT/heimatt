<template>
  <div class="write">
    <van-search
      left-icon="edit"
      background="#0094ff"
      v-model="value"
      show-action
      placeholder="请输入评论"
      @search="onSearch"
    >
      <template #action>
        <div class="btn" @click="onSearch">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import { sendComment, addCommentReplay } from '@/api/detail.js'
export default {
  props: ['isReplay', 'commtid'],
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch () {
      if (this.isReplay === true) {
        // 这里执行回复评论
        console.log('回复')
        var replayres = await addCommentReplay({
          commtid: this.commtid,
          content: this.value,
          artid: this.$route.query.artid
        })
        console.log(replayres)
        // 将得到的新的评论回复对象保存起来
        var newobj = replayres.data.data.new_obj
        // 将新的评论回复 传递给 父组件 replay
        this.$emit('passReplay', newobj)
        // 清空输入框
        this.value = ''
      } else {
        // 这里执行评论
        console.log('评论')
        // console.log(this.value)
        var res = await sendComment({
          artid: this.$route.query.artid,
          content: this.value
        })
        // console.log(res)
        var newObj = res.data.data.new_obj
        // console.log(newObj)
        // 将该子组件获取到的新的评论数据，传到父组件进行渲染
        this.$emit('passcomment', newObj)
        // 清空输入框
        this.value = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.write {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .btn {
    color: #fff;
  }
  .van-search__action:active {
    background-color: #ccc;
  }
}
</style>
