<template>
  <div class="channel">
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <!-- 我的频道 -->
      <!-- 标题区域 -->
      <van-cell-group>
        <van-cell title="我的频道">
          <template #title>
            <span style="font-size:18px">我的频道</span>
          </template>
          <template #default>
            <!-- <van-button plain round type="danger" size="mini">编辑</van-button> -->
            <van-button
              v-if="isEdit===false"
              @click="isEdit=true"
              plain
              round
              type="danger"
              size="mini"
            >编辑</van-button>
            <van-button v-else @click="isEdit=false" plain round type="danger" size="mini">完成</van-button>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 频道选择区域 -->
      <van-grid>
        <van-grid-item class="gridf" v-for="(item, index) in channelsListSon" :key="index">
          <template #text>
            <!-- 利用父子间传值来实现效果 -->
            <!-- :class="{active:activeS===index}" index页面选中的频道再channel频道编辑页高亮显示 -->
            <!-- @click="changeActive(index)" $emit在channel页面传值给index页面，实现在channel页面点击选项后，index页面页相应的切换频道 -->
            <span :class="{active:active===index}" @click="changeActive(index)">{{item.name}}</span>
            <!-- <van-icon class="icons" name="clear" @click="delChannel(index)" /> -->
            <van-icon
              v-if="isEdit && index !==0"
              @click.stop="delChannel(index)"
              class="icons"
              name="clear"
            />
          </template>
        </van-grid-item>
      </van-grid>

      <!-- 频道推荐 -->
      <!-- 推荐标题 -->
      <van-cell-group>
        <van-cell title="我的频道">
          <template #title>
            <span style="font-size:18px">频道推荐</span>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 频道选择区域 -->
      <van-grid>
        <van-grid-item
          @click="addChannel(item)"
          v-for="(item, index) in recommend"
          :key="index"
          :text="item.name"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannel, resetChannel } from '@/api/index.js'
import { localSet } from '@/utils/token.js'
export default {
  props: ['channelsListSon', 'active'],
  data () {
    return {
      // 控制 popUp 组件的显示与否
      show: false,
      isEdit: false, // 控制编辑与完成按钮的切换，以及叉号的显示与否
      // 所有的频道数据
      allChannel: []
    }
  },
  methods: {
    // 获取所有的用户频道
    async getAllChannel () {
      // 调用接口
      var res = await getAllChannel()
      console.log(res)
      // 将得到的所有频道保存起来
      this.allChannel = res.data.data.channels
    },
    // 增加频道到用户频道
    async addChannel (item) {
      // 将点击的推荐频道 添加到 我的频道中
      this.channelsListSon.push(item)
      this.$set(item, 'articleList', [])
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'isLoading', false)
      // 获取保存在 vuex 中的token，用于判断
      var token = this.$store.state.userInfo.token
      if (token) { // 如果 token 存在，即用户登录了
        // 获取接口需要的参数，channels是一个数组
        // 根据频道数据生成 channels 参数，将第一条数据 推荐数据 删除
        var channels = this.channelsListSon.slice(1).map((item, index) => {
          return {
            id: item.id, // 频道的 id
            seq: index + 2 // 频道的顺序
          }
        })
        // 已登录，则请求接口，将新添加的频道保存到服务器
        await resetChannel(channels) // 该接口可用于多个频道的顺序修改、新增、删除
      } else { // 如果 token 不存在，即用户未登录
        // 将我的频道数据保存在本地的 localStorage 中
        localSet('channel', this.channelsListSon)
      }
    },
    // 从我的频道中删除频道
    async delChannel (index) {
      // 点击 叉号 将所在项移除，移除 1 个，即本身
      this.channelsListSon.splice(index, 1)
      // 查看用户是否有登录
      var token = this.$store.state.userInfo.token
      if (token) { // 登录了
        // 获取接口所要的参数
        var channels = this.channelsListSon.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await resetChannel(channels)
      } else { // 未登录
        // 将我的频道保存在本地localStorage中
        localSet('channel', this.channelsListSon)
      }
    },
    // 在频道编辑中修改首页界面选中的频道
    changeActive (index) {
      // 不能直接修改，而是应该将参数 index 传递给父组件 channel ，让父组件来修改选中项
      this.$emit('update:active', index)
    }
  },
  mounted () {
    // 页面加载后 就请求所用用户频道的方法
    this.getAllChannel()
  },
  computed: {
    // 定义一个推荐频道，这个数据来源于：从全部频道中 剔除 我的频道 之后的数据
    recommend: function () {
      // 将我的频道数据从全部频道数据中剔除的操作
      // 得到我的频道的数据中的 id 集合
      var ids = this.channelsListSon.map(item => {
        return item.id
      })
      // 判断所有的频道数据中的每一个成员的 id 是否在 ids 中存在
      var newArr = this.allChannel.filter(item => {
        // 不存在则返回出来，得到剔除后的数据。。。存在则不理会
        return !ids.includes(item.id)
      })
      return newArr
    }
  }
}
</script>

<style lang="less">
.channel {
  .gridf {
    position: relative;
    font-size: 12px;
    color: #646566;
    .icons {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #ccc;
    }
    .active {
      color: red;
    }
  }
}
</style>
