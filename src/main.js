/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import App from './App'
import Vue from 'vue'
import store from './store'
// #ifdef H5
const vconsole = require('vconsole')
Vue.prototype.$vconsole = new vconsole() // 使用vconsole
// #endif

// main.js，注意要在use方法之后执行
import uView from 'uview-ui'
Vue.use(uView)
uni.$u.config.unit = 'rpx'
// mixins
import mixin from './mixins/mixins'
Vue.mixin(mixin)
// 引入时间格式化处理
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs
// api
import * as API from './api'
Vue.prototype.$API = { ...API }

// 全局配置
import config from './config.js'
Vue.prototype.$CONFIG = { ...config }
Vue.prototype.$store = store
const app = new Vue({
  ...App,
  store
})
app.$mount()
