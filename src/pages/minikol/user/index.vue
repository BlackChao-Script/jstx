<template>
  <view class="user">
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
    <view class="user-bg">
      <view class="bg-bai"></view>
      <image :src="userImg" class="bg-img" mode="aspectFill"></image>
    </view>
    <view class="user-box">
      <view class="box-img" :style="{ backgroundImage: `url(${userImg})` }">
        <view class="img-sexIcon" :style="{ backgroundColor: sex == '男' ? '#ffe431' : '#ff5d5b' }">
          <image :src="sex == '男' ? nanImg : nvImg" class="sexIcon-img" mode="widthFix"></image>
        </view>
      </view>
      <view class="box-title">
        <view class="title-name">老王</view>
        <view class="title-namea">昵称：春暖花开</view>
      </view>
      <view class="box-text"
        >夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。</view
      >
      <view class="box-btn" @click="addUser">加为好友</view>
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
      nanImg: require('@/assets/img/男.png'),
      nvImg: require('@/assets/img/女.png'),
      sex: '男'
    }
  },
  methods: {
    addUser() {
      console.log('111')
    },
    toBack() {
      this.toBackPage()
    }
  }
}
</script>

<style lang="scss">
.user {
  position: relative;
  .user-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
    .bg-img {
      opacity: 0.4;
      width: 100%;
      height: 100%;
      filter: blur(5rpx);
    }
  }
  .user-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 200rpx auto;
    width: 650rpx;
    height: 900rpx;

    .box-img {
      position: relative;
      width: 350rpx;
      height: 350rpx;
      border-radius: 50rpx;
      background-position: center center;
      background-size: cover;
      border: 6rpx solid #fff;
      .img-sexIcon {
        position: absolute;
        bottom: 20rpx;
        right: 20rpx;
        width: 65rpx;
        height: 65rpx;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        .sexIcon-img {
          width: 60%;
          height: 60%;
        }
      }
    }
    .box-title {
      width: 350rpx;
      text-align: center;
      .title-name {
        margin-top: 40rpx;
        font-size: 45rpx;
      }
      .title-namea {
        font-size: 25rpx;
        margin: 20rpx 0;
      }
    }
    .box-text {
      margin-top: 20rpx;
      width: 100%;
      color: #606064;
      line-height: 50rpx;
      font-size: 30rpx;
    }
    .box-btn {
      position: absolute;
      bottom: 0rpx;
      text-align: center;
      font-size: 30rpx;
      width: 700rpx;
      height: 75rpx;
      line-height: 75rpx;
      border-radius: 10rpx;
      background-color: #ffe431;
    }
  }
}
</style>
