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
        <u--form :model="modl1" ref="form1">
          <u-form-item prop="userInfo.nickname" borderBottom ref="item1">
            <u--input
              v-model="modl1.userInfo.nickname"
              border="none"
              placeholder="请取个名字"
            ></u--input>
          </u-form-item>
          <u-form-item prop="userInfo.user_name" borderBottom ref="item1">
            <u--input
              v-model="modl1.userInfo.user_name"
              border="none"
              type="number"
              placeholder="请输入账号"
            ></u--input>
          </u-form-item>
          <u-form-item prop="userInfo.password" borderBottom ref="item1">
            <!-- #ifdef H5 -->
            <u--input
              v-model="modl1.userInfo.password"
              :password="showPwt"
              border="none"
              placeholder="这里输入密码"
              suffixIconStyle="font-size: 40rpx;"
            >
              <!--  #endif -->
              <!--  #ifdef  MP-WEIXIN -->
              <u-input
                v-model="modl1.userInfo.password"
                :password="showPwt"
                border="none"
                placeholder="这里输入密码"
                suffixIconStyle="font-size: 40rpx;"
              >
                <!--  #endif -->
                <template slot="suffix">
                  <u-icon
                    size="40"
                    :name="showPwt == true ? 'eye-fill' : 'eye-off'"
                    @click="() => (showPwt = !showPwt)"
                  ></u-icon>
                </template>
                <!--  #ifdef  MP-WEIXIN -->
              </u-input>
              <!--  #endif -->
              <!-- #ifdef H5 -->
            </u--input>
            <!--  #endif -->
          </u-form-item>
          <u-form-item prop="userInfo.mail" borderBottom ref="item1">
            <u--input
              v-model="modl1.userInfo.mail"
              border="none"
              placeholder="请输入邮箱"
            ></u--input>
          </u-form-item>
          <u-form-item prop="userInfo.code" borderBottom ref="item1">
            <!-- #ifdef H5 -->
            <u--input v-model="modl1.userInfo.code" border="none" placeholder="这里输入验证码">
              <!--  #endif -->
              <!--  #ifdef  MP-WEIXIN -->
              <u-input v-model="modl1.userInfo.code" border="none" placeholder="这里输入验证码">
                <!--  #endif -->
                <template slot="suffix">
                  <u-code
                    ref="uCode"
                    @change="codeChange"
                    seconds="60"
                    changeText="X秒重新获取哈哈哈"
                  ></u-code>
                  <u-button @click="getCodes" :text="tips" color="#ffe431" size="mini"></u-button>
                </template>
                <!--  #ifdef  MP-WEIXIN -->
              </u-input>
              <!--  #endif -->
              <!-- #ifdef H5 -->
            </u--input>
            <!--  #endif -->
          </u-form-item>
        </u--form>
        <view
          class="box-button"
          @click="btnRegister"
          :style="{ backgroundColor: CshowBtnColor == true ? '#ffe431' : '#d4d4d6' }"
          >注册</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'
import Logo from '@common/logo.vue'
import { register, getInfoCode, getCmailCode } from '@/api/index.js'

export default {
  components: {
    Nav,
    Logo
  },
  data() {
    return {
      leftImg: require('@/assets/img/向左.png'),
      errImg: require('@/assets/img/错.png'),
      modl1: {
        userInfo: {
          nickname: '',
          user_name: '',
          password: '',
          mail: '',
          code: ''
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
        ],
        'userInfo.mail': [
          {
            required: true,
            message: '请填写邮箱',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.email(value)
            },
            message: '请输入正确的邮箱',
            trigger: ['blur', 'change']
          }
        ],
        'userInfo.code': [
          {
            required: true,
            message: '请填写验证码',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.contains(value, this.codeData)
            },
            message: '请输入正确的验证码',
            trigger: ['blur']
          }
        ]
      },
      showPwt: true,
      codeData: '',
      tips: ''
    }
  },
  onLoad() {},
  onReady() {
    this.$refs.form1.setRules(this.rules)
  },
  computed: {
    CshowBtnColor() {
      if (
        this.modl1.userInfo.nickname.length &&
        this.modl1.userInfo.user_name.length &&
        this.modl1.userInfo.password.length &&
        this.modl1.userInfo.code.length &&
        this.modl1.userInfo.mail.length !== 0
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    toBack() {
      this.toBackPage()
    },
    codeChange(text) {
      this.tips = text
    },
    async getCodes() {
      if (uni.$u.test.email(this.modl1.userInfo.mail) === false) {
        uni.$u.toast('请先填写邮箱信息或者邮箱格式不正确')
        return
      }
      if (this.$refs.uCode.canGetCode) {
        uni.showLoading({
          title: '正在获取验证码'
        })
        const data = {
          mail: this.modl1.userInfo.mail
        }
        try {
          this.codeData = await getCmailCode({ data })
          uni.hideLoading()
          uni.$u.toast('验证码已发送')
          this.$refs.uCode.start()
        } catch (err) {
          uni.$u.toast('验证码发送失败')
        }
      } else {
        uni.$u.toast('倒计时结束后再发送')
      }
    },
    btnRegister() {
      this.$refs.form1
        .validate()
        .then(async (res) => {
          const pamams = this.modl1.userInfo
          await register(pamams)
          uni.$u.toast('注册成功')
          setTimeout(() => {
            this.toBackPage()
          }, 1500)
        })
        .catch((errors) => {
          if (Object.prototype.toString.call(errors).split(' ')[1].split(']')[0] === 'Array') {
            uni.$u.toast('注册失败')
          } else {
            uni.$u.toast(errors.data.message)
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
