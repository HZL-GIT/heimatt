<template>
  <!-- 评论区域 -->
  <div class="comment">
    <div class="author">
      <div class="img">
        <img src="http://img3.imgtn.bdimg.com/it/u=2402087187,1044842928&fm=26&gp=0.jpg" alt />
      </div>
      <div class="msg">
        <div class="name">hanahn</div>
        <div class="comm_text">评论内容</div>
        <div>
          <span>一年前</span>
          <span>
            <van-button color="#ccc" size="mini" round type="info">回复 0 </van-button>
          </span>
        </div>
      </div>
      <div class="btn">
        <van-icon name="like" color="red" />0
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.comment {
  .comm_text {
    padding: 10px;
  }
  .name {
    color: #0094ff;
  }
  .time {
    span {
      margin:0 10px;
    }
  }
}
</style>
