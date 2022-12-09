import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    'token': ''
  },
  mutations: {
    updateToken(state, str) {
      state.token = str
    },
    remdateToken(state) {
      state.token = ''
    }
  },
  plugins: [
    createPersistedState({
      key: 'app_config_data', // 状态保存到本地的 key
      paths: ['token'],
      storage: {
        // 存储方式定义
        getItem: (key) => uni.getStorageSync(key), // 获取
        setItem: (key, value) => uni.setStorageSync(key, value), // 存储
        removeItem: (key) => uni.removeStorageSync(key) // 删除
      }
    })
  ]
})
export default store
