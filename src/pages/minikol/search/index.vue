<template>
  <view class="search">
    <view class="search-header">
      <view class="header-search">
        <u-search
          height="60"
          placeholder="请输入想搜索的内容"
          v-model="userKeyword"
          :showAction="false"
          @search="searchUser"
        ></u-search>
      </view>
      <view class="header-text" @click="toBack">取消</view>
    </view>
    <view class="search-content" v-if="showSearchContent">
      <view class="content-username">用户</view>
      <view class="content-userlist" v-for="(item, index) in resObj.user" :key="index">
        <view class="userlist-img">
          <u-avatar :src="item.avatar" shape="square" size="90"></u-avatar>
        </view>
        <view class="userlist-text">{{ item.nickname }}</view>
        <view class="userlist-btn">
          <!-- <view class="btn">发消息</view> -->
          <view class="btna" @click="spanAddUser(item.id)">加好友</view>
        </view>
      </view>
      <u-empty
        v-if="resObj.user.length == 0"
        mode="search"
        textSize="30"
        iconSize="100"
        iconColor="#ffe431"
      >
      </u-empty>
      <view class="content-username">群组</view>
      <view class="content-userlist" v-for="(item, index) in resObj.group" :key="item.group_name">
        <view class="userlist-img">
          <u-avatar :src="item.group_cover" shape="square" size="90"></u-avatar>
        </view>
        <view class="userlist-text">{{ item.group_name }}</view>
        <view class="userlist-btn">
          <!-- <view class="btn">发消息</view> -->
          <view class="btna">加群聊</view>
        </view>
      </view>
      <u-empty
        v-if="resObj.group.length == 0"
        mode="search"
        textSize="30"
        iconSize="100"
        iconColor="#ffe431"
      >
      </u-empty>
    </view>
    <u-empty
      style="margin-top: 450rpx"
      v-if="showEmpty"
      mode="search"
      textSize="30"
      iconSize="100"
      iconColor="#ffe431"
    >
    </u-empty>

    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { search } from '@/api/index.js'

export default {
  data() {
    return {
      userKeyword: '',
      showSearchContent: false,
      showEmpty: false,
      resObj: {}
    }
  },

  methods: {
    toBack() {
      this.userKeyword = ''
      this.toBackPage()
    },
    async searchUser() {
      const data = {
        userKeyword: this.userKeyword
      }
      const res = await search({ data })
      this.resObj = res.resObj
      // console.log(this.resObj)
      if (this.resObj.group.length == 0 && this.resObj.user.length == 0) {
        this.showEmpty = true
        this.showSearchContent = false
      } else {
        this.showEmpty = false
        this.showSearchContent = true
      }
    },
    async spanAddUser(friend_id) {
      const user_id = this.$store.state.id
      if (friend_id === user_id) {
        this.$refs.uToast.show({
          type: 'default',
          message: '不能添加自己哦！'
        })
        return
      }
      this.$u.route({
        url: '/pages/minikol/user/adduser',
        params: {
          user_id: friend_id
        }
      })
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
      margin-top: 10rpx;
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
      font-size: 40rpx;
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
