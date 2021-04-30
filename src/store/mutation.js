/*
 * @Author: liuning
 * @Date: 2020-05-04 14:46:23
 * @Last Modified by: liuning
 * @Last Modified time: 2021-02-05 16:02:47
 */
import * as types from './mutation-types'
import util from "common/util";
import VueBus from 'common/bus';

const mutations = {
  //监听客服推送消息
  // [types.LISTENCLIENTMSG](state,msg){
  //     state.lastClientMsg = msg
  //     state.client_badgeCount = msg.content.extMsg.count
  // },
  //更新灵魂匹配参数
  [types.UPDATESOULPARAMS](state, {
    cursor = 0,
    flag = false
  }) {
    state.soulCursor = cursor
    state.soulResult = flag
  },
  //更改左侧信封弹窗内容 CHANGEENVELOPECONTENT
  [types.CHANGEENVELOPECONTENT](state, info) {
    state.dynamicFriendEvt = info
  },
  //存储买单收款码
  [types.SAVECHECKQRCODE](state, checkQrCode) {
    state.checkQrCode = checkQrCode
  },
  //存储桌贴号
  [types.SAVEDESKCODE](state, {
    deskCode,
    deskId
  }) {
    state.deskCode = deskCode
    state.deskId = deskId
  },
  //存储员工送券活动
  [types.GETSTAFFCOUPONINFO](state, staffCoupon) {
    state.staffCouponInfo = staffCoupon
  },
  //获得同一个桌贴的游戏信息
  [types.GETSAMEDESKINFO](state, deskinfo) {
    state.sameDeskInfo = deskinfo
  },
  //clear topUpmesage
  [types.CLEARTOPUPMESSAGE](state) {
    state.topUpMessage = ""
  },
  //insert message into messageQueue
  [types.ADDMESSAGEQUEUE](state, queue) {
    state.messageQueue.push(queue)
  },
  //delete message from messageQueue
  [types.DELMESSAGEQUEUE](state) {
    state.messageQueue.shift()
  },
  [types.SELECTMESSAGEFROMQUEUE](state) {
    state.topUpMessage = state.messageQueue[0]
  },
  //切换灵魂匹配模式
  [types.SWITCHSOULFLAG](state, soulFlag) {
    state.soulSwitch = soulFlag
  },
  //修改未关注user点赞次数
  [types.CHANGEUNFOCUSTHUMBTIMES](state, count) {
    state.unfocusThumbTimes += count
  },
  //修改关注user点赞次数
  [types.CHANGEFOCUSTHUMBTIMES](state, count) {
    state.focusThumbTimes += count
  },
  //修改未关注user约战次数
  [types.CHANGEUNFOCUSPLAYTIMES](state, count) {
    state.unfocusPlayTimes += count
  },
  //修改关注user约战次数
  [types.CHANGEFOCUSPLAYTIMES](state, count) {
    state.focusPlayTimes += count
  },
  //修改二维码上下文字
  [types.CHANGEQRCODETEXT](state, data) {
    state.qrCodeTextObj = data
  },
  //保存二维码
  [types.SAVEQRCODE](state, qrcode) {
    state.qrCode = qrcode
  },
  //获取在线店长推荐
  [types.GET_RECOMMENTLIST](state, recommentList) {
    let now = new Date().getTime()
    for (let i = 0; i < recommentList.length; i++) {
      const recomment = recommentList[i];
      let endTime = new Date(recomment.coupInfo.endTime).getTime()
      if (!recomment.coupInfo) { //如果优惠券被删除了，直接过滤此项目
        continue
      }
      if (recomment.coupInfo.startTimeOption === 1 || recomment.coupInfo.startTimeOption === 3) { //即时生效和次日生效不用判断时间
        state.recommentList.push(recomment)
        continue
      }
      if (endTime > now) { //判断优惠券是否过期
        state.recommentList.push(recomment)
      }
    }
  },
  //获取全部店长推荐
  [types.GET_ALLRECOMMENTLIST](state, allrecommentList) {
    state.allRecommentList = []
    let now = new Date().getTime()
    for (let i = 0; i < allrecommentList.length; i++) {
      const recomment = allrecommentList[i];
      let endTime = new Date(recomment.coupInfo.endTime).getTime()
      if (!recomment.coupInfo) { //如果优惠券被删除了，直接过滤此项目
        continue
      }
      if (recomment.coupInfo.startTimeOption === 1 || recomment.coupInfo.startTimeOption === 3) { //即时生效和次日生效不用判断时间
        state.allRecommentList.push(recomment)
        continue
      }
      if (endTime > now) { //判断优惠券是否过期
        state.allRecommentList.push(recomment)
      }
    }
  },
  //获取积分换礼品列表
  [types.GET_SENDGIFTLIST](state, sendGiftList) {
    let now = new Date().getTime()
    for (let index = 0; index < sendGiftList.length; index++) {
      const gift = sendGiftList[index];
      let endTime = new Date(gift.coupInfo.endTime).getTime()
      if (!gift.coupInfo) { //如果优惠券被删除了，直接过滤此项目
        continue
      }
      if (gift.coupInfo.startTimeOption === 1 || gift.coupInfo.startTimeOption === 3) { //即时生效和次日生效不用判断时间
        state.sendGiftList.push(gift)
        continue
      }
      if (endTime > now) { //判断优惠券是否过期
        state.sendGiftList.push(gift)
      }
    }
    // state.sendGiftList = sendGiftList;
  },
  //判断消息类型
  [types.JUDGE_MESSTYPE](state, type) {
    state.messType = type;
  },
  //修改地址
  [types.GET_URL](state, url) {
    state.baseUrl = url;
  },
  //控制手机验证码弹框
  [types.CHANGE_VALIDATE](state, flag) {
    state.isShow = flag;
  },
  //新增用户生活照
  [types.CHANGE_LIFEIMG](state, life) {
    if (state.userInfo.lifePhoto.lifePhotos == null) {
      state.userInfo.lifePhoto.lifePhotos = [];
      state.userInfo.lifePhoto.lifePhotos.push(life);
    } else {
      state.userInfo.lifePhoto.lifePhotos.push(life);
    }
  },
  //获得用户生活照
  [types.GET_LIFEIMG](state, lifeList) {
    state.lifeImgList = lifeList;
  },
  //删除生活照
  [types.DELETE_LIFEIMG](state, index) {
    state.userInfo.lifePhoto.lifePhotos.splice(index, 1)
  },
  //控制二维码关注弹框
  [types.SHOW_QRCODE](state, flag) {
    state.qrIsShow = flag
  },
  //获取用户数据
  [types.GET_USERINFO](state, userinfo) {
    state.loadFriendSexType = userinfo.sex === 1 ? 2 : 1 //优先搜索异性好友
    // state.loadFriendSexType = userinfo.sex oqWlD1h6Zurgr6YZVTYAqe5JL9oM
    // console.log("用户数据", state.loadFriendSexType)
    userinfo.sex = userinfo.sex === 1 ? "男" : "女"
    state.userInfo = userinfo;

  },
  // 获取地理位置
  [types.GET_POSITION](state, position) {
    state.position = position
  },
  //更新好友图标
  [types.CHANGEFRIENDICON](state, openid) {
    state.friendList.forEach(item => {
      if (item.info.openid === openid) {
        item.isAlreadyFriend = true
      }
    })
  },
  //获取群友数据
  [types.GET_FRIENDlIST](state, data) {
    if (data.candidates.length == 0) {
      return
    }
    state.hasSvip = data.hasSvip
    state.friendList = data.candidates;
    state.friendList.forEach(item => {
      // if (item.info.sex == 2) {
      //     item.info.sex = "女";
      // } else {
      //     item.info.sex = "男";
      // }

      let nowTimeStamp = Math.round(new Date().getTime() / 1000);
      let visitTime = nowTimeStamp - item.visitTime;
      item.visitTime = util.calcOnlineTime(visitTime)
    });
  },
  //获取更多候选人数据
  [types.GET_MOREFRIENDlIST](state, data) {
    console.log('更多候选人数据：', data);
    data.forEach(item => {
      if (item.info.sex == 1) {
        item.info.sex = 1;
      } else {
        item.info.sex = 0;
      }
      let nowTimeStamp = Math.round(new Date().getTime() / 1000);
      let visitTime = nowTimeStamp - item.visitTime;
      item.visitTime = util.calcOnlineTime(visitTime)
      state.friendList.push(item);
    });
  },
  //获取不足10个候选人数据
  [types.GET_LESSTHAN10FRIENDLIST](state, data) {
    console.log('获取不足10个候选人数据：', data);
    data.forEach(item => {
      if (item.info.sex == 1) {
        item.info.sex = 1;
      } else {
        item.info.sex = 0;
      }
      let nowTimeStamp = Math.round(new Date().getTime() / 1000);
      let visitTime = nowTimeStamp - item.visitTime;
      item.visitTime = util.calcOnlineTime(visitTime)
      state.friendList.push(item);
    });
  },
  //改变拉取候选人性别参数
  [types.CHANGESEXTYPE](state, sex) {
    state.loadFriendSexType = sex;
  },
  //测试
  // [types.TESTSEXTYPE](state,flag){
  //   state.tampSexFlag = flag
  // },
  //获取已经成为好友列表
  [types.GET_ALREADYFRIENDEVTLIST](state, {
    data
  }) {
    var totalCount = 0;
    // //console.log(data)
    let tempData = [];
    data.forEach((item, index) => {
      if (item.info.lastMsg) { //如果有最新消息的
        item.info.lastMsg.stime = util.timestampToTime(item.info.lastMsg.stime)
      }
      //如果有未读消息，把有未读消息的那一项放到顶部
      if (item.info.unReadMsgCount > 0) {
        tempData.unshift(item);
      } else {
        tempData.push(item)
      }
      if (item.info.deskCode != 0) {
        item.info.deskCode = util.prefixZero(item.info.deskCode, 3)
        // //console.log(item.deskCode)
      }
      totalCount += item.info.unReadMsgCount //累计未读消息
    })
    state.msg_badgeCount = totalCount

    state.alreadyFriendList = tempData;
    //console.log('拉取好友-----------', state.alreadyFriendList)
  },
  //获取新消息时重新排列消息列表，把最新的一项放到顶部
  [types.TO_TOP_MESSAGE](state, friendList) {
    state.alreadyFriendList = friendList
  },
  //推送最后的一个消息跟已有好友消息列表对比
  [types.COMPARE_LASTMESS](state, lastMsgFrom) {
    //console.log('COMPARE_LASTMESS:```````````````````````````````````', lastMsgFrom)
    let totalCount = 0;
    state.alreadyFriendList.forEach(item => {
      if (lastMsgFrom.lastMsg.from === item.info.openid) {
        let tempTime = util.timestampToTime(lastMsgFrom.lastMsg.stime)
        //console.log('time--------------', tempTime)
        item.info.lastMsg = lastMsgFrom.lastMsg
        item.info.lastMsg.stime = tempTime
        item.info.unReadMsgCount = lastMsgFrom.count;
      }
      totalCount += item.info.unReadMsgCount //累计未读消息
    })
    state.msg_badgeCount = totalCount;
    state.badgeCount = state.msg_badgeCount + state.event_badgeCount
    //console.log("COMPARE_LASTMESS-------------state.badgeCount", state.badgeCount)
  },
  //增加推送点赞事件列表
  // [types.ADD_FRIENDEVTLIST](state, friendEvtList) {
  //   let friendEvtObj = {
  //     evtType: 1,
  //     from: friendEvtList
  //   }
  //   state.friendEvtList.push(friendEvtObj)
  // },
  //新增送礼弹框内容
  [types.ADD_GIFTINFO](state, giftInfo) {
    //console.log(giftInfo);
    state.topUpCommonInfo.content.extMsg.goodInfo.extInfo.name = giftInfo.nameValue;
    state.topUpCommonInfo.content.extMsg.goodInfo.extInfo.type = giftInfo.typeValue;
  },
  //更新好友事件消息框内容
  [types.UPDATE_DYNAMICMESSAGE](state, friendEvtObj) {

    console.log("mutation friendEvtObj----------", friendEvtObj)
    let cacheOpenId = sessionStorage.getItem('identity') ? sessionStorage.getItem('identity') : state.userInfo.openid
    if (friendEvtObj.identiry && (friendEvtObj.identiry != cacheOpenId)) { //判断是否发送给当前分身，是才弹框
      return
    }

    //如果和本人聊天信封弹框不在对话框弹出
    // if (!friendEvtObj.content.fromInfo) { //粗暴解决msgCode=4  无法推送的bug
    //     friendEvtObj.content.extMsg = {
    //         lastMsg: {},
    //     };
    //     friendEvtObj.content.fromInfo = {
    //         openid: "",
    //         headimgurl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540966911743&di=b3b81acff7cdc59f21ec7cbde8b13298&imgtype=0&src=http%3A%2F%2Fpic20.photophoto.cn%2F20110928%2F0017030291764688_b.jpg"
    //     }
    //     friendEvtObj.content.extMsg.lastMsg['msg'] = "店长给你发优惠券啦";
    //     state.dynamicFriendEvt = friendEvtObj.content;
    //     return;
    // }
    // debugger
    switch (friendEvtObj.msgCode) {
      case 1:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          allInfo: friendEvtObj.content.extMsg
        };
        if (friendEvtObj.content.extMsg.allInfo.lastMsg.chatExtMsg) {
          state.allMutatualInfo = friendEvtObj
          //console.log('msgCode为1的消息----------------', state.allMutatualInfo)
        }
        if (state.staticChatFriendObj.openid == friendEvtObj.content.fromInfo.openid) { //在聊天页面不弹聊天通知信封
          return false;
        }
        if (friendEvtObj.content.extMsg.allInfo.lastMsg.type == 1) { //判断是否是聊天消息
          friendEvtObj.content.extMsg.lastMsg['msg'] = friendEvtObj.content.fromInfo.nickname + "发你一条消息";
          friendEvtObj.content["notifyType"] = 1;
          state.dynamicFriendEvt = friendEvtObj.content;
          return
        }

        break;
      case 2:
        //console.log('点赞详情--------', friendEvtObj)
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          thumbInfo: friendEvtObj.content.extMsg
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "有人给你点赞啦,希望和成为好友";
        // state.dynamicFriendEvt = friendEvtObj.content;
        state.topUpThumbInfo = friendEvtObj;
        break;
      case 3:
        // if (state.staticChatFriendObj.openid == friendEvtObj.content.fromInfo.openid) { //在聊天页面不弹框
        //     return false;
        // }
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          goodInfo: friendEvtObj.content.extMsg
        };
        // friendEvtObj.content.extMsg.lastMsg['msg'] = "有人给你送礼啦";
        // state.dynamicFriendEvt = friendEvtObj.content;
        //console.log('friendEvtObj.content------', friendEvtObj.content)
        state.topUpCommonInfo = friendEvtObj;
        break;
      case 4:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "店长给你发优惠券啦";
        friendEvtObj.content["notifyType"] = 4;
        // console.log("state.dynamicFriendEvt----", friendEvtObj.content)
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 6:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "店长发布活动啦";
        friendEvtObj.content["notifyType"] = 6;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 7: //约你游戏
        // if (state.staticChatFriendObj.openid === friendEvtObj.content.fromInfo.openid) { //在聊天页面不弹聊天通知信封
        //     return false;
        // }
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          gameInfo: friendEvtObj.content.extMsg
        };
        // friendEvtObj.content.extMsg.lastMsg['msg'] = "好友邀请你进游戏玩啦";
        // state.dynamicFriendEvt = friendEvtObj.content;
        state.topUpGameInfo = friendEvtObj
        // console.log('好友邀请你进游戏玩-----------', friendEvtObj)
        break;
      case 8: //上线通知
        if (friendEvtObj.content.fromInfo.openid === cacheOpenId) { //切换分身时不给自己发上线通知
          return
        }
        if (state.staticChatFriendObj.openid == friendEvtObj.content.fromInfo.openid) { //在聊天页面不弹聊天通知信封
          return false;
        }
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = friendEvtObj.content.fromInfo.nickname + (friendEvtObj.content.fromInfo.onlineType === "k98" ? "进入找朋友专区啦" : "进入游戏大厅啦");
        friendEvtObj.content["notifyType"] = 8;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 9:
        // console.log("999----friendEvtObj", friendEvtObj)
        let shopSendText = friendEvtObj.content.extMsg
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "获得分享福利" + shopSendText + "积分";
        friendEvtObj.content["notifyType"] = 9;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 12: //店长推荐和礼品商城
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          goodInfo: friendEvtObj.content.extMsg
        };
        // friendEvtObj.content.extMsg.lastMsg['msg'] = "有人给你送礼啦";
        // state.dynamicFriendEvt = friendEvtObj.content;
        //console.log('friendEvtObj.content------', friendEvtObj.content)
        state.topUpCommonInfo = friendEvtObj;
        break
      case 13:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "回赞你成为好友啦";
        friendEvtObj.content["notifyType"] = 13;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 14:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "收了你的礼物啦";
        friendEvtObj.content["notifyType"] = 14;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 15:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "拒收了你的礼物,积分已退回给您";
        friendEvtObj.content["notifyType"] = 15;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 16:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "拒绝和你玩游戏";
        friendEvtObj.content["notifyType"] = 16;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 18:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
        };
        friendEvtObj.content.extMsg.lastMsg['msg'] = "拒绝你的好友请求";
        friendEvtObj.content["notifyType"] = 17;
        state.dynamicFriendEvt = friendEvtObj.content;
        break;
      case 19: //约你再战游戏
        // if (state.staticChatFriendObj.openid == friendEvtObj.content.fromInfo.openid) { //在聊天页面不弹聊天通知信封
        //     return false;
        // }
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          gameInfo: friendEvtObj.content.extMsg
        };
        // friendEvtObj.content.extMsg.lastMsg['msg'] = "好友邀请你进游戏玩啦";
        // state.dynamicFriendEvt = friendEvtObj.content;
        state.topUpGameInfo = friendEvtObj
        //console.log('好友邀请你进游戏玩-----------', friendEvtObj)
        break;
      case 21: //监听灵魂匹配推送
        state.soulFriInfo = friendEvtObj
        break;
      case 24:
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          gameInfo: friendEvtObj.content.extMsg
        };
        // friendEvtObj.content.extMsg.lastMsg['msg'] = "好友邀请你进游戏玩啦";
        // state.dynamicFriendEvt = friendEvtObj.content;
        state.topUpGameInfo = friendEvtObj
        //console.log('队列约战你进游戏玩-----------', friendEvtObj)
        break;
      case 27: //店员送券活动
        friendEvtObj.content.extMsg = {
          lastMsg: {},
          goodInfo: friendEvtObj.content.extMsg
        };
        state.topUpCommonInfo = friendEvtObj;
        break
      case 29: //贵宾上线通知
        state.topUpCommonInfo = friendEvtObj;
        break
      case 30:
        state.topUpGameInfo = friendEvtObj
        //console.log('mutation 友商互推-----------', friendEvtObj)
        break;
      default:
        break;
    }
  },
  //清楚所有弹窗data
  [types.CLEARTOPUPDATA](state) {
    state.topUpGameInfo = {}
    state.topUpCommonInfo = {}
    state.topUpThumbInfo = {}
    state.soulFriInfo = {}
    state.allMutatualInfo = {}
  },
  //获取好友事件
  // [types.GET_FRIENDEVTLIST](state, {
  //   data
  // }) {
  //   state.event_badgeCount = data.events.length //获取未读好友事件数量
  //   state.friendEvtList = data.events
  // },
  // //获取好友送礼
  // [types.GET_FRIENDGIFTLIST](state, {
  //   data
  // }) {
  //   state.gift_badgeCount = data.length;
  //   // //console.log('收礼列表-----------------', state.friendGiftList)
  //   data.forEach(item => {
  //     item.time = util.timestampToTime(item.time);
  //   })
  //   state.friendGiftList = data;
  // },
  //获取系统消息列表
  [types.GET_CAPTAINMESSAGELIST](state, {
    data
  }) {
    state.group_badgeCount = 0
    // console.log("系统通知列表---", data)
    data.forEach(item => {
      item.time = util.timestampToTime(item.time).slice(5, 10)
      if (item.unread) {
        state.group_badgeCount++
      }
      switch (item.type) {
        case 1:
          item['name'] = `门店公告新活动啦，去看看>`
          item['img'] = `../../assets/image/${item.type}.png`
          break;
        case 2:
          item['name'] = `大话骰比赛开始啦，不服来战>`
          item['img'] = `../../assets/image/${item.type}.png`
          break;
        case 3:
          item['name'] = `邀请新朋友，双重厚礼送您俩>`
          item['img'] = `../../assets/image/${item.type}.png`
          break;
        case 4:
          item['name'] = `1元团购，兄弟们一起抢劫老板啰>`
          item['img'] = `../../assets/image/${item.type}.png`
          break;
        case 5:
          item['name'] = `您参与得比赛结束啦！查看名次>`
          item['img'] = `../../assets/image/${item.type}.png`
          break;
        case 6:
          item['name'] = `一张优惠券已经存入卡券包>`
          item['img'] = `../../assets/image/${item.type}.png`
          break;
        case 7:
          item['name'] = `拼团成功,团购券已存入卡券包>`
          item['img'] = `../../assets/image/${item.type}.png`
          break;
        case 9:
          item['name'] = `拼团中奖通知>`
          item['img'] = `../../assets/image/10.png`
          break;
        case 10:
          item['name'] = `您参加的拼团中奖啦！奖品券已存入卡券包`
          item['img'] = `../../assets/image/11.png`
          break;
        default:
          break;
      }
    })
    state.captainMessageList = data;
  },
  //获取约战消息列表
  // [types.GET_CHALLENGEGAMELIST](state, gameMessage) {
  //   state.challengeGameList.push(gameMessage);
  //   state.game_badgeCount = state.challengeGameList.length;
  // },
  //清空约战列表
  // [types.CLEAR_CHALLENGEGAMELIST](state) {
  //   state.game_badgeCount = state.challengeGameList.length;
  // },
  //统计客服未读数量
  [types.GETCLIENTUNREADCOUNT](state, count) {
    state.client_badgeCount = count
  },
  //统计收银未读数量
  [types.GETCASHIERUNREADCOUNT](state, count) {
    state.cashier_badgeCount = count
  },
  //统计分身未读消息
  [types.ADDDIVIDEUNREADMSG](state, count) {
    state.divide_badgeCount = count
  },
  //累加分身未读消息
  [types.ADDDIVIDENUM](state, count) {
    state.divide_badgeCount += count
  },
  //统计约战，送礼，点赞数量
  [types.GET_ALLEVENTS_BADGECOUNT](state, count) {
    state.manualEventsList_badgeCount = count
  },
  //所有类型的未读消息累加总的未读消息里面
  [types.ADD_BADGE](state) {
    // console.log("计算总未读数manualEventsList_badgeCount", state.manualEventsList_badgeCount)
    state.badgeCount = state.msg_badgeCount + state.event_badgeCount +
      state.manualEventsList_badgeCount + state.client_badgeCount +
      state.group_badgeCount + state.cashier_badgeCount;
  },
  //设置候选人聊天的信息
  [types.SET_CHAT_FRIEND](state, data) {
    // data.info.isIndoor = data.isInDoor
    state.staticChatFriendObj = data.info ? data.info : data
  },
  //设置动态聊天朋友信息
  [types.GET_DYNAMICFRIENDOBJ](state, data) {
    //来消息人的id
    state.chatFriendObj_id = data.content.from;
    // 未读消息
    state.badgeCount = data.content.count;
  },
  //更新聊天列表
  [types.UPDATE_CHATLIST](state, obj) {
    // //console.log('state.LastChatMsg：```````````````````````````````````````', obj)
    state.LastChatMsg = obj
  },
  //更新客服聊天
  [types.UPDATE_CLIENTMSG](state, obj) {
    console.log('state.clientLastChatMsg```````````````````````````````````````', obj)
    state.clientLastChatMsg = obj
    state.client_badgeCount = obj.extMsg.count
  },
  //更新收银聊天
  [types.UPDATE_CASHIERMSG](state, obj) {
    state.cashierLastChatMsg = obj
    state.cashier_badgeCount = obj.extMsg.count
  },
  //更新聊天输入框
  [types.UPDATE_INPUTVALUE](state, val) {
    state.inputValue = val
  },
  // 初始化websocket
  [types.CONNECT_WEBSOCKET](state, data) {
    state.socket = data;
  },
  // 更改已经成为好友游标的变化
  [types.CHANGE_CURSOR](state, cursor) {
    state.alreadyFriendListcursor = cursor
  },
  //更改场内场外好友游标
  [types.UPDATE_INANDOUT_FRIEND_CURSOR](state, cursor) {
    state.inAndOutFriendCursor = cursor
  },
  //更改分享链接
  [types.UPDATE_SHAREURL](state, url) {
    state.shareUrl = url;
  },
  //更改候选人浮标
  [types.CHANGE_FRIENDlISTCURSOR](state, cursor) {
    state.friendListCursor = cursor;
  },
  //获取礼物
  [types.GET_GIFTLIST](state, giftList) {
    state.giftList = giftList
  },
  //获取活动通知
  [types.GET_ACTIVITY_NOTICE](state, activityNoticeList) {
    state.activityNoticeList = activityNoticeList;
  },
  //获取门店信息
  [types.GET_SHOPINFO](state, shopSettingInfo) {
    if (shopSettingInfo.industryType === "商会" ||
      shopSettingInfo.industryType === "校友会" ||
      shopSettingInfo.industryType === "协会" ||
      shopSettingInfo.industryType === "社群") {
      shopSettingInfo.isEntityShop = false
    } else {
      shopSettingInfo.isEntityShop = true
    }
    state.shopSettingInfo = shopSettingInfo;
    console.log("门店信息：", state.shopSettingInfo)
  },
  //判断邀请有礼是否还有
  [types.JUDGE_INVITE_COUPON](state, noCouponsFlag) {
    state.noCouponsFlag = noCouponsFlag;
  },
  //获取首页轮播图
  [types.GET_ADVERTISINGIMG](state, AdvertisingPhoto) {
    state.AdvertisingPhoto = AdvertisingPhoto;
  },
  //修改配对成功弹框显示
  [types.CHANGEFRIENDPANELFLAG](state, flag) {
    state.friendPanelFlag = flag;
  },
  //l98功能开关设置
  [types.L98OTHERSETTING](state, otherSetting) {
    state.l98Setting = otherSetting
  },
  //保存旧照片
  [types.SAVEOLDPHOTOS](state, photos) {
    state.oldPhotos = photos
  },
  //保存供求发布者id
  [types.SAVEPUBLISHERID](state, IdList) {
    state.publisherIdList = IdList
  },
  //设置搜索群友时带svip参数
  [types.SETSEARCHFORSVIP](state, svip) {
    state.searchForSvip = svip
    console.log("state.searchForSvip----", state.searchForSvip)
  },
  //保存用户在其他友商信息
  [types.SAVEALLIANCEINFO](state, alliacneList) {
    state.otherWechatMsg = []
    alliacneList.forEach(item => {
      if (item.messageCount > 0) {
        state.otherWechatMsg.push(item)
      }
    })

    console.log("state.otherWechatMsg----", state.otherWechatMsg)
  },
  //测试
  [types.TEST](state, test) {
    state.test = test
  }
}

export default mutations
