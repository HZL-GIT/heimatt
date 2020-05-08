<template>
  <div class="robot">
    <!-- 头部 -->
    <van-nav-bar left-arrow @click-left="$router.back()" title="阿甘冰室" :fixed="true" />
    <!-- 内容框 -->
    <div class="main">
      <div
        class="content"
        :class="{user:item.isRobot===false}"
        v-for="(item, index) in contentArr"
        :key="index"
      >
        <img src="http://img1.imgtn.bdimg.com/it/u=897786842,2642188289&fm=11&gp=0.jpg" alt />
        <div class="speak">{{item.told}}</div>
      </div>
      <!-- 机器人
      <div class="content">
        <img src="http://img1.imgtn.bdimg.com/it/u=897786842,2642188289&fm=11&gp=0.jpg" alt />
        <div class="speak">你好啊~~</div>
      </div>
      用户
      <div class="content user">
        <img src="http://img1.imgtn.bdimg.com/it/u=897786842,2642188289&fm=11&gp=0.jpg" alt />
        <div class="speak">你好啊~~</div>
      </div>-->
    </div>

    <!-- 底部输入框 -->
    <van-search left-icon="edit" class="searbox" v-model="value" show-action @search="onSearch">
      <template #action>
        <div @click="onSearch">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
// 1.导入 socket.io 客户端 client，接口要求只要客户端
import socket from 'socket.io-client'
export default {
  data () {
    return {
      // 输入框的值
      value: '',
      // 定义一个保存聊天记录的数组
      contentArr: [
        { told: '你好啊,我叫小智', isRobot: true }
      ],
      // 创建一个连接对象
      conn: null
    }
  },
  methods: {
    onSearch () {
      console.log('发送的数据为' + this.value)
      // 3.得到输入框的内容提交到服务器
      this.conn.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
      // 3.1将用户聊天的内容添加到数组中
      this.contentArr.push({
        told: this.value,
        isRobot: false
      })
      // 3.2清空输入框内容
      this.value = ''
    }
  },
  // 在 mounted 中连接服务器
  mounted () {
    // 2.让 socket 去连接服务器
    this.conn = socket('http://ttapi.research.itcast.cn?token=' + this.$store.state.userInfo.token)
    // 4.接收服务器传回的数据
    this.conn.on('message', data => {
      console.log(data)
      // 4.1将服务器返回的机器人数据添加到数组中
      this.contentArr.push({
        told: data.msg,
        isRobot: true
      })
    })
  }
}
</script>

<style lang="less">
.robot {
  margin-top: 46px;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3195f9;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .searbox {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #ccc;
  }
  .main {
    box-sizing: border-box;
    padding: 10px 10px;
    // background-color: pink;
    width: 100%;
    position: fixed;
    top: 46px;
    bottom: 54px;
    .content {
      overflow: hidden;
      margin-top: 10px;
      img {
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .speak {
        float: left;
        background-color: #ccc;
        padding: 10px;
        border-radius: 5px;
        margin-top: 5px;
      }
    }
    .user {
      img {
        float: right;
        margin-left: 10px;
      }
      .speak {
        float: right;
      }
    }
  }
}
</style>
