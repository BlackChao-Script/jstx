<template>
  <view class="addressbook">
    <u-index-list
      class="addressbook-list"
      :index-list="indexList"
      customNavHeight="-10000"
      :sticky="false"
    >
      <view class="list-cell">
        <view class="cell-icon"
          ><u-avatar
            icon="man-add"
            shape="square"
            fontSize="46"
            size="80"
            bg-color="#ffe431"
          ></u-avatar
        ></view>
        <view class="cell-text">新的朋友</view>
      </view>
      <view class="list-cell">
        <view class="cell-icon"
          ><u-avatar
            icon="grid"
            shape="square"
            fontSize="46"
            size="80"
            bg-color="#ffe431"
          ></u-avatar
        ></view>
        <view class="cell-text">群聊</view>
      </view>
      <view v-if="FriendDataList.length !== 0">
        <template v-for="(item, index) in FriendDataList">
          <u-index-item>
            <u-index-anchor :text="indexList[index]"></u-index-anchor>
            <view class="list-cell" v-for="(v, i) in item" :key="i">
              <view class="cell-img">
                <u-avatar :src="v.avatar" shape="square" size="80"></u-avatar>
              </view>
              <view class="cell-text">{{ v.nickname }}</view>
            </view>
          </u-index-item>
        </template>
      </view>
      <u-empty v-else mode="list" style="margin-top: 100rpx"> </u-empty>
    </u-index-list>
  </view>
</template>

<script>
import { pinyin } from 'pinyin-pro'

import { getFriendApply } from '@/api/index'

export default {
  data() {
    return {
      FriendDataList: [],
      indexList: []
    }
  },
  onLoad() {
    this.getFriendData()
  },
  methods: {
    async getFriendData() {
      const data = {
        user_id: this.$store.state.id
      }
      const res = await getFriendApply({ data })
      res.sort((a, b) => {
        if (
          pinyin(a.friend_data.nickname, { pattern: 'first' }) <
          pinyin(b.friend_data.nickname, { pattern: 'first' })
        ) {
          return -1
        }

        if (
          pinyin(a.friend_data.nickname, { pattern: 'first' }) >
          pinyin(b.friend_data.nickname, { pattern: 'first' })
        ) {
          return 1
        }
        return 0
      })
      for (let i of res) {
        if (i.friend_state === 0) {
          let fastName = []
          if (i.user_id == this.$store.state.id) {
            fastName = pinyin(i.friend_id.nickname[0], { pattern: 'first' })
          } else {
            fastName = pinyin(i.friend_data.nickname[0], { pattern: 'first' })
          }
          if (!this.indexList.includes(fastName)) {
            this.indexList.push(fastName)
            if (i.user_id == this.$store.state.id) {
              this.FriendDataList.push([i.friend_id])
            } else {
              this.FriendDataList.push([i.friend_data])
            }
          } else {
            let item = []
            if (i.user_id == this.$store.state.id) {
              item = i.friend_id
            } else {
              item = i.friend_data
            }
            for (let k in this.FriendDataList) {
              for (let j in this.FriendDataList[k]) {
                if (
                  pinyin(this.FriendDataList[k][j].nickname[0], { pattern: 'first' }) === fastName
                ) {
                  this.FriendDataList[k].push(item)
                }
              }
            }
          }
        }
      }
      // console.log(res)
      // console.log(this.FriendDataList)
    }
  }
}
</script>

<style lang="scss">
.addressbook {
  .addressbook-list {
    .list-cell {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100rpx;
      padding: 10rpx 24rpx;
      .cell-text {
        margin-left: 20rpx;
        font-size: 30rpx;
      }
    }
  }
}
</style>
