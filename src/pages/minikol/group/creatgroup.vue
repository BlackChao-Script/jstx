<template>
  <view class="creatgroup">
    <Nav>
      <template v-slot:left>
        <view @click="toBack" style="font-size: 30rpx">取消</view>
      </template>
      <template v-slot:mid>
        <view style="font-size: 30rpx">创建群聊</view>
      </template>
    </Nav>
    <view class="creatgroup-box">
      <view class="box-icon">
        <image class="icon-img" :src="boxIcon"></image>
      </view>
      <view class="box-input">
        <u--input
          placeholder="请输入群昵称"
          border="surround"
          inputAlign="center"
          shape="circle"
          v-model="groupnamevalue"
        ></u--input>
      </view>
    </view>
    <view class="creatgroup-name" v-if="friendData.length !== 0">用户</view>
    <view class="creatgroup-list">
      <u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
        <view class="list-item" v-for="(item, index) in friendData" :key="index">
          <view class="item-left">
            <u-checkbox
              shape="circle"
              inactiveColor="#ffe431"
              activeColor="#ffe431"
              iconColor="#000"
              size="30rpx"
              :key="index"
              :name="item.id"
            >
            </u-checkbox>
          </view>
          <view class="item-right">
            <view class="right-userimg">
              <image class="userimg-img" :src="item.avatar"></image>
            </view>
            <view class="right-username">{{ item.nickname }}</view>
          </view>
        </view>
      </u-checkbox-group>
    </view>
    <view class="creatgroup-btn">
      <view class="btn" @click="clickCreateGroup">
        {{ `创建${checkboxValue1.length > 0 ? `(${checkboxValue1.length})` : ''}` }}
      </view>
    </view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'

import { getFriendApply, createGroup } from '@/api/index'

export default {
  components: {
    Nav
  },
  data() {
    return {
      boxIcon: require('@/assets/img/群聊.png'),
      groupnamevalue: '',
      checkboxValue1: [],
      friendData: []
    }
  },
  onLoad() {
    this.getFriendData()
  },

  methods: {
    checkboxChange(n) {
      console.log('change', n)
    },
    toBack() {
      this.toBackPage()
    },
    async getFriendData() {
      const user_id = this.$store.state.id
      const data = {
        user_id
      }
      const res = await getFriendApply({ data, custom: { auth: true } })
      for (let i of res) {
        if (i.friend_id.id == user_id) {
          this.friendData.push(i.friend_data)
        } else {
          this.friendData.push(i.friend_id)
        }
      }
    },
    async clickCreateGroup() {
      if (this.groupnamevalue == '' && this.checkboxValue1.length == 0) {
        uni.$u.toast('请先填写群名与选择群成员')
        return
      }
      const params = {
        groupmast_id: this.$store.state.id,
        group_name: this.groupnamevalue,
        group_ids: this.checkboxValue1
      }
      await createGroup(params)
      uni.$u.toast('创建成功')
      setTimeout(() => {
        this.toNextPage('/pages/minikol/group/list')
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
.creatgroup {
  .creatgroup-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30rpx 30rpx;
    height: 300rpx;
    .box-icon {
      width: 150rpx;
      height: 150rpx;
      box-shadow: 1rpx 10rpx 10rpx rgba(0, 0, 0, 0.2);
      border-radius: 30rpx;
      background-color: #ffe431;
      .icon-img {
        width: 100%;
        height: 100%;
      }
    }
    .box-input {
      width: 700rpx;
      margin-top: 40rpx;
    }
  }
  .creatgroup-name {
    margin-left: 30rpx;
    font-weight: 600;
  }
  .creatgroup-list {
    .list-item {
      display: flex;
      align-items: center;
      margin: 20rpx;
      height: 100rpx;
      .item-left {
        width: 100rpx;
        display: flex;
        justify-content: center;
      }
      .item-right {
        flex: 1;
        display: flex;
        align-items: center;
        .right-userimg {
          width: 100rpx;
          height: 100rpx;
          .userimg-img {
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
          }
        }
        .right-username {
          margin-left: 20rpx;
          font-size: 30rpx;
        }
      }
    }
  }
  .creatgroup-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 130rpx;
    border-top: 5rpx solid #e8e8e8;
    background-color: #fff;
    .btn {
      margin: 0 auto;
      width: 85%;
      height: 80rpx;
      display: flex;
      margin-top: 10rpx;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      background-color: #ffe431;
    }
  }
}
</style>
