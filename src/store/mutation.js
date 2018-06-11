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
        state.userInfo = userinfo
    },
    // 获取地理位置
    [types.GET_POSITION](state, position) {
        state.position = position
    },
    //获取候选人好友列表
    [types.GET_FRIENDlIST](state, { data }) {
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
        // console.log(data)
        data.forEach((item, index) => {
            if (item.info.lastMsg) { //如果有最新消息的 
                console.log(util.timestampToTime(item.info.lastMsg.stime))
                item.info.lastMsg.stime = util.timestampToTime(item.info.lastMsg.stime)
            }
        })
        state.alreadyFriendList = data;
    },
    //推送最后的一个消息跟已有好友消息列表对比
    [types.COMPARE_LASTMESS](state, lastMsgFrom) {
        state.alreadyFriendList.forEach(item => {
            if (lastMsgFrom.lastMsg.from === item.info.openid) {
                lastMsgFrom.lastMsg.stime = util.timestampToTime(lastMsgFrom.lastMsg.stime)
                item.info.lastMsg = lastMsgFrom.lastMsg
                item.info.unReadMsgCount = lastMsgFrom.count;   
            }
        })
    },
    //获取好友事件
    [types.GET_FRIENDEVTLIST](state, { data }) {
        // console.log(data)
        let count = data.events.length
        count = count === 0 ? -1 : count;
        state.badgeCount += count
        state.friendEvtList = data.events
    },

    //设置静态聊天朋友的信息
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
        state.cursor = cursor
    },
    //badge自增
    [types.ADD_BADGE](state, count) {
        count = count === 0 ? -1 : count;
        state.badgeCount += count
    },
    //测试
    [types.TEST](state, test) {
        state.test = test
    }
}

export default mutations