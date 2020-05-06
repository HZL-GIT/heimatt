<template>
  <div class="upload">
    <van-popup v-model="show" :close-on-click-overlay="false">
      <div @click="openInp">从相册中选择</div>
      <input @change="imageChange" ref="myInp" type="file" style="display:none" />
      <div>拍照</div>
      <div @click="show=false">取消</div>
    </van-popup>
  </div>
</template>

<script>
// 一以下两项为 vant 中的图片预览所必须的导入文件
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { uploadPhoto } from '@/api/my.js'
// 注册使用 图片预览
Vue.use(ImagePreview)
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 点击打开 file属性的input 事件
    openInp () {
      // 移花接木,将 input 框隐藏之后,通过 ref 点击相册选择盒子来触发 input
      this.$refs.myInp.click()
    },
    // input 文件上传框的值一旦发生改变就会触发
    imageChange () {
      console.log(this.$refs.myInp.files[0])
      // 将图片对象转换为 url 路径
      // 方法一 ：URL.createObjectURL
      // var path = URL.createObjectURL(this.$refs.myInp.files[0])
      // 方法二 ：fileReader  推荐使用二  兼容性好于方法一
      // 声明一个 fileReader
      var reader = new FileReader()
      // 开始转换
      reader.readAsDataURL(this.$refs.myInp.files[0])
      // 监听转换完毕: 这个事件会在转换完毕之后执行
      reader.addEventListener('load', () => {
        // 将图片进行转换
        // 图片预览
        ImagePreview({
          // images 图片预览的 url 数组
          // images: [path],
          images: [
            reader.result // 转换后的结果保存在 reader.result 中
          ],
          // onClose 图片预览关闭后的回调函数
          onClose: this.imgClose
        })
      })
    },
    // 图片预览关闭后的逻辑操作
    imgClose () {
      this.$dialog.confirm({
        title: '友情提示',
        message: '您确定要使用该图片吗？'
      })
        .then(async () => {
          console.log('确定')
          // 调用接口将图片上传
          var res = await uploadPhoto(this.$refs.myInp.files[0])
          console.log(res)
          // 将接口返回的头像地址保存起来
          var photo = res.data.data.photo
          // 传给父组件，让父组件可以进行头像的渲染
          this.$emit('getPhoto', photo)
          // 关闭 popup
          this.show = false
          this.$toast.success('图片上传成功')
        })
        .catch(() => {
          console.log('取消')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
  text-align: center;
  line-height: 45px;
  .van-popup.van-popup--center {
    border-radius: 5px;
  }
  .van-popup.van-popup--center {
    width: 90%;
  }
  div:nth-child(2) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
}
</style>
