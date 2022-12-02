<template>
  <view class="register">
    <Nav>
      <template v-slot:left>
        <u--image :src="leftImg" width="50rpx" height="50rpx" mode="widthFix"></u--image>
      </template>
      <template v-slot:right>
        <u--image :src="errImg" width="50rpx" height="50rpx" mode="widthFix"></u--image>
      </template>
    </Nav>
    <Logo></Logo>
    <view class="register-box">
      <view class="box-title">注册</view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/Nav.vue'
import Logo from '@common/Logo.vue'

export default {
  data() {
    return {
      leftImg: require('@/assets/img/向左.png'),
      errImg: require('@/assets/img/错.png')
    }
  },
  components: {
    Nav,
    Logo
  },
  mounted() {},

  methods: {}
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
  }
}
</style>
