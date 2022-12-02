/*
 * @Description: 全局方法
 * @Author: lairey
 * @LastEditors: fhj
 */
import { publishApi } from '@/api'

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
     * @description: 金额保留两位小数
     * @param {*}
     * @return {*}
     */
    getNum(value) {
      let realVal = parseFloat(value).toFixed(2)
      if (value === null) {
        realVal = 0
      }
      return realVal
    },
    /**
     * 金额用，隔开（千分位加逗号）
     * @param {string | number} num
     * @return { string } example:100,999,789.12313
     */
    numFormat(num) {
      const newNumber = `${num}`
      const [integer, decimal] = newNumber.split('.')
      let formatterNumber = ''
      formatterNumber = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (decimal) {
        formatterNumber += `.${decimal}`
      }
      return formatterNumber
    },
    /**
     * 金额用，隔开（千分位加逗号,带2位小数）
     * @param {string | number} num
     * @return { string } example:100,999,789.12313
     */
    numFormat2(num) {
      num = parseFloat(num).toFixed(2)
      if (num === null) {
        num = 0
      }
      const newNumber = `${num}`
      const [integer, decimal] = newNumber.split('.')
      let formatterNumber = ''
      formatterNumber = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (decimal) {
        formatterNumber += `.${decimal}`
      }
      return formatterNumber
    },
    /**
     * @description:  数字转中文
     * @param {*} num
     * @return {*} 中文数字
     */
    toChineseNumber(n) {
      if (!Number.isInteger(n) && n < 0) {
        throw Error('请输入自然数')
      }
      const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      const positions = [
        '',
        '十',
        '百',
        '千',
        '万',
        '十万',
        '百万',
        '千万',
        '亿',
        '十亿',
        '百亿',
        '千亿'
      ]
      const charArray = String(n).split('')
      let result = ''
      let prevIsZero = false
      // 处理0  deal zero
      for (let i = 0; i < charArray.length; i++) {
        const ch = charArray[i]
        if (ch !== '0' && !prevIsZero) {
          result += digits[parseInt(ch)] + positions[charArray.length - i - 1]
        } else if (ch === '0') {
          prevIsZero = true
        } else if (ch !== '0' && prevIsZero) {
          result += '零' + digits[parseInt(ch)] + positions[charArray.length - i - 1]
        }
      }
      // 处理十 deal ten
      if (n < 100) {
        result = result.replace('一十', '十')
      }
      return result
    }
  }
}
