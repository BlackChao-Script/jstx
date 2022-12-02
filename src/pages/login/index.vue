<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
-->
<template>
  <view class="page-content">
      登录页
  </view>
</template>

<script>
export default {
  data() {
    return {
    
    }
  },
  onLoad(options) {
   
  },
  methods: {
    // 获取url参数
    GetQueryString(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = decodeURI(window.location.search.substr(1)).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
  }
}
</script>
