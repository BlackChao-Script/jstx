/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
const config = {
  // 请求地址
  BASE_URL: '/',
  // 文件地址
  BASE_FILE_URL: '/',

  // 小程序appId
  MP_APPID: 'wx250525aac0f34dfc' // dev测试商家服务
  // MP_APPID: 'wx7a4cac196bf5a385' // 顺联商户宝
}
// #ifdef MP-WEIXIN
config.BASE_URL = 'https://pmsdev-g.yueworld.cn/'
config.BASE_FILE_URL = 'https://pmsdev-g.yueworld.cn/'

// config.BASE_URL = 'https://ys.efssl.com/'
// config.BASE_FILE_URL = 'https://ys.efssl.com/'
// #endif

// if (process.env.NODE_ENV === 'production') {
//   config.BASE_URL = ''
// }

export default config
