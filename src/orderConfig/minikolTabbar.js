/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import * as API from '../api'
const tabbarList = async function () {
  return [
    {
      text: '首页',
      iconType: 'home',
      iconTypes: 'home-o',
      iconPath: '/pages/minikol/index/index'
    },
    {
      text: '我的',
      iconType: 'my',
      iconTypes: 'my-o',
      iconPath: '/pages/minikol/my/index'
    },
    {
      text: '注册',
      iconType: 'register',
      iconTypes: 'register-o',
      iconPath: '/pages/minikol/register/index'
    }
  ]
}

export default tabbarList
