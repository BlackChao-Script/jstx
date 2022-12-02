<template>
  <view class="logo">
    <u--image :src="titleImg" width="200rpx" height="100rpx" mode="widthFix"></u--image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      titleImg: require('@/assets/img/火.png') // 标题图片
    }
  },

  methods: {}
}
</script>

<style lang="scss">
.logo{
  height: 250rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
