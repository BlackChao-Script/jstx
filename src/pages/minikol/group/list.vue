<template>
  <view class="list">
    <view class="list-box" v-for="item in groupData" :key="item.id">
      <view class="box-img box-img-user">
        <u-avatar :src="item.group_data.group_cover" shape="square" size="80"></u-avatar>
      </view>
      <view class="box-content">
        <view class="content-title">{{ item.group_data.group_name }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getGroup } from '@/api/index'

export default {
  data() {
    return {
      groupData: []
    }
  },
  onLoad() {
    this.getGroupData()
  },

  methods: {
    async getGroupData() {
      const data = {
        user_id: this.$store.state.id
      }
      const res = await getGroup({ data, custom: { auth: true } })
      this.groupData = res
    }
  }
}
</script>

<style lang="scss">
.list {
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
    }
  }
}
</style>
