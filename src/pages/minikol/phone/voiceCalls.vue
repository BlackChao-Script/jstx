<template>
  <view class="invite">
    <Nav>
      <template v-slot:left>
        <view
          ><u--image :src="shrinkIcon" width="50rpx" height="50rpx" mode="widthFix"></u--image
        ></view>
      </template>
      <template v-slot:mid>
        <view style="font-size: 30rpx">邀请你语音通话...</view>
      </template>
    </Nav>
    <view class="invite-bg">
      <image class="bg-img" :src="userImg" mode="aspectFill"></image>
    </view>
    <view class="invite-userimg">
      <view class="userimg-img">
        <u-avatar :src="userImg" size="200"></u-avatar>
      </view>
      <view class="userimg-name">老王</view>
    </view>
    <view class="invite-btns">
      <view
        class="btns-hangup"
        v-for="(value, index) in inviteBtnsData"
        :key="index"
        @click="changAnswer(value.text)"
      >
        <view class="hangup-icon" :style="{ backgroundColor: value.bgc }">
          <u--image :src="value.img" width="80rpx" height="80rpx" mode="widthFix"></u--image>
        </view>
        <view class="hangup-text">{{ value.text }}</view>
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
      shrinkIcon: require('@/assets/img/缩小.png'),
      userImg: require('@/assets/img/wallhaven-3lo8q3_2560x1440.png'),
      hangupImg: require('@/assets/img/挂断.png'),
      answerImg: require('@/assets/img/接听.png'),
      inviteBtnsData: [
        {
          img: require('@/assets/img/挂断.png'),
          text: '挂断',
          bgc: '#ff5d5b'
        },
        {
          img: require('@/assets/img/接听.png'),
          text: '接听',
          bgc: '#30c74d'
        }
      ],
      answerBol: false
    }
  },

  methods: {
    changAnswer(value) {
      if (value == '接听') {
        this.answerBol = !this.answerBol
      }
    }
  }
}
</script>

<style lang="scss">
.invite {
  .invite-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
    .bg-img {
      width: 100%;
      height: 100%;
      filter: blur(10rpx);
    }
  }
  .invite-userimg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 300rpx;
    .userimg-name {
      margin-top: 10rpx;
      color: #fff;
      font-size: 35rpx;
    }
  }
  .invite-btns {
    position: fixed;
    bottom: 100rpx;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: space-around;
    width: 100%;
    .btns-hangup {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200rpx;
      height: 250rpx;
      .hangup-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
      }
      .hangup-text {
        color: #fff;
        font-size: 28rpx;
        margin-top: 20rpx;
      }
    }
  }
}
</style>
