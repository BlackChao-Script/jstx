<template>
  <view class="modify">
    <view style="border-bottom: 1rpx solid #ededed">
      <Nav>
        <template v-slot:left>
          <view @click="toBack">取消</view>
        </template>
        <template v-slot:mid>
          <view>修改群聊</view>
        </template>
        <template v-slot:right>
          <view style="color: #4aaaff">确定</view>
        </template>
      </Nav>
        <textarea class="box-messageBoard" v-model="value1" placeholder="请输入内容"></textarea>
    </view>
  </view>
</template>

<script>
import Nav from '@/common/nav.vue'

export default {
  components: {
    Nav
  },
  data() {
    return {
      value1: ''
    }
  },

  methods: {
    toBack(){
        this.toBackPage()
    }
    
  }
}
</script>

<style lang="scss">
.box-messageBoard {
  margin: 50rpx auto;
  padding: 10rpx;
  width: 85%;
  border-radius: 20rpx;
  height: 400rpx;
  background-color: #f3f4f6;
}
</style>
