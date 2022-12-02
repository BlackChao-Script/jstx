/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Descripttion: 公用接口
 */
import { Api } from '@/utils/axios'

export class PublishApi extends Api {
  // api示例
  userLogin = (res) => {
    return this.post('url', res)
  }

}

export const publishApi = new PublishApi()

