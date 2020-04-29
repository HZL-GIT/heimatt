<template>
  <div class="search">
    <van-search
      background="#3195f9"
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @input="think"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- 搜索联想 -->
    <van-cell-group v-if="searchList.length > 0">
      <van-cell title="搜索联想" />
      <van-cell
        @click="onSearch(item)"
        v-for="(item, index) in searchList"
        :key="index"
        icon="search"
        :title="item"
      />
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史" />
      <van-cell v-for="(item, index) in 3" :key="index" icon="search" title="黑马程序员">
        <template #default>
          <van-icon name="cross" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchData } from '@/api/search.js'
export default {
  data () {
    return {
      value: '',
      searchList: []
    }
  },
  methods: {
    // 回车搜索
    onSearch (value) {
      console.log('onSearch')
      this.$router.push('/searchresult?key=' + value)
    },
    // 取消
    onCancel () {
      console.log('onCancel')
    },
    // 获取联想搜索
    async think (value) {
      try {
        var res = await searchData(this.value)
        this.searchList = res.data.data.options
      } catch (error) {
        console.log('请求出错')
      }
    }
  }
}
</script>

<style lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
  .van-search__action:active {
    background-color: #ccc;
  }
}
</style>
