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
          <u-form-item prop="userInfo.name" borderBottom ref="item1">
            <u--input
              v-model="model1.userInfo.name"
              border="none"
              placeholder="这里输入账号"
            ></u--input>
          </u-form-item>
          <u-form-item prop="userInfo.pwd" borderBottom ref="item1">
            <!-- #ifdef H5 -->
            <u--input
              v-model="model1.userInfo.pwd"
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
              v-model="model1.userInfo.pwd"
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
        <view class="box-button">登录</view>
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'
import Logo from '@common/logo.vue'

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
          name: '',
          pwd: ''
        }
      },
      rules: {
        'userInfo.name': {
          type: 'string',
          required: true,
          message: '请填写账号',
          trigger: ['blur', 'change']
        }
      },
      suffixIcon: 'eye-fill',
      suffixIcon: 'eye-fill',
      showPwt: true
    }
  },
  methods: {
    toRegister() {
      this.toNextPage('/pages/minikol/register/index')
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
      background-color: #d4d4d6;
    }
  }
}
</style>
