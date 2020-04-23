<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model.trim="obj.mobile" :error-message="result.mobile" placeholder="请输入手机号码">
        <template #left-icon>
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
      <van-field v-model.trim="obj.code" :error-message="result.code" placeholder="请输入验证码">
        <template #left-icon>
          <i class="iconfont icon-lock"></i>
        </template>
        <template #button>
          <van-button class="codeBtn" size="small" color="#ECECEC">获取验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="loginBtn">
      <van-button color="#6DB4FA" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { checkLogin } from '@/api/login.js'
export default {
  data () {
    return {
      // 绑定输入框
      obj: {
        mobile: '13911111111',
        code: '246810'
      },
      // 为输入框加入验证提示
      result: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async login () {
      // 验证参数的合法性
      if (this.checkData() === false) {
        return // 结束代码的运行
      }
      // 验证成功 调用接口
      var res = await checkLogin({
        mobile: this.obj.mobile,
        code: this.obj.code
      })
      window.console.log(res.data.data)
      var result = res.data.data
      this.$store.commit('setUserInfo', result)
      // 跳转首页
      this.$router.push('/home')

      // 验证成功 调用接口
      // checkLogin({
      //   mobile: this.obj.mobile,
      //   code: this.obj.code
      // }).then(res => {
      //   var result = res.data.data
      //   console.log(result)
      //   // 跳转首页
      //   this.$router.push('/home')
      // }).catch(() => { })

      // axios({
      //   url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
      //   method: 'post',
      //   data: {
      //     mobile: this.obj.mobile,
      //     code: this.obj.code
      //   }
      // }).then(res => {
      //   // 成功回调
      //   // console.log(res)
      //   var result = res.data.data
      //   console.log(result)
      //   // 跳转首页
      //   this.$router.push('/home')
      // })
    },
    // 验证的方法：返回值 true => 验证通过，false => 验证失败
    checkData () {
      // 添加一个验证是否通过的数组标识
      const isPass = []
      // 验证参数是否合法
      // 验证手机号
      if (this.obj.mobile.length === 11) {
        this.result.mobile = ''
        isPass.push(true)
      } else {
        this.result.mobile = '手机号验证失败'
        isPass.push(false)
      }
      // 验证验证码
      if (this.obj.code.length === 6) {
        this.result.code = ''
        isPass.push(true)
      } else {
        this.result.code = '验证码验证失败'
        isPass.push(false)
      }
      // 验证码都通过时应该将参数提交到服务器
      // 只有isPass 中的内容都为 true 时，验证才通过
      if (isPass.includes(false)) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less">
.login {
  .van-nav-bar.van-hairline--bottom {
    background-color: #3195f9;
  }
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  span.van-button__text {
    color: #666;
  }
  .codeBtn {
    border-radius: 18px;
  }
  .loginBtn {
    margin: 20px;
    button.van-button.van-button--large {
      border-radius: 10px;
      span.van-button__text {
        color: #fff;
      }
    }
  }
}
</style>
