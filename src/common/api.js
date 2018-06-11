/*
 * @Author: liu 
 * @Date: 2018-05-04 15:49:52 
 * @Last Modified by: nicky
 * @Last Modified time: 2018-06-09 18:23:01
 */

import axios from 'axios'
import Url from './url'

let api = {};

//获取用户信息
api.getUserInfo = function (path) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + path).then(res => {
      if (res.status == 200) {
        console.log(res.data)
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

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

//搜索朋友
api.getFriendList = function (cursor) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + '/api/searchCandidates?cursor=' + cursor).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//请求加好友
api.makeFriend = function (xid) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + "/api/makeFriend?xid=" + xid).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//拉取好友事件
api.loadFriendEvts = function (cursor) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + "/api/loadFriendEvts?cursor=" + cursor).then(res => {
      if (res.status == 200) {
        console.log(res.data)
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//回赞事件
api.giveBackThumb = function (type, flag) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/auditFriend?evtID=${type}&agree=${flag}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//获取好友列表
api.loadFriends = function (cursor) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/loadFriends?cursor=${cursor}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//发送聊天消息
api.postFriendMess = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + "/api/sendChatMsg&tk=ARB154f2FviEbekQN2O_abdN-CYKDYK6SBGEbgPkZdv3FSYPaBzcV8TCrKqO6rWWBXkZUA==", param).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//根据websocket返回来的信息拉取个人的聊天信息列表
api.getFriendMessList = function (cursor, who) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadChatMsg?cursor=${cursor}&who=${who}&tk=ARB154f2FviEbekQN2O_abdN-CYKDYK6SBGEbgPkZdv3FSYPaBzcV8TCrKqO6rWWBXkZUA==`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//标记用户已读
api.sendMsgReaded = function (who) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/setMsgRead?who=${who}&tk=ARB154f2FviEbekQN2O_abdN-CYKDYK6SBGEbgPkZdv3FSYPaBzcV8TCrKqO6rWWBXkZUA==`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}


export default api
