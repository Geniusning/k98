import axios from 'axios';
import api from 'common/api'
import util from "common/util";

const actions = {
    //获取候选人列表
    get_Friendlist({ commit, state }, params) {
        api.getFriendList(params).then(res => {
            console.log(res)
            commit("GET_FRIENDlIST", { data: res })
        })
    },

    //获取已经成为好友列表
    get_alreadyFriendList({ commit, state }, cursor) {
        api.loadFriends().then(res => {
            console.log(res)
            commit('GET_ALREADYFRIENDEVTLIST', { data: res.friends })
        })
    },

    // 获取好友事件
    get_FriendEvt({ commit, state }, cursor) {
        api.loadFriendEvts(cursor).then(res => {
            commit("GET_FRIENDEVTLIST", { data: res })
        })
    }
}

export default actions