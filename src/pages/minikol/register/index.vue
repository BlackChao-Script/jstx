<template>
  <view class="register">
    <Nav>
      <template v-slot:left>
        <view @click="toBack"
          ><u--image :src="leftImg" width="50rpx" height="50rpx" mode="widthFix"></u--image
        ></view>
      </template>
    </Nav>
    <Logo></Logo>
    <view class="register-box">
      <view class="box-title">注册</view>
      <view style="margin-top: 30rpx">
        <u--form :model="model1" :rules="rules" ref="form1">
          <u-form-item prop="userInfo.nickname" borderBottom ref="item1">
            <u--input
              v-model="model1.userInfo.nickname"
              border="none"
              placeholder="请取个名字"
            ></u--input>
          </u-form-item>
          <u-form-item prop="userInfo.user_name" borderBottom ref="item1">
            <u--input
              v-model="model1.userInfo.user_name"
              border="none"
              type="number"
              placeholder="请输入账号"
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
        <view class="box-button" @click="btnRegister">注册</view>
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'
import Logo from '@common/logo.vue'
import { register } from '@/api'

export default {
  components: {
    Nav,
    Logo
  },
  data() {
    return {
      leftImg: require('@/assets/img/向左.png'),
      errImg: require('@/assets/img/错.png'),
      model1: {
        userInfo: {
          nickname: '',
          user_name: '',
          password: ''
        }
      },
      rules: {
        'userInfo.nickname': [
          // 必填规则
          {
            required: true,
            message: '请填写名字',
            trigger: ['blur', 'change']
          },
          // 2-6 个字符之间的判断
          {
            min: 2,
            max: 6,
            message: '名字在2-6个字符之间',
            trigger: ['blur', 'change']
          }
        ],
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
            message: '请填写密码',
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

  methods: {
    toBack() {
      this.toBackPage()
    },
    btnRegister() {
      console.log('注册')
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
