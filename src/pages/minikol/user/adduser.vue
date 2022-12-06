<template>
  <view class="adduser">
    <view :style="{ backgroundColor: '#fae97e' }">
      <Nav>
        <template v-slot:left>
          <view @click="toBack"
            ><u--image :src="leftImg" width="50rpx" height="50rpx" mode="widthFix"></u--image
          ></view>
        </template>
        <template v-slot:right>
          <u--image :src="moImg" width="50rpx" height="50rpx" mode="widthFix"></u--image>
        </template>
      </Nav>
    </view>
    <view class="adduser-topbox"></view>
    <view class="adduser-box">
      <view class="box">
        <view class="box-userimg" :style="{ backgroundImage: `url(${userImg})` }"> </view>
      </view>
      <view class="box-username">春暖花开</view>
      <view class="box-messageBoard">
        <textarea v-model="value1" placeholder="请输入内容"></textarea
      ></view>
      <view class="box-btn">
        <view class="btn-a" @click="toBack">取消</view>
        <view class="btn-b">发送</view>
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'
export default {
  components: {
    Nav
  },
  data() {
    return {
      leftImg: require('@/assets/img/向左.png'),
      moImg: require('@/assets/img/更多.png'),
      userImg: 'https://cdn.uviewui.com/uview/album/5.jpg',
      value1: ''
    }
  },
  methods: {
    toBack() {
      this.toBackPage()
    }
  }
}
</script>

<style lang="scss">
.adduser {
  width: 100%;
  .adduser-topbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -9999;
    background-color: #fae97e;
  }
  .adduser-box {
    position: relative;
    margin-top: 300rpx;
    height: 1165rpx;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    background-color: #fdfcfc;
    .box {
      height: 150rpx;
      .box-userimg {
        position: absolute;
        top: -100rpx;
        left: 50rpx;
        width: 200rpx;
        height: 200rpx;
        background-color: aqua;
        border-radius: 50%;
        border: 7rpx solid #ffff;
        background-position: center center;
        background-size: cover;
      }
    }
    .box-username {
      margin-left: 60rpx;
      font-size: 36rpx;
    }
    .box-messageBoard {
      margin: 50rpx auto;
      width: 85%;
      border-radius: 20rpx;
      height: 650rpx;
      padding: 10rpx;
      background-color: #f3f4f6;
    }
    .box-btn {
      font-size: 30rpx;
      margin-left: 50rpx;
      display: flex;
      .btn-a {
        width: 150rpx;
        height: 70rpx;
        border-radius: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e9e9ea;
      }
      .btn-b {
        margin-left: 40rpx;
        width: 450rpx;
        height: 70rpx;
        border-radius: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #fae97e;
      }
    }
  }
}
</style>
