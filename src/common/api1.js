/*
 * @Author: liuning
 * @Date: 2020-05-04 14:45:54
 * @Last Modified by: liuning
 * @Last Modified time: 2021-02-23 18:12:41
 */
import axios from 'axios'
import util from "../common/util"
let tk = util.GetQueryString("tk")
let windowUrL = `https://${window.location.host}/`;
axios.interceptors.request.use(
  config => {
    let identity = sessionStorage.getItem('identity')
    if (identity) {
      config.headers = {
        'identity': identity,
      }
    }
    // console.log("config.url", config.url)
    if (config.url.indexOf("?") > -1) {
      config.url = config.url + "&tk=" + tk
    } else {
      config.url = config.url + "?tk=" + tk
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
let api = {};
//设置用户的收货地址
api.setUserAddr = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `api/setUserAddr`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取所有门店视频
api.getAllObjectList = function () {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/getAllObjectList`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取所有已开团的活动信息 （拼团有奖活动）
api.loadAllOpenGroupList = function (groupBookAwardId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadAllOpenGroupList?groupBookAwardId=${groupBookAwardId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载某期中奖事件详情
api.loadWinnerEventInfo = function (winEventId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadWinnerEventInfo?winEventId=${winEventId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取用户参与的拼团有奖活动信息
api.loadGroupBookAwardForUser = function (groupBookAwardInfoId, openGroupId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadGroupBookAwardForUser?groupBookAwardInfoId=${groupBookAwardInfoId}&openGroupId=${openGroupId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拼团有奖项目的开团
api.openGroupBookAward = function (activityId, personNums) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/openGroupBookAward?activityId=${activityId}&personNums=${personNums}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拼团有奖的参团
api.joinGroupBookAward = function (openGroupId, groupBookAwardInfoId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/joinGroupBookAward?openGroupId=${openGroupId}&groupBookAwardInfoId=${groupBookAwardInfoId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//判断是否发布上线了拼团有奖活动
api.judgeHasGroupBookAward = function () {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/judgeHasGroupBookAward`).then((res) => {
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
    axios.get(windowUrL + `api/loadUserOtherShopInfo?phone=${phone}`).then((res) => {
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
    axios.get(windowUrL + `api/saveWechatBaseInfo?phone=${phone}`).then((res) => {
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
    axios.get(windowUrL + `api/loadFrequentPlatform`).then((res) => {
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
    axios.get(windowUrL + `api/collectFrequentPlatform?storeId=${storeId}`).then((res) => {
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
    axios.get(windowUrL + `api/loadPlatforms`).then((res) => {
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
    axios.get(windowUrL + `api/loadDesks`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//回复预约消息
api.sendBookMsg = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `api/sendBookMsg`, data).then((res) => {
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
    axios.post(windowUrL + `api/decreaseTopUpVip`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取充值会员卡交易记录
api.loadTopUpDetailForC = function (cursor, count) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadTopUpDetailForC?cursor=${cursor}&count=${count}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
// //拉取用户在其他友商的信息 （待删除）
// api.loadOtherAllianceMessage = function (port) {
//   return new Promise((resolve, reject) => {
//     axios.get(windowUrL+`api/loadOtherAllianceMessage?port=${port}`).then((res) => {
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
    axios.get(windowUrL + `api/loadPublisherList?needed=${needed}`).then((res) => {
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
    axios.get(windowUrL + `api/publishNeeded?needed=${needed}`).then((res) => {
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
    axios.get(windowUrL + `api/loadOldPhotos`).then((res) => {
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
    axios.get(windowUrL + `api/acceptSoulMateInvite?fromId=${fromId}&agree=${agree}`).then((res) => {
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
    axios.get(windowUrL + `api/loadSoulMateInvite`).then((res) => {
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
    axios.get(windowUrL + `api/delSubscribeInfo?openId=${toOpenId}`).then((res) => {
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
    axios.get(windowUrL + `api/subscribeUser?toOpenId=${toOpenId}`).then((res) => {
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
    axios.get(windowUrL + `api/joinGroupShopping?openGroupId=${openGroupId}&groupShopInfoId=${groupShopInfoId}`).then((res) => {
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
    axios.get(windowUrL + `api/openGroupShopping?activityId=${activityId}`).then((res) => {
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
    axios.get(windowUrL + `api/loadGroupShopForUser?groupShopInfoId=${groupShopInfoId}&openGroupId=${openGroupId}`).then((res) => {
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
    axios.get(windowUrL + `api/judgeHasGroupShop`).then((res) => {
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
    axios.post(windowUrL + `api/uploadCompanyLink`, data).then((res) => {
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
    axios.post(windowUrL + `api/delCommentInfo?flag=${flag}`, data).then((res) => {
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
    axios.get(windowUrL + `api/addVisitRecord?pageType=${pageType}`).then((res) => {
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
    axios.get(windowUrL + `api/getNewestSelfPay?clientID=${clientID}`).then((res) => {
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
    axios.get(windowUrL + `api/replyVipService?targetID=${openid}`).then((res) => {
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
    axios.get(windowUrL + `api/getPlaceOrderQRcodebyID?deskID=${deskID}`).then((res) => {
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
    axios.post(windowUrL + `api/verifyPassword`, data).then((res) => {
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
    axios.get(windowUrL + `api/loadDeskHolder?deskID=${deskID}`).then((res) => {
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
    axios.get(windowUrL + `api/beFriend?target=${target}`).then((res) => {
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
    axios.post(windowUrL + `api/delLifePhoto`, param)
      .then(res => {
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
    axios.get(windowUrL + `api/loadUserInfoByPhone?phone=${phone}`).then((res) => {
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
    axios.get(windowUrL + `api/loadSelfPay?cursor=${cursor}&count=${count}`).then((res) => {
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
    axios.post(windowUrL + `api/confirmSelfPay`, data).then((res) => {
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
    axios.post(windowUrL + `api/paymentSelfPay`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//收银员确认对账单，并写入对话消息，账单ID、消费金额、实付金额 必填
api.matchSelfPay = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `api/matchSelfPay`, data).then((res) => {
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
    axios.get(windowUrL + `api/loadSelfPayByID?id=${id}`).then((res) => {
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
    axios.post(windowUrL + `api/launchSelfPay`, data).then((res) => {
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
    axios.post(windowUrL + `api/loadQRCode`).then((res) => {
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
    axios.post(windowUrL + `api/sendImageCashier?to=${to}&from=${from}&fileName=${fileName}`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//收银员发送语言消息
api.sendTextCashier = function (data) {
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `api/sendTextCashier`, data).then((res) => {
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
    axios.post(windowUrL + `api/setOffUserCoupon`, data).then((res) => {
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
    axios.post(windowUrL + `api/loadCashierChatMsg`, data).then((res) => {
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
    axios.get(windowUrL + `api/loadCashierList`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//拉取员工评价
api.loadStaffCommentInfo = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadStaffCommentInfo?openId=${openId}`).then((res) => {
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
    axios.post(windowUrL + `api/sendCommentMessage`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//员工、用户评价鄙视
api.giveUnThumb = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/giveUnThumb?openId=${openId}`).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//员工、用户评价点赞
api.giveThumb = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/giveThumb?openId=${openId}`).then((res) => {
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
    axios.post(windowUrL + `api/sendStaffCouponToUser`, data).then((res) => {
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
    axios.get(windowUrL + `api/loadStaffCouponAct`).then((res) => {
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
    axios.get(windowUrL + `api/delNotice?noticeID=${noticeID}`).then((res) => {
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
    axios.get(windowUrL + `api/setUnreadNotice?noticeID=${noticeID}`).then((res) => {
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
    axios.get(windowUrL + `api/loadUserNotice`).then((res) => {
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
    axios.post(windowUrL + `api/loginIdentity`, data).then((res) => {
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
    axios.post(windowUrL + `api/loadIdentityList`, data).then((res) => {
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
    axios.post(windowUrL + `api/createIdentity`, data).then((res) => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//统计友商宣传我和我友商引流
api.statAlliCount = function (param) {
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `api/statAlliCount`, param).then((res) => {
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
    axios.post(windowUrL + `api/allianceCoupon`, param).then((res) => {
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
    axios.post(windowUrL + `api/loadAlliance`, param).then((res) => {
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
    axios.get(windowUrL + `api/setVoiceRead?voiceMsgID=${messageId}`).then(res => {
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
    axios.get(windowUrL + `api/getVipCard?vipCardId=${vipId}&phone=${phone}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//回复游戏待被邀请队列
api.queueCombatReply = function (p, identity) {
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `/game/dice/queueCombatReply?identity=${identity}`, p).then(res => {
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
    axios.get(windowUrL + `/game/dice/enforceLeaveRoom`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
api.loadAllStaff = function () {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadAllStaff`).then(res => {
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
    axios.get(windowUrL + `api/loadVipCard`).then(res => {
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
    axios.get(windowUrL + `api/acceptSoulFri?fromId=${fromId}&agree=${flag}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//搜索灵魂匹配用户
api.searchWaitBeMakeFriUser = function (cursor) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/searchWaitBeMakeFriUser?cursor=${cursor}`).then(res => {
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
    axios.get(windowUrL + `api/addWaitingCombatList`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//加载客服聊天记录
api.loadChatMsgCliSer = function (cursor, aTalker, bTalker, loadCount) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadChatMsgCliSer?cursor=${cursor}&to=${aTalker}&from=${bTalker}&loadCount=${loadCount}`).then(res => {
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
    axios.get(windowUrL + `api/addCommenter`).then(res => {
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
    axios.get(windowUrL + `api/loadClientServiceList?phone=${phone}`).then(res => {
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
    axios.get(windowUrL + `api/loadL98otherSetting`).then(res => {
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
    axios.get(windowUrL + `/game/dice/loadLastRoomInfo?deskCode=${deskCode}`).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
//删除好友quitFriend
api.quitFriend = function (openId) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/quitFriend?targetID=${openId}`).then(res => {
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
    axios.get(windowUrL + `api/loadUserInfo?openId=${openId}`).then(res => {
      if (res.status == 200) {
        // //console.log(res.data)
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
    axios.get(path).then(res => {
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
    axios.post(windowUrL + `api/searchCandidates?openId=${openId}`, params).then(res => {
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
    axios.post("api/makeFriend?targetID=" + xid).then(res => {
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
    axios.post("api/loadFriendEvts?cursor=" + cursor).then(res => {
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
    axios.post(windowUrL + `api/auditFriend?evtID=${type}&agree=${flag}`).then(res => {
      if (res.status == 200) {
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
    axios.get(windowUrL + `api/loadMutualEvents`)
      .then(res => {
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
    axios.post(windowUrL + `api/loadFriends?cursor=${cursor}`).then(res => {
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
    axios.post(windowUrL + `api/sendChatMsgCliSer`, param).then((res) => {
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
    // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    axios.post("api/sendChatMsg", param).then((res) => {
      //console.log(res)
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
    axios.post(windowUrL + `api/sendImageCliSer?to=${openId}&from=${from}&fileName=${fileName}&fromIconURI=${fromIconURI}`, param).then((res) => {
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
    // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    axios.post(windowUrL + `api/sendImage?to=${openId}&fileName=${fileName}`, param).then((res) => {
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
    // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    axios.get(windowUrL + `api/loadChatMsg?cursor=${cursor}&who=${who}`)
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
    axios.get(windowUrL + `api/setCashierMsgRead?who=${who}`)
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
api.setMsgReadCliSer = function (from, to) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/setCliMsgRead?from=${from}&to=${to}`)
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
    // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    axios.get(windowUrL + `api/setMsgRead?who=${who}`)
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
  // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `api/updatePortrait?fileName=${fileName}`, param)
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
    axios.post(windowUrL + `api/uploadLifePhoto`, param)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
// // 上传全部生活照Btn
// api.uploadAllLifePic = function (param) {
//     return new Promise((resolve, reject) => {
//         axios.post( windowUrL+`api/uploadLifePhotoURL`, param)
//             .then(res => {
//                 if (res.status == 200) {
//                     resolve(res.data)
//                 }
//             }).catch(err => {
//                 reject(err)
//             })
//     })
// }
//保存个人信息修改
api.savePersonalInfo = function (param) {
  // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
  return new Promise((resolve, reject) => {
    axios.post(windowUrL + `api/updateUserInfo`, param)
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
  // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadInOutFieldNumber`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//拉取店内候选人
api.getLoadInsideCandidates = function (cursor) {
  // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadInsideCandidates?cursor=${cursor}`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}

//拉取店外候选人
api.getLoadOutsideCandidates = function (cursor) {
  // &tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadOutsideCandidates?cursor=${cursor}`)
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
//         axios.get( windowUrL+`api/loadUserCoupons?channel=${channel}`)
//             .then(res => {
//                 if (res.status == 200) {
//                     resolve(res.data)
//                 }
//             }).catch(err => {
//                 reject(err)
//             })
//     })
// }
//拉取未领取的优惠券（登录公众号弹出优惠券，目前只有AI发送才有）
api.acquireWaitGetCoupons = function (condition) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/acquireWaitGetCoupons?condition=${condition}`)
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
    axios.get(windowUrL + `api/loadUserAllCoupon`)
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
    axios.get(windowUrL + `api/createOrder?goodsID=${goodsID}`)
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
    axios.get(windowUrL + `api/clearFirstLoadTag`)
      .then(res => {
        if (res.status == 200) {
          resolve(res.data)
        }
      }).catch(err => {
        reject(err)
      })
  })
}
// 获取比赛游戏房间ID
// api.createRoom = function(tk, arenaID) {
//         return new Promise((resolve, reject) => {
//             axios.get(`http://llwant.test.qianz.com:3002/createRoom?tk=${tk}&gamePath=game2&arenaID=${arenaID}`)
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
api.loadArenas = function () {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadArenas`)
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
    axios.get(windowUrL + `api/loadPublishArenas`)
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
api.loadArenaRank = function (arenaID) {
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/loadArenaRank?arenaID=${arenaID}`)
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
    axios.get(windowUrL + `api/loadAllGift`)
      .then(res => {
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
    axios.post(windowUrL + `api/sendGift`, params)
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
    axios.get(windowUrL + `api/loadInviteCoupon?isVisitInvitePage=${flag}`)
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
    axios.post(windowUrL + `api/acquireInviteWaitGetCoupons`, params)
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
    axios.post(windowUrL + `api/loadUserCouponByID?userCouponID=${couponId}`)
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
    axios.post(windowUrL + `api/launchSetOffUserCoupon`, data)
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
    axios.get(windowUrL + `api/loadAllRecommends`)
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
    axios.get(windowUrL + `api/loadRecommends`)
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
    axios.get(windowUrL + `api/loadActivityInfo`)
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
    axios.get(windowUrL + `api/loadStoreSetting`)
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
    axios.get(windowUrL + `api/loadAdvertisingPhoto`)
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
    axios.get(windowUrL + `api/loadWealthDetail?cursor=${cursor}&count=${count}`)
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
    axios.get(windowUrL + `api/loadGameScoreDetail?cursor=${cursor}&count=${count}`)
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
    axios.get(windowUrL + `api/loadActivityDetail?activityID=${activityID}`)
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
    axios.get(windowUrL + `api/checkIn`)
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
    axios.get(windowUrL + `api/loadAllArenaInfo`)
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
    axios.get(windowUrL + `api/loadArenaTopRank?arenaID=${arenaID}&topNumber=${topNumber}`)
      .then(res => {
        if (res.status == 200) {
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
    axios.get(windowUrL + `api/statCalls`)
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
    axios.get(windowUrL + `api/convertRecommend?recommendID=${recommendID}&convertType=${convertType}`)
      .then(res => {
        //console.log(res)
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
    axios.get(windowUrL + `api/verifyPhone?phone=${phone}&avatarImg=${avatarImg}&oldphone=${oldPhone}`)
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
    axios.get(windowUrL + `api/loadArenaRanking?arenaID=${arenaID}`)
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
    axios.get(windowUrL + `api/loadGiftsRecord`)
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
    axios.get(windowUrL + `api/thanksForGit?targetID=${giftGiverID}&agree=yes`)
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
    axios.post(windowUrL + `api/respondForGift`, param)
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
    axios.get(windowUrL + `api/loadManagerNoticeInfo`)
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
    axios.get(windowUrL + `api/sentPlayGameInvite?toUserID=${toUserID}`)
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
    axios.get(windowUrL + `api/loadInviteCombat`)
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
// api.objectCombat = function (combatID,openId) {
//   return new Promise((resolve, reject) => {
//     axios.get(windowUrL+`api/objectCombat?combatID=${combatID}&openID=${openId}`)
//       .then(res => {
//         if (res.status == 200) {
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
    axios.post(windowUrL + `api/responseCombat`, params)
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
    axios.get(windowUrL + `api/getVerifyCode?phone=${phone}`)
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
    axios.post(windowUrL + `api/checkVerifyCode`, data)
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
    axios.get(windowUrL + `api/createTeam?arenaID=${arenaID}`)
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
    axios.get(windowUrL + `api/joinTeam?teamID=${teamID}&arenaID=${arenaID}`)
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
    axios.get(windowUrL + `api/loadTeam?teamID=${teamID}&arenaID=${arenaID}`)
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
    axios.get(windowUrL + `api/loadWealthRanking?rankingType=${rankingType}&count=${pcount}&cursor=${pcursor}`)
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
    axios.get(windowUrL + `api/loadGameScoreRanking?rankingType=${rankingType}&count=${pcount}&cursor=${pcursor}`)
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
    axios.get(windowUrL + `api/createShareDaylog?shareType=${shareType}`)
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
    axios.get(windowUrL + `api/loadGoods`)
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
    axios.get(windowUrL + `api/convertGoods?goodsID=${goodId}`)
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
    axios.get(windowUrL + `api/shareToGetIntegral?amount=${amount}&shareType=${shareType}`)
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
    axios.get(windowUrL + `api/sentGoods?goodsID=${goodsID}&targetID=${targetID}`)
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
    axios.get(windowUrL + `api/sentRecommend?recommendID=${goodsID}&targetID=${targetID}`)
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
  // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
  return new Promise((resolve, reject) => {
    axios.get(windowUrL + `api/createQrcode`)
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
api.loadAllQrcode = function () {
  return new Promise((resolve, reject) => {
    // ?tk=TFrhcvpaFUXm5c36xjlBNTvcwV_Uh12_9YZJ2a4t8k8ayMd1BPGDxQb5XFbRxKfRZfxKzA==
    axios.get(windowUrL + `api/loadAllQrcode`)
      .then(res => {
        if (res.status == 200) {
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
    axios.get(windowUrL + `api/acquireInviteCoupon?couponID=${couponID}&abCoupon=${type}&activityId=${activityId}`)
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
