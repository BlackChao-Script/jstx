<template>
  <view class="my">
    <u-cell-group :border="false">
      <u-cell class="m">
        <view slot="title" class="my-title">
          <view class="title-text">头像</view>
          <u-avatar :src="userData.avatar" shape="square" size="100"></u-avatar>
        </view>
      </u-cell>
      <u-cell class="m">
        <view slot="title" class="my-title">
          <view class="title-text">注册</view>
          <u--text
            :lines="1"
            :text="this.userData.register_time"
            color="#a8a9ad"
            size="27"
          ></u--text>
        </view>
      </u-cell>
      <u-cell class="m">
        <view slot="title" class="my-title">
          <view class="title-text">邮箱</view>
          <u--text :lines="1" :text="this.userData.mail" color="#a8a9ad" size="27"></u--text>
        </view>
      </u-cell>
    </u-cell-group>
    <view class="my-from">
      <u--form labelPosition="left" :model="userData" ref="form1" labelWidth="50px">
        <u-form-item label="昵称" borderBottom ref="item1">
          <u--input
            border="surround"
            v-model="userData.nickname"
            style="background-color: #f5f7fa"
          ></u--input>
        </u-form-item>
        <u-form-item label="签名" prop="userInfo.name" borderBottom ref="item1">
          <textarea class="from-signature" v-model="userData.signature"></textarea>
        </u-form-item>
        <u-form-item label="性别" borderBottom ref="item1" @click="showSex = true">
          <u--input
            disabled
            v-model="userData.sex"
            disabledColor="#ffffff"
            placeholder="请选择性别"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </u--form>

      <u-action-sheet
        :show="showSex"
        :actions="actions"
        title="请选择性别"
        @close="showSex = false"
        @select="sexSelect"
      >
      </u-action-sheet>
    </view>
    <view class="my-next" style="color: #ffe431" @click="modifyUserData">保存修改</view>
    <view class="my-next" style="color: #ff5d5b" @click="clickNext">退出账号</view>
  </view>
</template>

<script>
import { getUserInfo, modifyUser } from '@/api/index'

export default {
  data() {
    return {
      userData: {},
      userModel: {},
      showSex: false,
      actions: [
        {
          name: '男'
        },
        {
          name: '女'
        }
      ]
    }
  },
  async onLoad() {
    const data = {
      user_id: this.$store.state.id
    }
    this.userData = await getUserInfo({ data })
    this.userData.register_time = uni.$u.timeFormat(this.timestamp, 'yyyy-mm-dd hh:MM:ss');
    console.log(this.userData.register_time)
  },

  methods: {
    sexSelect(e) {
      this.userData.sex = e.name
    },
    async modifyUserData() {
      const params = {
        nickname: this.userData.nickname,
        signature: this.userData.signature,
        sex: this.userData.sex
      }
      try {
        await modifyUser(this.$store.state.id, params)
        uni.$u.toast('修改成功')
      } catch (err) {
        uni.$u.toast('修改失败')
      }
    },
    clickNext() {
      this.$store.commit('remdateToken')
      this.$store.commit('remdateId')
      this.toNextPage('/pages/minikol/login/index')
    }
  }
}
</script>

<style lang="scss">
.my {
  .m {
    padding: 10rpx;
    .my-title {
      display: flex;
      align-items: center;
      .title-text {
        margin-left: -20rpx;
        margin-right: 30rpx;
        font-size: 30rpx;
      }
    }
  }
  .my-next {
    width: 150rpx;
    margin: 50rpx auto;
  }
  .my-from {
    padding: 20rpx;
    .from-signature {
      background-color: #f5f7fa;
      padding: 10rpx;
      height: 100rpx;
      width: 590rpx;
      border: 1rpx solid #dadbde;
    }
  }
}
</style>
