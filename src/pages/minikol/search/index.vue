<template>
  <view class="search">
    <view class="search-header">
      <view class="header-search">
        <u--input suffixIcon="search" suffixIconStyle="font-size: 50rpx"></u--input>
      </view>
      <view class="header-text" @click="toBack">取消</view>
    </view>
    <view class="search-content">
      <view class="content-username">用户</view>
      <view class="content-userlist" v-for="(item, index) in 5" :key="index">
        <view class="userlist-img">
          <u-avatar :src="src" shape="square" size="90"></u-avatar>
        </view>
        <view class="userlist-text">撒大苏打</view>
        <view class="userlist-btn">
          <!-- <view class="btn">发消息</view> -->
          <view class="btna">加好友</view>
        </view>
      </view>
      <view class="content-username">群组</view>
      <view class="content-userlist">
        <view class="userlist-img">
          <u-avatar :src="src" shape="square" size="90"></u-avatar>
        </view>
        <view class="userlist-text">撒大苏打</view>
        <view class="userlist-btn">
          <!-- <view class="btn">发消息</view> -->
          <view class="btna">加好友</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: 'https://cdn.uviewui.com/uview/album/5.jpg' // 用户头像
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
.search {
  .search-header {
    display: flex;
    align-items: center;
    .header-search {
      flex: 1;
      margin-left: 20rpx;
    }
    .header-text {
      width: 100rpx;
      font-size: 30rpx;
      text-align: center;
    }
  }
  .search-content {
    margin: 20rpx;
    .content-username {
      font-size: 45rpx;
      font-weight: 600;
      margin: 10rpx 0;
    }
    .content-userlist {
      display: flex;
      height: 120rpx;
      .userlist-img {
        width: 120rpx;
        display: flex;
        align-items: center;
      }
      .userlist-text {
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      .userlist-btn {
        width: 150rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
          width: 130rpx;
          height: 50rpx;
          font-size: 26rpx;
          text-align: center;
          line-height: 50rpx;
          border-radius: 30rpx;
          background-color: #ffe431;
        }
        .btna {
          width: 130rpx;
          height: 50rpx;
          font-size: 26rpx;
          text-align: center;
          line-height: 50rpx;
          border-radius: 30rpx;
          color: #4aaaff;
          background-color: #edf6ff;
        }
      }
    }
  }
}
</style>
