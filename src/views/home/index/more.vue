<template>
  <div class="more">
    <van-popup v-model="show" class="popShow">
      <van-cell-group v-if="isReport===false">
        <van-cell @click="disLike" icon="failure" title="不感兴趣" />
        <van-cell @click="isReport=true" icon="warning-o" is-link title="反馈垃圾内容" />
        <van-cell @click="blackUers" icon="delete" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReport=false" />
        <van-cell
          @click="reportUser(item.id)"
          v-for="(item, index) in report"
          :key="index"
          :title="item.type"
        />
      </van-cell-group>
      {{artId}}
    </van-popup>
  </div>
</template>

<script>
import { delArtData, reportsArtData, blackList } from '@/api/index.js'
export default {
  props: ['artId', 'autId'],
  data () {
    return {
      // 更多面板
      show: false,
      // 举报面板
      isReport: false,
      // 举报类型
      report: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ]
    }
  },
  methods: {
    // 不感兴趣
    async disLike () {
      try {
        // 将文章 id 传回父组件进行操作
        this.$emit('delArt', this.artId)
        console.log(this.artId) // 打印显示的是 jsonbig 处理过后的 id 字符串
        // 请求接口，将不喜欢的文章操作保存到服务器
        await delArtData(this.artId)
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      // 关闭更多操作面板
      this.show = false
    },
    // 反馈垃圾内容
    async reportUser (typeid) {
      try {
        await reportsArtData({
          artid: this.artId,
          type: typeid
        })
        // 回退到更多操作面板
        this.isReport = false
        // 关闭更多操作面板
        this.show = false
        this.$toast.success('举报成功')
      } catch (error) {
        this.$toast.fail('举报失败')
      }
    },
    // 拉黑作者
    async blackUers () {
      try {
        var res = await blackList(this.autId)
        console.log(res)
      } catch (error) {
        console.log('请求错误')
      }
      this.show = false
    }
  }
}
</script>

<style lang="less">
.more {
  .popShow {
    width: 90%;
  }
}
</style>
