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
    <van-cell-group v-if="thinkList.length > 0">
      <van-cell title="搜索联想" />
      <van-cell
        @click="onSearch(item.oldItem)"
        v-for="(item, index) in thinkList"
        :key="index"
        icon="search"
      >
        <template #title>
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon @click="delAll" name="delete" />
        </template>
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="(item, index) in historyList"
        :key="index"
        icon="search"
        :title="item"
      >
        <template #default>
          <van-icon @click.stop="delhis(index)" name="cross" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchData } from '@/api/search.js'
import { localSet, localGet, localDel } from '@/utils/token.js'
export default {
  data () {
    return {
      // 输入框的值
      value: '',
      // 联想列表
      thinkList: [],
      // 定义一个时间变量（用于）
      timer: null,
      // 搜索历史   如果本地有数据，则取本地的值，如果本地没有值则为默认的 [] 数组
      historyList: localGet('history') || []
    }
  },
  methods: {
    // 回车搜索
    onSearch (value) {
      console.log('onSearch')
      // 跳转搜索界面  并将搜索值带过去
      this.$router.push('/searchresult?key=' + value)
      // 将搜索值存入搜索历史数组中  unshift让数据从第一个开始添加    push从最后添加
      this.historyList.unshift(value)
      // 一句代码数组去重
      this.historyList = [...new Set(this.historyList)]
      // 由于跳转，再回退到搜索界面，搜索历史数组又会重新清空，所以需要存入本地
      localSet('history', this.historyList)
    },
    // 取消
    onCancel () {
      console.log('onCancel')
      // 将联想列表清空
      this.thinkList = []
    },
    // 获取联想搜索
    think (value) {
      // 判断当前输入框中是否有内容存在
      if (this.value.trim().length === 0) { // 无内容则进入以下代码
        this.thinkList = [] // 将联想列表清空
        return // 打断返回，不再执行后面的代码
      }
      // 定时器用于解决 js 的抖动问题
      // 清除定时器
      clearTimeout(this.timer)
      // 重新设置定时器
      this.timer = setTimeout(async () => {
        try {
          // 只要输入框的内容发生改变就需要进行联想
          var res = await searchData(this.value)
          // 保存联想数据
          this.thinkList = res.data.data.options
          // 高亮显示：遍历联想数据，将其中的关键字进行替换
          this.thinkList = this.thinkList.map(item => {
            return {
              // 用于进行跳转的
              oldItem: item,
              // 用于显示联想列表的关键字高亮
              newItem: item.replace(this.value, `<span style="color:red">${this.value}</span>`)
            }
          })
          console.log(this.thinkList)
        } catch (error) {
          console.log('请求出错')
        }
      }, 500)
    },
    // 删除单个历史数据
    delhis (index) {
      this.historyList.splice(index, 1)
      localSet('history', this.historyList)
    },
    // 删除所有历史数据
    delAll () {
      // 使用vant中的弹出框组件询问是否删除
      this.$dialog.confirm({
        title: '友情提示',
        message: '您确定要删除历史记录吗？'
      })
        .then(() => { // 确定
          this.historyList = []
          localDel('history')
          this.$toast.success('已成功删除')
        })
        .catch(() => { // 取消
          this.$toast.success('已取消操作')
        })
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
