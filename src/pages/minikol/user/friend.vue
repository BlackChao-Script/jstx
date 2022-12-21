<template>
  <view class="friend">
    <view class="content-title" v-if="recentlyData.length !== 0">最近</view>
    <view class="content-userlist" v-for="item in recentlyData" :key="item.id">
      <view class="userlist-img">
        <u-avatar :src="item.friend_data.avatar" shape="square" size="90"></u-avatar>
      </view>
      <view class="userlist-text">{{ item.friend_data.nickname }}</view>
      <view class="userlist-btn">
        <view class="btn" v-if="item.friend_state == 0">已接受</view>
        <view class="btna" v-else @click="clickChangFriend(item.user_id)">接受</view>
      </view>
    </view>

    <view class="content-title" v-if="threeData.length !== 0">三天前</view>
    <view class="content-userlist" v-for="item in threeData" :key="item.id">
      <view class="userlist-img">
        <u-avatar :src="item.friend_data.avatar" shape="square" size="90"></u-avatar>
      </view>
      <view class="userlist-text">{{ item.friend_data.nickname }}</view>
      <view class="userlist-btn">
        <view class="btn" v-if="item.friend_state == 0">已接受</view>
        <view class="btna" v-else @click="clickChangFriend(item.user_id)">接受</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFriendApply, changFriend } from '@/api/index'

export default {
  data() {
    return {
      recentlyData: [],
      threeData: [],
      timeText: ''
    }
  },
  onLoad() {
    this.getData()
  },
  methods: {
    async getData(user_id) {
      const data = {
        user_id: this.$store.state.id
      }
      const res = await getFriendApply({ data, custom: { auth: true } })
      for (let i of res) {
        if (i.user_id == this.$store.state.id) return
        this.getTime(i.application_time, i, user_id)
      }
    },
    getTime(time, i, user_id) {
      const now = new Date()
      const applicationTime = new Date(time)
      let tnow = now.getTime()
      let tapplicationTime = applicationTime.getTime()
      if (tnow - tapplicationTime > 3 * 24 * 60 * 60 * 1000) {
        const bol = this.threeData.some((item) => item.id == i.id)
        if (!bol) {
          this.threeData.push(i)
        } else {
          for (let i of this.threeData) {
            if (i.user_id === user_id) {
              i.friend_state = 0
            }
          }
        }
      } else {
        const bol = this.recentlyData.some((item) => item.id == i.id)
        if (!bol) {
          this.recentlyData.push(i)
        } else {
          for (let i of this.recentlyData) {
            if (i.user_id === user_id) {
              i.friend_state = 0
            }
          }
        }
      }
    },
    async clickChangFriend(user_id) {
      const params = {
        friend_state: 0
      }
      await changFriend(user_id, params, { custom: { auth: true } })
      uni.$u.toast('已接受')
      this.getData(user_id)
    }
  }
}
</script>

<style lang="scss">
.friend {
  .content-title {
    font-size: 35rpx;
    padding: 20rpx;
  }
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
