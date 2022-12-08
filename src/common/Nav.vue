<template>
  <view class="nav">
    <view class="nav-left">
      <view class="left-box"><slot name="left"></slot></view>
    </view>
    <view class="nav-mid">
      <slot name="mid"></slot>
    </view>
    <view class="nav-right">
      <view class="right-box"> <slot name="right"></slot></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {
  },
  methods: {}
}
</script>

<style lang="scss">
.nav {
  border-bottom: 1rpx solid #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 75rpx;
  position: -webkit-sticky;
  position: sticky;
  top: var(--window-top);
  z-index: 999;
  background-color: #ffff;
  .nav-left {
    flex: 1;
    .left-box {
      margin-left: 10rpx;
      width: 50%;
      display: flex;
      justify-content: center;
    }
  }
  .nav-mid {
    flex: 1;
  }
  .nav-right {
    flex: 1;
    .right-box {
      width: 50%;
      float: right;
      margin-right: 10rpx;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
