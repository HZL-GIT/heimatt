<template>
  <div class="write">
    <van-search
      background="#0094ff"
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div class="btn">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {
      console.log('onSearch')
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
