<template>
  <view class="register">
    <Nav>
      <template v-slot:right>
        <view @click="toRegister">注册</view>
      </template>
    </Nav>
    <Logo></Logo>
    <view class="register-box">
      <view class="box-title">登录</view>
      <view class="box_message">您好，欢迎来到 jstx ！</view>
      <view style="margin-top: 30rpx">
        <u--form :model="model1" :rules="rules" ref="form1">
          <u-form-item prop="userInfo.user_name" borderBottom ref="item1">
            <u--input
              v-model="model1.userInfo.user_name"
              type="number"
              border="none"
              placeholder="这里输入账号"
            ></u--input>
          </u-form-item>
          <u-form-item prop="userInfo.password" borderBottom ref="item1">
            <!-- #ifdef H5 -->
            <u--input
              v-model="model1.userInfo.password"
              :password="showPwt"
              border="none"
              placeholder="这里输入密码"
              suffixIconStyle="font-size: 40rpx;"
            >
              <template slot="suffix">
                <u-icon
                  size="40"
                  :name="showPwt == true ? 'eye-fill' : 'eye-off'"
                  @click="() => (showPwt = !showPwt)"
                ></u-icon>
              </template>
            </u--input>
            <!--  #endif -->
            <!--  #ifdef  MP-WEIXIN -->
            <u-input
              v-model="model1.userInfo.password"
              :password="showPwt"
              border="none"
              placeholder="这里输入密码"
              suffixIconStyle="font-size: 40rpx;"
            >
              <template slot="suffix">
                <u-icon
                  size="40"
                  :name="showPwt == true ? 'eye-fill' : 'eye-off'"
                  @click="() => (showPwt = !showPwt)"
                ></u-icon>
              </template>
            </u-input>
            <!--  #endif -->
          </u-form-item>
        </u--form>
        <view
          class="box-button"
          :style="{ backgroundColor: CshowBtnColor == true ? '#ffe431' : '#d4d4d6' }"
          @click="clickLogin"
          >登录</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'
import Logo from '@common/logo.vue'
import { login } from '@/api/index.js'

export default {
  components: {
    Nav,
    Logo
  },
  data() {
    return {
      errImg: require('@/assets/img/错.png'),
      model1: {
        userInfo: {
          user_name: '',
          password: ''
        }
      },
      rules: {
        'userInfo.user_name': [
          {
            required: true,
            message: '请输入账号',
            trigger: ['blur', 'change']
          },
          {
            min: 4,
            max: 10,
            message: '账号在4-10个字符之间',
            trigger: ['blur', 'change']
          }
        ],
        'userInfo.password': [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            min: 6,
            max: 12,
            message: '密码在6-12个字符之间',
            trigger: ['blur', 'change']
          }
        ]
      },
      suffixIcon: 'eye-fill',
      suffixIcon: 'eye-fill',
      showPwt: true
    }
  },
  computed: {
    CshowBtnColor() {
      if (this.model1.userInfo.user_name.length && this.model1.userInfo.password.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    toRegister() {
      this.toNextPage('/pages/minikol/register/index')
      this.$refs.form1.resetFields()
    },
    clickLogin() {
      this.$refs.form1
        .validate()
        .then(async (res) => {
          const { token, id } = await login(this.model1.userInfo)
          this.$store.commit('updateToken', token)
          this.$store.commit('updateId', id)
          console.log(this.$store.state.id)
          uni.$u.toast('登录成功')
          this.toNextPage('/pages/minikol/index/index', { type: 'switchTab' })
          this.$refs.form1.resetFields()
        })
        .catch((err) => {
          if (Object.prototype.toString.call(err).split(' ')[1].split(']')[0] === 'Array') {
            uni.$u.toast('登录失败')
          } else {
            uni.$u.toast(err.data.message)
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.register {
  .register-box {
    margin: 0 50rpx;
    .box-title {
      font-weight: 600;
      font-size: 50rpx;
    }
    .box_message {
      margin-top: 20rpx;
      color: #96979c;
    }
    .box-button {
      margin: 150rpx auto;
      width: 500rpx;
      height: 100rpx;
      border-radius: 50rpx;
      text-align: center;
      line-height: 100rpx;
      color: #fff;
    }
  }
}
</style>
