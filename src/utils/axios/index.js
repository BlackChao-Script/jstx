/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */

import qs from 'qs'
import axios from 'axios'
import { APIConfig } from './api.config'
/**
 * 取消重复请求
 */
export const RepeatRequestMessage = '重复请求'
// pending [{url: string, cancel: function}]
const Pending = []
const getUrlKey = (config) => {
  const { url, method, params, data } = config
  const str = `${url}?methods=${method}&params=${qs.stringify(params)}&data=${qs.stringify(data)}`
  return str
}
const CancelToken = axios.CancelToken
const RemovePending = (config) => {
  for (const p in Pending) {
    const list = Pending[p]
    if (list.url === getUrlKey(config)) {
      // 执行取消操作
      // list.cancel(RepeatRequestMessage)
      // 从数组中移除记录
      // Pending.splice(p, 1)
    }
  }
}

let loading
let loadingCount = 0
// 打开loading
function startLoading() {
  if (loadingCount === 0) {
    clearTimeout(loading)
    loading = null
    loading = setTimeout(() => {
      uni.showLoading({
        mask: true,
        title: '加载中...'
      })
    }, 500)
  }
  loadingCount++
}

// 关闭loading
function closeLoading() {
  if (loadingCount <= 0) {
    loadingCount = 0
    return
  }
  loadingCount--
  if (loadingCount === 0) {
    clearTimeout(loading)
    loading = null
    uni.hideLoading()
  }
}

export class Api {
  constructor(config = {}) {
    this.api = axios.create(Object.assign({}, APIConfig, config))
    this.api.interceptors.request.use((config) => {
      RemovePending(config)

      config.cancelToken = new CancelToken((c) => {
        Pending.push({ url: getUrlKey(config), cancel: c })
      })

      startLoading()

      return config
    })

    this.apiInterceptorsResponse = this.api.interceptors.response.use(
      (response) => {
        RemovePending(response.config)
        const res = response.data
        const status = res.code

        closeLoading()

        // yapi mock数据 TODO：删除
        if (response.config.url.indexOf('/mock') === 0) {
          return res
        }

        // 文件流
        if (response.config.file && res.type !== 'application/json') {
          return Promise.resolve(res)
        }

        if (status === 401) {
          // 未登录
          uni.setStorageSync('key', '')

          // 跳转登陆页面
          const pages = getCurrentPages()
          const page = pages[pages.length - 1]
          uni.reLaunch({
            url: '/pages/login/index?page=' + page.route
          })
        }

        if (status === 0) {
          return res.result || res.data
        }

        // 文件报错处理
        if (response.config.file && res.type === 'application/json') {
          // 非文件格式转回json处理
          const render = new FileReader()
          render.readAsText(res, 'utf-8')
          render.onload = function() {
            const msg = JSON.parse(render.result).message
            // Message.error(msg || '出错了， 请稍后重试')
          }
        } else {
          // Message.error(res.message || '出错了， 请稍后重试')
        }

        if (status > 0) {
          return res
        }
      },
      (error) => {
        error.message !== RepeatRequestMessage &&
          uni.showToast({
            title: error.message,
            icon: 'error',
            duration: 5 * 1000
          })

        closeLoading()
        return Promise.reject(error)
      }
    )
  }

  getSendData(data) {
    const key = process.env.VUE_APP_TXKEY
    const sendData = Object.assign({}, data, { key })
    return sendData
  }

  getConfig(config = {}) {
    const session = uni.getStorageSync('key')
    config.headers
      ? (config.headers.ys_sso_sessionid = session)
      : (config = { headers: { ys_sso_sessionid: session }, ...config })

    // 商家服务没有路ys_sso_sessionid
    // if (process.env.VUE_APP_MODULE === 'merchant') {
    //   let loginType = '3'
    //   // #ifdef MP-WEIXIN
    //   loginType = '2'
    //   // #endif

    //   const appId = 'ww0c72246427c0f340'
    //   config.headers.wechat_token = `${loginType}|${appId}|${session}`
    // }
    return config
  }

  request(config) {
    return this.api.request({
      ...config,
      ...this.getConfig(config)
    })
  }

  get(url, data = {}, config) {
    return this.api.get(`${url}?${qs.stringify(this.getSendData(data))}`, this.getConfig(config))
  }

  post(url, data, config) {
    const newConfig = this.getConfig(config)
    let newData = this.getSendData(data)

    if (newConfig.import) {
      // 导入处理
      const formData = new FormData()
      for (const key in newData) {
        newData[key] && formData.append(key, newData[key])
      }
      newData = formData
      newConfig.headers['content-type'] = 'multipart/form-data'
    }
    console.log(newData)
    return this.api.post(url, newData, newConfig)
  }
}
