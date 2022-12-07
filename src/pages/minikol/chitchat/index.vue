<template>
  <view class="chitchat">
    <view style="border-bottom: 1rpx solid #ededed">
      <Nav>
        <template v-slot:left>
          <view @click="toBack"
            ><u--image :src="leftImg" width="50rpx" height="50rpx" mode="widthFix"></u--image
          ></view>
        </template>
        <template v-slot:mid>
          <view style="font-size: 35rpx">开心就好</view>
        </template>
      </Nav>
      <view class="chitchat-list"></view>
    </view>
    <scroll-view class="chat" :scroll-y="true" :scroll-with-animation="true">
      <view class="chat-main">
        <view class="chat-ls" v-for="value in mes" :key="value.tip">
          <view class="ls-time">{{ value.time }}</view>
          <view class="ls-msg msg-left" :class="[value.id === 'a' ? 'msg-left' : 'msg-right']">
            <view class="msg">
              <image :src="value.imgUrl" class="msg-img"></image>
            </view>
            <view class="msg-content">
              <view class="content-text" v-if="value.type === 0">{{ value.message }}</view
              ><view class="content-img" v-else-if="value.type === 1">
                <image :src="value.imgUrl" class="img" mode="widthFix"></image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="chitchat-nav">
      <view class="nav-box">
        <view class="box-left">
          <u--image :src="boxLeftImg" width="50rpx" height="50rpx" mode="widthFix"></u--image>
        </view>
        <view class="box-inp">
          <u--input border="none" v-model="value"></u--input>
        </view>
        <view class="box-right">
          <u--image :src="boxRightImg" width="50rpx" height="50rpx" mode="widthFix"></u--image>
          <u--image :src="boxRightImga" width="50rpx" height="50rpx" mode="widthFix"></u--image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@/common/nav.vue'
import mes from '@/utils/data.js'

export default {
  components: { Nav },
  data() {
    return {
      leftImg: require('@/assets/img/向左.png'),
      userImg: 'https://cdn.uviewui.com/uview/album/5.jpg',
      boxLeftImg: require('@/assets/img/语音.png'),
      boxRightImg: require('@/assets/img/表情.png'),
      boxRightImga: require('@/assets/img/更多.png'),
      value: '',
      mes
    }
  },
  onLoad() {
    this.getData(this.mes)
  },
  methods: {
    toBack() {
      this.toBackPage()
    },
    getData(n) {
      for (let i of n) {
        let now = new Date(i.time),
          m = now.getMonth() + 1,
          d = now.getDate()
        i.time =
          (m < 10 ? '0' + m : m) +
          '月' +
          (d < 10 ? '0' + d : d) +
          '日' +
          now.toTimeString().substr(0, 5)
      }
    }
  }
}
</script>

<style lang="scss">
.chitchat {
  .chat {
    padding-bottom: 200rpx;
    height: 100%;
    .chat-main {
      padding-left: 30rpx;
      padding-right: 30rpx;
      display: flex;
      flex-direction: column;
      .chat-ls {
        .ls-time {
          font-size: 25rpx;
          color: rgba(39, 40, 50, 0.3);
          padding: 20rpx;
          text-align: center;
        }
        .ls-msg {
          display: flex;
          padding: 20rpx 0;
          .msg {
            width: 90rpx;
            .msg-img {
              width: 90rpx;
              height: 90rpx;
              border-radius: 10rpx;
            }
          }
          .msg-content {
            max-width: 480rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 20rpx;
            .content-text {
              font-size: 35rpx;
              padding: 20rpx;
            }
            .content-img {
              width: 400rpx;
              .img {
                width: 100%;
                border-radius: 10rpx;
              }
            }
          }
        }
        .msg-left {
          flex-direction: row;
          .msg-content {
            .content-text {
              border-radius: 0 10rpx 10rpx;
              background-color: #f4f4f4;
            }
          }
        }
        .msg-right {
          flex-direction: row-reverse;
          .msg-content {
            .content-text {
              border-radius: 10rpx 0 10rpx 10rpx;
              background-color: #ffe431;
            }
          }
        }
      }
    }
  }
}
.chitchat-nav {
  position: fixed;
  border-top: 1rpx solid #ededed;
  background-color: #fff;
  width: 100%;
  height: 120rpx;
  bottom: 0;
  left: 0;
  .nav-box {
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    height: 100rpx;
    margin-top: 20rpx;
    .box-left {
      margin-right: 20rpx;
    }
    .box-inp {
      flex: 1;
      height: 60rpx;
      background-color: #f4f4f4;
      border-radius: 15rpx;
    }
    .box-right {
      display: flex;
      justify-content: space-around;
      width: 150rpx;
    }
  }
}
</style>
