export default {
  data() {
    return {}
  },
  methods: {
    /**
     * @description:  页面跳转
     * @param {*} url:跳转页面（必填）
     * @param {*} options:跳转配置（非必填）{type:xxx, ...{其他uni跳转参数}}
     *      type可选值:redirectTo,reLaunch,switchTab等  详情：https://uniapp.dcloud.io/api/router?id=navigateto 的路由与页面跳追安
     */
    toNextPage(url, options) {
      // 没传配置 默认navigatTo跳转
      if (!options) {
        console.log(url)
        uni.navigateTo({
          url,
          ...options
        })
        return
      }
      // 其他跳转定义
      uni[options.type]({
        ...options,
        url: url
      })
    },
    /**
     * @description:  返回上一级页面
     * @param {*} 入参
     * @return {*} 出参
     */
    toBackPage(num = 1) {
      uni.navigateBack({
        delta: num
      })
    },
    /**
     * @description:  处理聊天时间
     * @param {*} e
     * @return {*} 时间
     */
    dateTime(e, applicationTime) {
      let old = new Date(e)
      let now = new Date()
      // 获取old的具体时间
      let d = old.getTime()
      let h = old.getHours()
      let m = old.getMinutes()
      let Y = old.getFullYear()
      let M = old.getMonth() + 1
      let D = old.getDate()
      // 获取now的具体时间
      let nd = now.getTime()
      let nh = now.getHours()
      let nm = now.getMinutes()
      let nY = now.getFullYear()
      let nM = now.getMonth() + 1
      let nD = now.getDate()

      // 当天时间
      if (D === nD && M === nM && Y === nY) {
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        return h + ':' + m
      }
      // 昨天时间
      if (D + 1 === nD && M === nM && Y === nY) {
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        return '昨天' + h + ':' + m
      } else if (Y === nY) {
        // 今年
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        if (applicationTime) {
          return M + '月' + D + '日'
        }
        return M + '月' + D + '日' + h + ':' + m
      } else {
        // 大于今年
        if (h < 10) {
          h = '0' + h
        }
        if (m < 10) {
          m = '0' + m
        }
        if (applicationTime) {
          return Y + '' + M + '月'
        }
        return Y + '' + M + '月' + D + '日' + h + ':' + m
      }
    },
    /**
     * @description:  间隔时间差
     * @param {*} old:过去时间
     * @param {*} now:现在时间
     * @return {*} 时间
     */
    spacTime(old, now) {
      old = new Date(old)
      now = new Date(now)
      let told = old.getTime()
      let tnow = now.getTime()
      if (told - tnow > 1000 * 60 * 5) {
        return now
      } else {
        return ''
      }
    }
  }
}
