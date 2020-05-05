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
import { sendComment } from '@/api/detail.js'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch () {
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
