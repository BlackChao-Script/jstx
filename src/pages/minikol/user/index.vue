<template>
  <view class="user">
    <view class="user-bg">
      <view class="bg-bai"></view>
      <image :src="userData.avatar" class="bg-img" mode="aspectFill"></image>
    </view>
    <view class="user-box">
      <view class="box-img" :style="{ backgroundImage: `url(${userData.avatar})` }">
        <view
          class="img-sexIcon"
          v-if="userData.sex !== ''"
          :style="{ backgroundColor: userData.sex == '男' ? '#ffe431' : '#ff5d5b' }"
        >
          <image :src="sex == '男' ? nanImg : nvImg" class="sexIcon-img"></image>
        </view>
      </view>
      <view class="box-title">
        <view class="title-name">{{ userData.user_name }}</view>
        <view class="title-namea">昵称：{{ userData.nickname }}</view>
      </view>
      <view class="box-text">{{ userData.signature }}</view>
      <view class="box-btn" @click="addUser">加为好友</view>
    </view>
  </view>
</template>

<script>
import { getUserInfo } from '@/api/index.js'

export default {
  data() {
    return {
      nanImg: require('@/assets/img/男.png'),
      nvImg: require('@/assets/img/女.png'),
      sex: '男',
      friend_id: '',
      userData: {}
    }
  },
  async onLoad(op) {
    const data = {
      user_id: op.user_id
    }
    this.friend_id = op.user_id
    this.userData = await getUserInfo({ data })
    console.log(this.userData)
  },
  methods: {
    addUser() {
      this.$u.route({
        url: '/pages/minikol/user/adduser',
        params: {
          user_id: this.friend_id
        }
      })
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
      opacity: 0.5;
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
