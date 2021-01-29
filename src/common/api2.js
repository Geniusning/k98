/*
 * @Author: liuning
 * @Date: 2020-05-04 14:46:04
 * @Last Modified by: liuning
 * @Last Modified time: 2021-01-25 15:11:32
 */
import axios from 'axios'
import Url from './config'
// // 定义一个缓存池用来缓存数据
// let cache = {}
// const EXPIRE_TIME = 60000
// // 利用axios的cancelToken来取消请求
// const CancelToken = axios.CancelToken
axios.interceptors.request.use(
  config => {
    let identity = sessionStorage.getItem('identity')
    if (identity) {
      config.headers = {
        'identity': identity,
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let api = {};
//临时接口  删除分身
api.delIdentity = function (targetID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/delIdentity?tk=${Url.tk}&targetID=${targetID}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取其他友商消息事件
api.loadUserOtherShopInfo = function (phone) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadUserOtherShopInfo?tk=${Url.tk}&phone=${phone}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//保存用户和公众号基本信息到总服
api.saveWechatBaseInfo = function (phone) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/saveWechatBaseInfo?tk=${Url.tk}&phone=${phone}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载常去门店平台
api.loadFrequentPlatform = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadFrequentPlatform?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//收集常去门店平台
api.collectFrequentPlatform = function (storeId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/collectFrequentPlatform?tk=${Url.tk}&storeId=${storeId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取平台公众号门店
api.loadPlatforms = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadPlatforms?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取桌号
api.loadDesks = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadDesks?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//回复预约消息,同时设置这个预约消息已被处理
api.sendBookMsg = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendBookMsg?tk=${Url.tk}`,data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//扣减充值会员卡
api.decreaseTopUpVip = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/decreaseTopUpVip?tk=${Url.tk}`,data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取充值会员卡交易记录
api.loadTopUpDetailForC = function (cursor,count) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadTopUpDetailForC?tk=${Url.tk}&cursor=${cursor}&count=${count}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取用户在其他友商的信息
// api.loadOtherAllianceMessage = function (port) {
//   return new Promise((resolve, reject) => {
//     axios.get(Url.commonUrl + `/api/loadOtherAllianceMessage?tk=${Url.tk}&port=${port}`).then((res) => {
//       if (res.status == 200) {
//         resolve(res.data)
//       }
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }
//拉取发布供需者
api.loadPublisherList = function (needed) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadPublisherList?tk=${Url.tk}&needed=${needed}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//发布供需
api.publishNeeded = function (needed) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/publishNeeded?tk=${Url.tk}&needed=${needed}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载活动告示板往期图片
api.loadOldPhotos = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadOldPhotos?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//主动接受有缘人申请，加客服好友
api.acceptSoulMateInvite = function (fromId, agree) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/acceptSoulMateInvite?tk=${Url.tk}&fromId=${fromId}&agree=${agree}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//如果绑定有客服，用户主动拉取灵魂邀请和客服匹配
api.loadSoulMateInvite = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadSoulMateInvite?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//删除关注者提醒信息
api.delSubscribeInfo = function (toOpenId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/delSubscribeInfo?tk=${Url.tk}&openId=${toOpenId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//关注某用户
api.subscribeUser = function (toOpenId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/subscribeUser?tk=${Url.tk}&toOpenId=${toOpenId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//参团
api.joinGroupShopping = function (openGroupId, groupShopInfoId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/joinGroupShopping?tk=${Url.tk}&openGroupId=${openGroupId}&groupShopInfoId=${groupShopInfoId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//开团
api.openGroupShopping = function (activityId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/openGroupShopping?tk=${Url.tk}&activityId=${activityId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取用户开团信息
api.loadGroupShopForUser = function (groupShopInfoId, openGroupId = "") {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadGroupShopForUser?tk=${Url.tk}&groupShopInfoId=${groupShopInfoId}&openGroupId=${openGroupId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//判断是否有团购活动
api.judgeHasGroupShop = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/judgeHasGroupShop?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//上传公司链接
api.uploadCompanyLink = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/uploadCompanyLink?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//处理在新朋友事件中有关留言的表数据
api.delCommentInfo = function (flag, data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/delCommentInfo?tk=${Url.tk}&flag=${flag}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//收集访问页面轨迹次数
api.addVisitRecord = function (pageType) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/addVisitRecord?tk=${Url.tk}&pageType=${pageType}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//获得最新的自助买单信息
api.getNewestSelfPay = function (clientID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/getNewestSelfPay?tk=${Url.tk}&clientID=${clientID}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//回复贵宾通知
api.replyVipService = function (openid) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/replyVipService?tk=${Url.tk}&targetID=${openid}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//用deskID获得下单码图片链接
api.getPlaceOrderQRcodebyID = function (deskID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/getPlaceOrderQRcodebyID?tk=${Url.tk}&deskID=${deskID}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//用于验证B端的登陆密码
api.verifyPassword = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/verifyPassword?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载台/桌的绑定员工
api.loadDeskHolder = function (deskID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadDeskHolder?tk=${Url.tk}&deskID=${deskID}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//和某人成为好友
api.beFriend = function (target) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/beFriend?tk=${Url.tk}&target=${target}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//通过手机号获得员工信息
api.loadUserInfoByPhone = function (phone) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadUserInfoByPhone?tk=${Url.tk}&phone=${phone}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载自助买单流水信息
api.loadSelfPay = function (cursor, count) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadSelfPay?tk=${Url.tk}&cursor=${cursor}&count=${count}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//收银员确认收款
api.confirmSelfPay = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/confirmSelfPay?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//用户已付款
api.paymentSelfPay = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/paymentSelfPay?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//----
//收银员确认对账单，并写入对话消息，账单ID、消费金额、实付金额 必填
api.matchSelfPay = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/matchSelfPay?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载指定ID的自助买单信息，即刚刚用户发起自助买单的信息
api.loadSelfPayByID = function (id) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadSelfPayByID?tk=${Url.tk}&id=${id}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//用户发起自助买单
api.launchSelfPay = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/launchSelfPay?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载自助买单二维码
api.loadQRCode = function () {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/loadQRCode?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//收银员发送图片消息
api.sendImageCashier = function (to, from, fileName, data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendImageCashier?tk=${Url.tk}&to=${to}&from=${from}&fileName=${fileName}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//收银员发送消息
api.sendTextCashier = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendTextCashier?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//核销优惠券
api.setOffUserCoupon = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/setOffUserCoupon?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取收银员消息
api.loadCashierChatMsg = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/loadCashierChatMsg?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载收银员列表 (该接口会判断当前用户是否是收银员，若是会加载向收银员申请核销的用户列表，若否则会加载收银员消息表)
api.loadCashierList = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadCashierList?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//拉取员工评价内容
api.loadStaffCommentInfo = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadStaffCommentInfo?tk=${Url.tk}&openId=${openId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//员工、用户发布评价
api.sendCommentMessage = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendCommentMessage?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//员工评价鄙视
api.giveUnThumb = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/giveUnThumb?tk=${Url.tk}&openId=${openId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//员工评价点赞
api.giveThumb = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/giveThumb?tk=${Url.tk}&openId=${openId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//赠送员工送券活动
api.sendStaffCouponToUser = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendStaffCouponToUser?tk=${Url.tk}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载员工送券活动
api.loadStaffCouponAct = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadStaffCouponAct?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//删除系统通知消息
api.delNotice = function (noticeID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/delNotice?noticeID=${noticeID}&tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//设置系统通知消息已读
api.setUnreadNotice = function (noticeID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/setUnreadNotice?noticeID=${noticeID}&tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载系统通知消息
api.loadUserNotice = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadUserNotice?tk=${Url.tk}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//分身登陆
api.loginIdentity = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/loginIdentity?tk=${Url.tk}`, data).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取分身
api.loadIdentityList = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/loadIdentityList?tk=${Url.tk}`, data).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//创建分身
api.createIdentity = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/createIdentity?tk=${Url.tk}`, data).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取友商物品
api.statAlliCount = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/statAlliCount?tk=${Url.tk}`, data).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取友商物品
api.getAllianceCoupon = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/allianceCoupon?tk=${Url.tk}`, param).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取友商物品
api.loadAlliance = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/loadAlliance?tk=${Url.tk}`, param).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//设置语音消息已读
api.setVoiceRead = function (messageId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/setVoiceRead?tk=${Url.tk}&voiceMsgID=${messageId}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//兑换会员卡
api.getVipCard = function (vipId, phone) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/getVipCard?tk=${Url.tk}&vipCardId=${vipId}&phone=${phone}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//回应游戏待被邀请队列
api.queueCombatReply = function (p, identity) {
  return new Promise((resolve, reject) => {
    axios.post("https://singledog.qianz.com/" + `game/dice/queueCombatReply?tk=${Url.tk}&identity=${identity}`, p).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//放弃回房
api.enforceLeaveRoom = function () {
  return new Promise((resolve, reject) => {
    axios.get("https://singledog.qianz.com/" + `game/dice/enforceLeaveRoom?tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载全部员工
api.loadAllStaff = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadAllStaff?tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载vip卡券
api.loadVipCardList = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadVipCard?tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//接受灵魂匹配
api.acceptSoulFri = function (fromId, flag) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/acceptSoulFri?tk=${Url.tk}&fromId=${fromId}&agree=${flag}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//搜索灵魂匹配
api.searchWaitBeMakeFriUser = function (cursor) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/searchWaitBeMakeFriUser?tk=${Url.tk}&cursor=${cursor}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//随机场添加等待约战人名单
api.addWaitingCombatList = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/addWaitingCombatList?tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载客服消息列表
api.loadChatMsgCliSer = function (cursor, aTalker, bTalker, loadCount) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadChatMsgCliSer?cursor=${cursor}&tk=${Url.tk}&to=${aTalker}&from=${bTalker}&loadCount=${loadCount}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//成为留言者
api.addCommenter = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/addCommenter?tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载客服列表
api.loadClientServiceList = function (phone) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadClientServiceList?phone=${phone}&tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取设置信息
api.loadL98otherSetting = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadL98otherSetting?tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载回房信息
api.loadLastRoomInfo = function (deskCode) {
  return new Promise((resolve, reject) => {
    axios.get("https://singledog.qianz.com/" + `game/dice/loadLastRoomInfo?tk=${Url.tk}&deskCode=${deskCode}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//测试删除好友quitFriend
api.quitFriend = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/quitFriend?tk=${Url.tk}&targetID=${openId}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//获取用户信息
api.getUserInfo = function (openId = "") {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadUserInfo?tk=${Url.tk}&openId=${openId}`).then(res => {
      if (res.status == 200) {
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

//拉取全部社群用户
api.getFriendList = function (params, openId = "") {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/searchCandidates?tk=${Url.tk}&openId=${openId}`, params).then(res => {
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
    axios.post(Url.commonUrl + `/api/makeFriend?targetID=` + xid).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

//拉取点赞事件
api.loadFriendEvts = function (cursor) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + "/api/loadFriendEvts?cursor=" + cursor).then(res => {
      if (res.status == 200) {
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
    axios.post(Url.commonUrl + `/api/loadFriends?tk=${Url.tk}`).then(res => {
      if (res.status == 200) {
        // //console.log('拉取好友详细数据-----------', res)
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//交互记录加载（包括约战、点赞交友、送礼记录
api.loadMutualEvents = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadMutualEvents?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//发送客服消息
api.sendChatMsgCliSer = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendChatMsgCliSer?tk=${Url.tk}`, param).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//发送好友聊天消息sendChatMsgCliSer
api.postFriendMess = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendChatMsg?tk=${Url.tk}`, param).then((res) => {
      // //console.log(res)
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//发送客服聊天图片
api.sendImageCliSer = function (fromIconURI, openId, from, fileName, param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendImageCliSer?to=${openId}&from=${from}&fileName=${fileName}&fromIconURI=${fromIconURI}&tk=${Url.tk}`, param).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//发送好友聊天图片
api.postFriendPic = function (openId, fileName, param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/sendImage?to=${openId}&fileName=${fileName}&tk=${Url.tk}`, param).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//根据拉取个人的聊天记录列表
api.getFriendMessList = function (cursor, who) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadChatMsg?cursor=${cursor}&who=${who}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//标记收银消息已读
api.setCashierMsgRead = function (who) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/setCashierMsgRead?who=${who}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//标记客服消息已读
api.setMsgReadCliSer = function (from,to) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/setCliMsgRead?from=${from}&to=${to}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//标记普通消息用户已读
api.sendMsgReaded = function (who) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/setMsgRead?who=${who}&tk=${Url.tk}`)
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
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/updatePortrait?fileName=${fileName}&tk=${Url.tk}`, param)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//上传生活照
api.updateLifePic = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/uploadLifePhoto?tk=${Url.tk}`, param)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//删除生活照
api.delLifePhoto = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/delLifePhoto?tk=${Url.tk}`, param)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
// 上传全部生活照Btn
// api.uploadAllLifePic = function (param) {
//   return new Promise((resolve, reject) => {
//     axios.post(Url.commonUrl + `/api/uploadLifePhotoURL?tk=${Url.tk}`, param)
//       .then(res => {
//         if (res.status == 200) {
//           resolve(res.data)
//         }
//       }).catch(err => {
//         reject(err)
//       })
//   })
// }
//保存个人信息修改
api.savePersonalInfo = function (param) {
  //
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/updateUserInfo?tk=${Url.tk}`, param)
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
    axios.get(Url.commonUrl + `/api/loadInOutFieldNumber?tk=${Url.tk}`)
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
    axios.get(Url.commonUrl + `/api/loadInsideCandidates?cursor=${cursor}&tk=${Url.tk}`)
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
    axios.get(Url.commonUrl + `/api/loadOutsideCandidates?cursor=${cursor}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

// //用户拉取Ai优惠券
// api.loadUserCoupons = function (channel) {
//     return new Promise((resolve, reject) => {
//         axios.get(Url.commonUrl + `/api/loadUserCoupons?tk=${Url.tk}&channel=${channel}`)
//             .then(res => {
//                 if (res.status == 200) {
//                     resolve(res.data)
//                 }
//             }).catch(err => {
//                 reject(err)
//             })
//     })
// }
//拉取自动发券的活动的优惠券
api.acquireWaitGetCoupons = function (condition) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/acquireWaitGetCoupons?tk=${Url.tk}&condition=${condition}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取所有优惠券
api.loadUserAllCoupon = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadUserAllCoupon?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//微信支付
api.createOrder = function (goodsID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/createOrder?goodsID=${goodsID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//标识已进入过公众号
api.clearFirstLoadTag = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/clearFirstLoadTag?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
// 获取游戏房间ID
// api.createRoom = function(tk, arenaID) {
//         return new Promise((resolve, reject) => {
//             axios.get(`http://llwant.test.qianz.com:3002/createRoom?tk=${Url.tk}&gamePath=game2&arenaID=${arenaID}`)
//                 .then(res => {
//                     if (res.status == 200) {
//                         resolve(res.data)
//                     }
//                 }).catch(err => {
//                     reject(err)
//                 })
//         })
//     }
//拉取游戏比赛场
api.loadArenas = function (gamePath) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadArenas?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取已经发布的比赛场
api.loadPublishArenas = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadPublishArenas?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取比赛场排名
//a01cf831-46c4-4693-bf5b-692d1ef3a1b9
api.loadArenaRank = function (arenaID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadArenaRank?arenaID=${arenaID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取礼物
api.loadAllGift = function (arenaID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadAllGift?tk=${Url.tk}`)
      .then(res => {
        //console.log('虚拟礼物列表-------', res)
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//发送礼物
api.sendGift = function (params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/sendGift?tk=${Url.tk}`, params)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取待领取的邀请有礼优惠券
api.loadInviteCoupon = function (flag) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadInviteCoupon?tk=${Url.tk}&isVisitInvitePage=${flag}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//分享出去后领取者调用的拉取优惠券
api.acquireInviteWaitGetCoupons = function (params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/acquireInviteWaitGetCoupons?tk=${Url.tk}`, params)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取单个优惠券信息
api.loadUserCouponByID = function (couponId) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadUserCouponByID?userCouponID=${couponId}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//C端主动发起核销发起
api.launchSetOffUserCoupon = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/launchSetOffUserCoupon?tk=${Url.tk}`, data)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取全部店长推荐
api.loadAllRecommends = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadAllRecommends?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取在线店长推荐
api.loadRecommends = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadRecommends?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取活动通知
api.loadActivityInfo = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadActivityInfo?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取门店信息
api.loadStoreSetting = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadStoreSetting?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取首页轮播图
api.loadAdvertisingPhoto = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadAdvertisingPhoto?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取礼物详情
api.loadWealthDetail = function (cursor, count) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadWealthDetail?tk=${Url.tk}&cursor=${cursor}&count=${count}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取游戏详情
api.LoadGameScoreDetail = function (cursor, count) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadGameScoreDetail?tk=${Url.tk}&cursor=${cursor}&count=${count}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//加载活动详情
api.loadActivityDetail = function (activityID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadActivityDetail?activityID=${activityID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//签到
api.checkIn = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/checkIn?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取比赛按照结束时间重新排名
api.loadAllArenaInfo = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadAllArenaInfo?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
// 拉取每场比赛的前十名选手信息， 以及对应的奖品
api.loadArenaTopRank = function (arenaID, topNumber) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadArenaTopRank?arenaID=${arenaID}&topNumber=${topNumber}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          //console.log(res)
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//记录打电话
api.statCalls = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/statCalls?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//店长推荐预定
api.convertRecommend = function (recommendID, convertType) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/convertRecommend?recommendID=${recommendID}&tk=${Url.tk}&convertType=${convertType}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//验证员工
api.verifyPhoneNumber = function (phone, avatarImg, oldPhone) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/verifyPhone?phone=${phone}&avatarImg=${avatarImg}&tk=${Url.tk}&oldphone=${oldPhone}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取每场比赛的前十名选手信息
api.loadArenaRanking = function (arenaID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadArenaRanking?arenaID=${arenaID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//赠送礼物申请成为好友  拉取收礼记录
api.loadGiftsRecord = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadGiftsRecord?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//感谢好友送礼
api.thanksForGit = function (giftGiverID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/thanksForGit?targetID=${giftGiverID}&${Url.tk}&agree=yes`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//送礼拒绝或接受
api.respondForGift = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(Url.commonUrl + `/api/respondForGift?tk=${Url.tk}`, param)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取系统信息
api.loadManagerNoticeInfo = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadManagerNoticeInfo?${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//约战
api.sentPlayGameMsg = function (toUserID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/sentPlayGameInvite?tk=${Url.tk}&toUserID=${toUserID}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取约战列表
api.loadInviteCombat = function () {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadInviteCombat?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拒绝约战
// api.objectCombat = function (combatID,openid) {
//   return new Promise((resolve, reject) => {
//     axios.get(`/api/objectCombat?combatID=${combatID}&tk=${Url.tk}&openID=${openid}`)
//       .then(res => {
//         if (res.status == 200) {
//           //console.log('拒绝约占')
//           resolve(res.data)
//         }
//       }).catch(err => {
//         reject(err)
//       })
//   })
// }
//约战
api.responseCombat = function (params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/responseCombat?tk=${Url.tk}`, params)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//获取手机验证码
api.getVerifyCode = function (phone) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/getVerifyCode?phone=${phone}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//发送手机验证码
api.checkVerifyCode = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/checkVerifyCode?tk=${Url.tk}`,data)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//创建战队
api.createTeam = function (arenaID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/createTeam?arenaID=${arenaID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//加入战队
api.joinTeam = function (teamID, arenaID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/joinTeam?teamID=${teamID}&arenaID=${arenaID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//拉取战队
api.loadTeam = function (teamID, arenaID) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadTeam?teamID=${teamID}&arenaID=${arenaID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//财富排行
api.loadWealthRanking = function (rankingType, count, cursor) {
  let pcount = count || "";
  let pcursor = cursor || "";
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadWealthRanking?rankingType=${rankingType}&count=${pcount}&cursor=${pcursor}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//战神榜排名
api.loadGameScoreRanking = function (rankingType, count, cursor) {
  let pcount = count || "";
  let pcursor = cursor || "";
  return new Promise((resolve, reject) => {
    axios.get(`/api/loadGameScoreRanking?rankingType=${rankingType}&count=${pcount}&cursor=${pcursor}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//分享邀约记录创建
api.createShareDaylog = function (shareType) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/createShareDaylog?tk=${Url.tk}&shareType=${shareType}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//加载积分礼品
api.loadGoods = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadGoods?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//兑换积分
api.convertGoods = function (goodId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/convertGoods?tk=${Url.tk}&goodsID=${goodId}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//分享获得积分
api.shareToGetIntegral = function (amount, shareType) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/shareToGetIntegral?amount=${amount}&shareType=${shareType}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//赠送礼品
api.sentGoods = function (goodsID, targetID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/sentGoods?goodsID=${goodsID}&targetID=${targetID}&tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//店长推荐赠送礼品
api.sentRecommend = function (goodsID, targetID) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/sentRecommend?recommendID=${goodsID}&targetID=${targetID}&tk=${Url.tk}`)
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
api.createQrcode = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/createQrcode?tk=${Url.tk}`)
      .then(res => {
        //console.log('创建二维码--------', res)
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//拉取已经创建过的二维码
api.loadAllQrcode = function () {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/loadAllQrcode?tk=${Url.tk}`)
      .then(res => {
        if (res.status == 200) {
          //console.log('拉取二维码--------', res)
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
//分享有礼领取优惠券
api.acquireInviteCoupon = function (couponID, type, activityId) {
  return new Promise((resolve, reject) => {
    axios.get(Url.commonUrl + `/api/acquireInviteCoupon?tk=${Url.tk}&couponID=${couponID}&abCoupon=${type}&activityId=${activityId}`)
      .then(res => {
        if (res.status == 200) {
          // //console.log('拉取二维码--------', res)
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

export default api
