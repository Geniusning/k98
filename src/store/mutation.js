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
        console.log(data.candidates)
        state.friendList.forEach(item => {
            item.info.thumb = "99";
            item.info.gift = "100";
            item.info.constellation = "水瓶座";
            item.info.signature = "如果我能看的见，就能分辨白天黑夜";
            item.info.tags = ['傻帽', '多动症', "卡哇伊"];
            item.info.id = item.xid;
            if (item.info.sex == 1) {
                item.info.sex = "男";
            } else {
                item.info.sex = "女";
            }
        });
        console.log(state.friendList)
    },
    //获取已经成为好友列表
    [types.GET_ALREADYFRIENDEVTLIST](state, { data }) {
        // console.log(data)
        state.alreadyFriendList = data;
    },
    //获取好友事件
    [types.GET_FRIENDEVTLIST](state, { data }) {
        let count = data.events.length
        count = count === 0 ? -1 : count;
        state.badgeCount += count
        state.friendEvtList = data.events
    },
    //badge自增
    // [types.ADD_BADGE](state, count) {
    //     count = count === 0 ? -1 : count;
    //     state.badgeCount += count
    // },
    //测试
    [types.TEST](state, test) {
        state.test = test
    }
}

export default mutations