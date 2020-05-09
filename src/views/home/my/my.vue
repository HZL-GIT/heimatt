<template>
  <div class="my">
    <div class="topbox">
      <div class="autor">
        <img @click="$router.push('/personInfo')" :src="userObj.photo" alt />
        <div class="autor_name">{{userObj.name}}</div>
        <div class="read">
          <div>今日阅读</div>
          <div>0分钟</div>
        </div>
      </div>
      <div class="propItem">
        <div class="item">
          <div>{{userObj.art_count}}</div>
          <div>动态</div>
        </div>
        <div class="item">
          <div>{{userObj.follow_count}}</div>
          <div>关注</div>
        </div>
        <div class="item">
          <div>{{userObj.fans_count}}</div>
          <div>粉丝</div>
        </div>
      </div>
    </div>
    <div class="bottombox">
      <!-- 收藏区域 -->
      <van-grid :column-num="3" class="grid">
        <van-grid-item icon="star-o" text="收藏" />
        <van-grid-item icon="underway-o" text="历史" />
        <van-grid-item icon="records" text="作品" />
      </van-grid>
      <!-- 消息通知区域 -->
      <van-cell-group class="group">
        <van-cell title="消息通知" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell @click="$router.push('/robot')" title="小智同学" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getSelf } from '@/api/my.js'
export default {
  data () {
    return {
      userObj: {}
    }
  },
  async mounted () {
    // 请求数据
    var res = await getSelf()
    console.log(res)
    // 保存用户信息
    this.userObj = res.data.data
  }
}
</script>

<style lang="less">
.my {
  .topbox {
    padding-bottom: 20px;
    background-color: #0094ff;
    color: #fff;
  }
  .autor {
    position: relative;
    padding: 40px 0 20px 30px;
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .autor_name {
      font-size: 20px;
      margin-left: 10px;
    }
    .read {
      position: absolute;
      top: 50px;
      right: 0;
      text-align: center;
      font-size: 14px;
      padding: 3px 10px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 30px 0px 0px 30px;
    }
  }
  .propItem {
    display: flex;
    justify-content: space-around;
    text-align: center;
    .item {
      font-size: 16px;
      div:nth-child(1) {
        margin-bottom: 8px;
      }
    }
  }
  .bottombox {
    width: 100%;
    height: 500px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .grid {
    span.van-grid-item__text {
      font-size: 18px;
    }
    i.van-icon.van-icon-star-o.van-grid-item__icon {
      font-size: 34px;
      color: #e66985;
    }
    i.van-icon.van-icon-underway-o.van-grid-item__icon {
      font-size: 34px;
      color: #f49d44;
    }
    i.van-icon.van-icon-records.van-grid-item__icon {
      font-size: 34px;
      color: #7e9bc3;
    }
  }
  .group {
    margin-top: 20px;
    span {
      font-size: 18px;
    }
  }
}
</style>
