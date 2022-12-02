/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import baseUrl from '../common/config/config.js'

// 封装请求
const baseRequest = (url, method, data) => {
  const token = uni.getStorageInfoSync('token')
  const baseDefaultData = {
    url: baseUrl.ipUrl + url,
    method,
    data,
    header:
      method == 'get'
        ? {
            token: token,
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
          }
        : {
            token: token,
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
    dataType: 'json'
  }
  const promise = new Promise(function(resolve, reject) {
    uni
      .request(baseDefaultData)
      .then((response) => {
        const res = response[1].data
        resolve(res)
      })
      .catch((response) => {
        reject(response)
      })
  })
  return promise
}
export default {
  baseRequest
}
