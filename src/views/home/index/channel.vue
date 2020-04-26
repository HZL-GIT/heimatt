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
            <van-button plain round type="danger" size="mini">编辑</van-button>
            <!-- <van-button v-if="editShow==1" @click="editShow=0" plain round type="danger" size="mini">编辑</van-button>
            <van-button v-if="editShow==0" @click="editShow=1" plain round type="danger" size="mini">完成</van-button> -->
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 频道选择区域 -->
      <van-grid>
        <van-grid-item class="gridf" v-for="(item, index) in channelsListSon" :key="index">
          <template #text>
            {{item.name}}
            <van-icon class="icons" name="clear" />
            <!-- <van-icon v-if="editShow==0" class="icons" name="clear" /> -->
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
        <van-grid-item v-for="(item, index) in 9" :key="index" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ['channelsListSon'],
  data () {
    return {
      // 控制 popUp 组件的显示与否
      show: false
      // editShow: 1 // 控制编辑与完成按钮的切换，以及叉号的显示与否
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
  }
}
</style>
