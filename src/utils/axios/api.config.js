/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import qs from 'qs'
import config from '../../config'
import axiosAdapterUniapp from 'axios-adapter-uniapp'

export const APIConfig = {
  withCredentials: true, // 跨域请求时是否需要使用凭证
  timeout: 30000,
  baseURL: config.BASE_URL,
  adapter: axiosAdapterUniapp,
  headers: {
    common: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  },
  paramsSerializer: (params) => qs.stringify(params, { indices: false })
}
