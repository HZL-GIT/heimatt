<template>
  <div class="vantdemo">
    <h3>导航栏练习</h3>
    <van-nav-bar title="登录" />
    <h3>按钮练习</h3>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h3>icon练习</h3>
    <van-icon name="fire" />
    <h3>单元格练习</h3>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <h3>插槽练习</h3>
    <van-cell-group>
      <van-cell value="内容">
        <template #title>
          <van-icon name="star" />单元格
          <van-icon name="live" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.vantdemo {
  .van-nav-bar {
    .van-nav-bar__title {
      color: white;
    }
    background-color: skyblue;
  }
}
</style>
