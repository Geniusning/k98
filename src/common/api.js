/*
 * @Author: liu 
 * @Date: 2018-05-04 15:49:52 
 * @Last Modified by: nicky
 * @Last Modified time: 2018-05-04 16:03:21
 */

import axios from 'axios'
import Url from './url'
import jsonp from './jsonp'
import { options } from './config'

let api = {};

//获取用户信息
api.getUserInfo = function (path) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + path).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
// export function getUserInfo() {
//   const url = Url.commonUrl + "/api/loadUserInfo";
//   const data = {};
//   return jsonp(url, data, options)
// }

// 获取jssdk签名
api.getJssdkInfo = function (path) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + path).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}


export default api
