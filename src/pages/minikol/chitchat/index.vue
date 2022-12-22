<template>
  <view class="chitchat">
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
    <scroll-view class="chat" :scroll-y="true" :scroll-with-animation="true">
      <view class="chat-main">
        <view class="chat-ls" v-for="value in msgData" :key="value.tip">
          <view class="ls-time" v-if="value.send_time != ''">{{ value.send_time }}</view>
          <view
            class="ls-msg msg-left"
            :class="[value.user_id.id !== user_id ? 'msg-left' : 'msg-right']"
          >
            <view class="msg">
              <image
                v-if="value.user_id.id !== user_id"
                :src="value.user_id.avatar"
                class="msg-img"
              ></image>
              <image v-else :src="value.user_id.avatar" class="msg-img"></image>
            </view>
            <view class="msg-content">
              <view class="content-text" v-if="value.content_type === 0">{{
                value.sendcontent
              }}</view
              ><view class="content-img" v-else-if="value.content_type === 1">
                <!-- <image
                  :src="value.imgUrl"
                  class="img"
                  mode="widthFix"
                  @click="imgPreview(value.imgUrl)"
                ></image> -->
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
          <textarea
            class="inp-text"
            auto-height
            v-model="value"
            :fixed="true"
            confirm-type="send"
            @confirm="confirmMessage"
          />
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
import { getchitchatMsg, sendchitchatMsg } from '@/api/index'

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
      msgData: [],
      oldTime: new Date(),
      user_id: '',
      friend_id: ''
    }
  },
  onLoad(op) {
    this.user_id = this.$store.state.id
    this.friend_id = op.friend_id
    this.getMsg()
  },
  methods: {
    toBack() {
      this.toBackPage()
    },
    imgPreview(img) {
      uni.previewImage({
        urls: [img]
      })
    },
    async getMsg() {
      const data = {
        user_id: this.user_id,
        friend_id: this.friend_id
      }
      const res = await getchitchatMsg({ data, custom: { auth: true } })
      this.msgData = res
      // 时间间隔
      for (let i of res) {
        let T = this.spacTime(this.oldTime, i.send_time)
        if (T) {
          this.oldTime = T
        }
        i.send_time = T
        if (i.send_time !== '') {
          i.send_time = this.dateTime(i.send_time)
        }
      }
    },
    async confirmMessage(e) {
      console.log(e.detail.value)
      const params = {
        friend_id: this.friend_id,
        user_id: this.user_id,
        sendcontent: e.detail.value
      }
      await sendchitchatMsg(params, { custom: { auth: true } })
      this.getMsg()
      this.value = ''
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
            margin: 0 20rpx;
            .content-text {
              display: flex;
              align-items: center;
              min-height: 70rpx;
              font-size: 30rpx;
              padding: 10rpx;
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
  min-height: 100rpx;
  bottom: 0;
  left: 0;
  .nav-box {
    display: flex;
    align-items: flex-end;
    padding: 0 20rpx;
    height: 100rpx;
    margin-top: 20rpx;
    margin-bottom: 25rpx;
    height: auto;
    .box-left {
      margin-right: 20rpx;
    }
    .box-inp {
      flex: 1;
      .inp-text {
        font-size: 30rpx;
        max-width: 490rpx;
        min-height: 60rpx;
        background-color: #f4f4f4;
        border-radius: 15rpx;
      }
    }
    .box-right {
      display: flex;
      justify-content: space-around;
      width: 150rpx;
    }
  }
}
</style>
