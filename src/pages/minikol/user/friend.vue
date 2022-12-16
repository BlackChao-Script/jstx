<template>
  <view class="friend">
    <view class="content-userlist" v-for="(item, index) in friendApplyData" :key="index">
      <view class="userlist-img">
        <u-avatar :src="item.friend_data.avatar" shape="square" size="90"></u-avatar>
      </view>
      <view class="userlist-text">{{item.friend_data.nickname}}</view>
      <view class="userlist-btn">
        <!-- <view class="btn">已添加</view> -->
        <view class="btna">接受</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFriendApply } from '@/api/index'

export default {
  data() {
    return {
      friendApplyData: []
    }
  },
  async onLoad() {
    const data = {
      user_id: this.$store.state.id
    }
    this.friendApplyData = await getFriendApply({ data })
  },
  methods: {}
}
</script>

<style lang="scss">
.friend {
  .content-userlist {
    display: flex;
    height: 120rpx;
    .userlist-img {
      width: 120rpx;
      display: flex;
      align-items: center;
      margin-left: 20rpx;
    }
    .userlist-text {
      flex: 1;
      font-size: 35rpx;
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
        background-color: #f6f5ef;
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
</style>
