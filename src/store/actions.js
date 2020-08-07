
import api from 'common/api'
const actions = {
    //获取候选人列表
    get_Friendlist({commit,state}, cursor,sex) {
        api.getFriendList(cursor,sex).then(res => {
            //console.log('候选人数据：·····················', res);
            commit("CHANGE_FRIENDlISTCURSOR", res.cursor);
            commit("GET_FRIENDlIST", res);
        })
    },
    //获取更多候选人信息
    get_moreFriendList({commit,state}, cursor,sex) {
        api.getFriendList(cursor,sex).then(res => {
            //console.log('更多候选人数据：·····················', res);
            if (res.cursor == 0) {
                commit("get_LESSTHAN10FRIENDLIST", res.candidates);
                commit("CHANGE_FRIENDlISTCURSOR", res.cursor);
                return false;
            }
            commit("CHANGE_FRIENDlISTCURSOR", res.cursor);
            commit("GET_MOREFRIENDlIST", res.candidates);
        })
    },
    //获取已经成为好友列表
    get_alreadyFriendList({commit,state}, cursor) {
        api.loadFriends().then(res => {
            // //console.log(res)
            commit('GET_ALREADYFRIENDEVTLIST', {
                data: res.friends
            });
            commit('ADD_BADGE');
        })
    },

    // 获取好友点赞事件
    // get_FriendEvt({ commit, state }, cursor) {
    //     api.loadFriendEvts(cursor).then(res => {
    //         commit("GET_FRIENDEVTLIST", { data: res });
    //         commit('ADD_BADGE');
    //     })
    // },
    //获取好友送礼事件
    // get_FriendGift({ commit, state }) {
    //     api.loadGiftsRecord().then(res => {
    //         commit("GET_FRIENDGIFTLIST", { data: res.giftRecord });
    //         commit('ADD_BADGE');
    //     })
    // },
    //获取店长群发通知
    get_captainMessageList({ commit }) {
        api.loadUserNotice().then(res => {
            // console.log('店长群发消息-----------------', res)
            commit("GET_CAPTAINMESSAGELIST", { data: res.info })
            commit('ADD_BADGE')
        })
    },
    //场内好友接口
    get_loadInsideCandidates({ commit, state }, cursor) {
        api.getLoadInsideCandidates(cursor).then(res => {
            commit("GET_FRIENDlIST", res);
        })
    },
    //更新聊天列表
    update_chatList({
        commit,
        state
    }) {

    }
}

export default actions