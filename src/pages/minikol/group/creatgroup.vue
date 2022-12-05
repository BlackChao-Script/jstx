<template>
  <view class="creatgroup">
    <Nav>
      <template v-slot:left>
        <view>取消</view>
      </template>
      <template v-slot:mid>
        <view>创建群聊</view>
      </template>
    </Nav>
    <view class="creatgroup-box">
      <view class="box-icon"></view>
      <view class="box-input"></view>
    </view>
    <view class="creatgroup-name"></view>
    <view class="creatgroup-list">
      <view class="list-item">
        <view class="item-left"></view>
        <view class="item-right"></view>
      </view>
    </view>
    <view class="creatgroup-btn"></view>
  </view>
</template>

<script>
import Nav from '@common/nav.vue'

export default {
  components: {
    Nav
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss">
.creatgroup{
    .creatgroup-box{
        .box-icon{

        }
        .box-input{

        }
    }
    .creatgroup-name{

    }
    .creatgroup-list{
        .list-item{
            .item-left{

            }
            .item-right{
                
            }
        }
    }
    .creatgroup-btn{
        
    }
}
</style>
