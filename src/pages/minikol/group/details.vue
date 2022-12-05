<template>
  <view class="details">
    <view class="details-top">
      <view class="top-o">
        <view class="o-title">开心就好</view>
        <view class="o-time">2022/12/5</view>
      </view>
      <view class="top-b"
        >特别的爱给特别的你，就阿什顿库，大哭高科技啊老哭高科技啊老大。领导咖啡什顿库，大哭高科技啊老哭高sadasdasd</view
      >
    </view>
    <view class="details-users">
      <view class="users-title">
        <view class="title-left">群成员</view>
        <view class="title-right">成员管理 ></view>
      </view>
      <view class="users-list">
        <view class="list-item" v-for="(value, index) in usersList" :key="index">
          <view v-if="value.name !== '邀请'">
            <view class="item-userImg">
              <image class="userImg-img" :src="userImg"></image>
            </view>
            <view class="item-username">{{ value.name }}</view>
          </view>
          <view v-else>
            <view class="item-userImga">
              <image class="userImga-img" :src="icon_addgroup"></image>
            </view>
            <view class="item-username">{{ value.name }}</view>
          </view>
        </view>
      </view>
    </view>
    <u-divider></u-divider>
    <view class="details-bottom">
      <view class="bottom-item">
        <view class="item-name"></view>
        <view class="item-text"></view>
        <view class="item-icon">></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userImg: 'https://cdn.uviewui.com/uview/album/5.jpg',
      icon_addgroup: require('@/assets/img/add group.png'),
      usersList: [
        {
          name: '老王111'
        },
        {
          name: '老王111'
        },
        {
          name: '老王111'
        },
        {
          name: '老王111'
        },
        {
          name: '老王111'
        },
        {
          name: '老王111'
        },
        {
          name: '老王111'
        }
      ]
    }
  },
  onLoad(options) {
    this.usersList.push({ name: '邀请' })
    console.log(this.usersList)
  },
  methods: {}
}
</script>

<style lang="scss">
.details {
  margin: 0 30rpx;
  .details-top {
    margin-top: 200rpx;
    .top-o {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .o-title {
        width: 200rpx;
        font-size: 40rpx;
        font-weight: 600;
      }
      .o-time {
        width: 300rpx;
        font-size: 20rpx;
        display: flex;
        justify-content: flex-end;
        color: #a2a2a7;
      }
    }
    .top-b {
      margin-top: 20rpx;
      font-size: 30rpx;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .details-users {
    margin-top: 80rpx;
    .users-title {
      display: flex;
      align-items: center;
      .title-left {
        flex: 1;
        font-size: 35rpx;
        font-weight: 600;
      }
      .title-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        color: #a2a2a7;
        font-size: 30rpx;
      }
    }
    .users-list {
      display: grid;
      flex-wrap: wrap;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 120rpx);
      .list-item {
        margin: 20rpx;
        width: 90rpx;
        height: 130rpx;
        display: flex;
        flex-direction: column;
        .item-userImg {
          width: 90rpx;
          height: 100rpx;
          .userImg-img {
            border-radius: 10rpx;
            width: 100%;
            height: 100%;
          }
        }
        .item-userImga {
          width: 90rpx;
          height: 100rpx;
          background-color: #ffe431;
          border-radius: 10rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          .userImga-img {
            width: 50%;
            height: 50%;
          }
        }
        .item-username {
          margin-top: 5rpx;
          text-align: center;
          font-size: 25rpx;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
      }
    }
  }
}
</style>
