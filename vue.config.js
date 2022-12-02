/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
var path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  transpileDependencies: ['uview-ui'],
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@common', resolve('src/common'))
      .set('@components', resolve('src/components'))
      .set('@orderConfig', resolve('src/orderConfig'))
  }
}
