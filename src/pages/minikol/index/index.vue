<template>
  <view class="page-content">
    <!-- nav -->
    <view class="content-nav">
      <view class="nav-userImg" @click="toUser">
        <u-avatar :src="src" shape="square" size="60"></u-avatar>
      </view>
      <view class="nav-title">
        <u--image :src="titleImg" width="100rpx" height="50rpx" mode="widthFix"></u--image>
      </view>
      <view class="nav-icon">
        <view @click="goSearch">
          <u--image
            :src="iconImg.icon_search"
            width="60rpx"
            height="60rpx"
            mode="widthFix"
          ></u--image>
        </view>
        <view @click="toAddGroup">
          <u--image
            :src="iconImg.icon_addgroup"
            width="50rpx"
            height="50rpx"
            mode="widthFix"
          ></u--image>
        </view>
      </view>
    </view>
    <!-- userList -->
    <view class="content-list">
      <view class="list-box" v-for="(item, index) in 20" :key="index" @click="toChitchat">
        <view class="box-img">
          <u-avatar :src="src" shape="square" size="80"></u-avatar>
          <view class="box-badge">
            <u-badge max="99" value="2"></u-badge>
          </view>
        </view>
        <view class="box-content">
          <view class="content-title">开发的实力</view>
          <view class="content-text"
            >就是撒执行操作，啊实打实asddddddddddddddddddddddddddddddddd</view
          >
        </view>
        <view class="box-time">上午7:45</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: 'aa', // 用户头像
      titleImg: require('@/assets/img/火.png'), // 标题图片
      iconImg: {
        icon_search: require('@/assets/img/search.png'),
        icon_addgroup: require('@/assets/img/add group.png')
      } // 图标
    }
  },
  onLoad(options) {
  },
  methods: {
    goSearch() {
      this.toNextPage('/pages/minikol/search/index')
    },
    toUser() {
      this.toNextPage('/pages/minikol/user/index')
    },
    toAddGroup() {
      this.toNextPage('/pages/minikol/group/creatgroup')
    },
    toChitchat() {
      this.toNextPage('/pages/minikol/chitchat/index')
    }
  }
}
</script>

<style lang="scss">
.page-content {
  .content-nav {
    display: flex;
    height: 70rpx;
    padding-bottom: 5rpx;
    box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);
    position: -webkit-sticky;
    position: sticky;
    top: var(--window-top);

    z-index: 999;
    background-color: #ffff;
    .nav-userImg {
      display: flex;
      align-items: center;
      margin-left: 20rpx;
      width: 140rpx;
    }
    .nav-title {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .nav-icon {
      width: 150rpx;
      margin-right: 10rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .content-list {
    margin: 5rpx 20rpx;
    .list-box {
      display: flex;
      height: 120rpx;

      .box-img {
        display: flex;
        position: relative;
        align-items: center;
        .box-badge {
          position: absolute;
          top: 15rpx;
          right: -10rpx;
          z-index: 2;
        }
      }
      .box-content {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .content-title {
          font-size: 30rpx;
        }
        .content-text {
          width: 500rpx;
          font-size: 25rpx;
          color: #95969b;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
      }
      .box-time {
        margin-top: 30rpx;
        font-size: 20rpx;
        color: #cbcbcd;
      }
    }
  }
}
</style>
