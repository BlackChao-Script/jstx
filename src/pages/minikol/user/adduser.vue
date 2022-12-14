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
        <view
          class="box-userimg"
          v-if="userData.avatar == ''"
          :style="{ backgroundImage: `url(${userData.avatar})` }"
        >
        </view>
        <view class="box-userimg" v-else :style="{ backgroundImage: `url(${userImg})` }"> </view>
      </view>
      <view class="box-username">{{ userData.nickname }}</view>
      <view class="box-messageBoard">
        <textarea v-model="value1" placeholder="请输入内容"></textarea>
      </view>
      <view class="box-btn">
        <view class="btn-a" @click="toBack">取消</view>
        <view class="btn-b" @click="sendRequest">发送</view>
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'
import { getUserInfo, addFriend } from '@/api/index.js'
export default {
  data() {
    return {
      leftImg: require('@/assets/img/向左.png'),
      moImg: require('@/assets/img/更多.png'),
      userImg: require('@/assets/img/用户.png'),
      value1: '',
      userData: {},
      friend_id: ''
    }
  },
  components: {
    Nav
  },
  async onLoad(op) {
    const data = {
      user_id: op.user_id
    }
    this.friend_id = op.user_id
    this.userData = await getUserInfo({ data })
  },
  methods: {
    toBack() {
      this.toBackPage()
    },
    async sendRequest() {
      const params = {
        user_id: this.$store.state.id,
        friend_id: this.friend_id * 1
      }
      await addFriend(params)
      uni.$u.toast('好友申请已发送')
      setTimeout(() => {
        this.toNextPage('/pages/minikol/search/index')
      }, 1500)
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
        border-radius: 50%;
        border: 7rpx solid #ffff;
        background-color: #fff;
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
