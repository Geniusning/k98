/*
 * @Author: liu 
 * @Date: 2018-05-04 15:49:52 
 * @Last Modified by: nicky
 * @Last Modified time: 2018-07-16 11:11:02
 */

import axios from 'axios'
import Url from './url'

let api = {};

//获取用户信息
api.getUserInfo = function (path) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + path).then(res => {
      if (res.status == 200) {
        // console.log(res.data)
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
    // 
    axios.post(Url.commonUrl + "/api/sendChatMsg?tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==", param).then((res) => {
      console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//发送聊天图片
api.postFriendPic = function (openId, fileName, param) {
  return new Promise((resolve, reject) => {
    // 
    axios.post(Url.commonUrl + `/api/sendImage?to=${openId}&fileName=${fileName}&tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`, param).then((res) => {
      // console.log(res)
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
    // 
    axios.get(Url.commonUrl + `/api/loadChatMsg?cursor=${cursor}&who=${who}&tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`)
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
    // 
    axios.get(Url.commonUrl + `/api/setMsgRead?who=${who}&tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//修改个人信息头像
api.updateAvatar = function (fileName, param) {
  // 
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/updatePortrait?fileName=${fileName}&tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`, param)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//保存个人信息修改
api.savePersonalInfo = function (param) {
  // 
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/updateUserInfo?tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`, param)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//获取场内场外人数
api.getInOutNum = function () {
  // 
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadInOutFieldNumber?tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//拉取场内候选人
api.getLoadInsideCandidates = function (cursor) {
  // 
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadInsideCandidates?cursor=${cursor}&tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//拉取场外候选人
api.getLoadOutsideCandidates = function (cursor) {
  // 
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadOutsideCandidates?cursor=${cursor}&tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//创建二维码
api.createQrcode = function(){
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/createQrcode?tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//拉取已经创建过的二维码
api.loadAllQrcode = function(){
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadAllQrcode?tk=JfRYaxTRL_kAqhRA9p-YTte8WnMsxj9O5Ov6IxplAyyGJMjOZCg0fE9tNXl5tTqNWZZ9gA==`)
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
