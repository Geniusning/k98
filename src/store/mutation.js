import * as types from './mutation-types'
import axios from 'axios';
import api from 'common/api'
import util from "common/util";

const mutations = {
    [types.CHANGE_VALIDATE](state, flag) {
        state.isShow = flag;
    },
    //获取用户数据
    [types.GET_USERINFO](state, userinfo) {
        userinfo.sex = userinfo.sex === 1 ? "男" : "女"
        state.userInfo = userinfo
    },
    // 获取地理位置
    [types.GET_POSITION](state, position) {
        state.position = position
    },
    //获取候选人好友列表
    [types.GET_FRIENDlIST](state, data) {
        // console.log(data.candidates)
        if (data.candidates.length == 0) {
            return
        }
        state.friendList = data.candidates;
        state.friendList.forEach(item => {
            if (item.info.sex == 1) {
                item.info.sex = "男";
            } else {
                item.info.sex = "女";
            }
        });
    },
    //获取已经成为好友列表
    [types.GET_ALREADYFRIENDEVTLIST](state, { data }) {
        var totalCount = 0;
        console.log(data)
        let tempData = [];
        data.forEach((item, index) => {
            if (item.info.lastMsg) { //如果有最新消息的 
                item.info.lastMsg.stime = util.timestampToTime(item.info.lastMsg.stime)
                // console.log(item.info.lastMsg.stime)
            }
            //如果有未读消息，把有未读消息的那一项放到顶部
            if (item.info.unReadMsgCount>0){
                tempData.unshift(item);
            }else{
                tempData.push(item)
            }
            totalCount += item.info.unReadMsgCount  //累计未读消息
        })
        state.msg_badgeCount = totalCount

        state.alreadyFriendList = tempData;
    },
    //获取新消息时重新排列消息列表，把最新的一项放到顶部
    [types.TO_TOP_MESSAGE](state, friendList) {
        state.alreadyFriendList = friendList
    },
    //推送最后的一个消息跟已有好友消息列表对比
    [types.COMPARE_LASTMESS](state, lastMsgFrom) {
        let totalCount = 0;
        state.alreadyFriendList.forEach(item => {
            if (lastMsgFrom.lastMsg.from === item.info.openid) {
                // debugger
                lastMsgFrom.lastMsg.stime = util.timestampToTime(lastMsgFrom.lastMsg.stime)
                item.info.lastMsg = lastMsgFrom.lastMsg
                item.info.unReadMsgCount = lastMsgFrom.count;
            }
            totalCount += item.info.unReadMsgCount //累计未读消息   
        })
        state.msg_badgeCount = totalCount;
        state.badgeCount = state.msg_badgeCount + state.event_badgeCount
    },
    //增加推送点赞事件列表
    [types.ADD_FRIENDEVTLIST](state, friendEvtList) {
        let friendEvtObj = {
            evtType: 1,
            from: friendEvtList,
        }
        state.friendEvtList.push(friendEvtObj)
    },
    //更新好友事件消息框内容
    [types.UPDATE_DYNAMICMESSAGE](state, friendEvtObj) {
        friendEvtObj['msg'] = "给你点了赞"
        console.log(friendEvtObj)
        state.dynamicFriendEvt = friendEvtObj
    },
    //获取好友事件
    [types.GET_FRIENDEVTLIST](state, { data }) {
        let count = data.events.length
        state.event_badgeCount = count //获取未读好友事件数量
        state.friendEvtList = data.events
    },
    //所有类型的未读消息累加总的未读消息里面
    [types.ADD_BADGE](state) {
        let total = 0;
        total = state.msg_badgeCount + state.event_badgeCount;
        state.badgeCount = total;
    },
    //设置候选人聊天的信息
    [types.SET_CHAT_FRIEND](state, data) {
        state.staticChatFriendObj = data.info
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
        state.LastChatMsg = obj
    },
    //更新聊天输入框
    [types.UPDATE_INPUTVALUE](state, val) {
        state.inputValue = val
    },
    // 初始化websocket
    [types.CONNECT_WEBSOCKET](state, data) {
        state.socket = data;
    },
    // 游标的变化
    [types.CHANGE_CURSOR](state, cursor) {
        state.FriendListcursor = cursor
    },
    //更改场内场外好友游标
    [types.UPDATE_INANDOUT_FRIEND_CURSOR](state, cursor) {
        state.inAndOutFriendCursor = cursor
    },
    //测试
    [types.TEST](state, test) {
        state.test = test
    }
}

export default mutations