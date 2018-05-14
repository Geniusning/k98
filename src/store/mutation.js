import * as types from './mutation-types'
import axios from 'axios';
import api from 'common/api'

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
    //获取好友列表
    [types.GET_FRIENDlIST](state, cursor) {
        api.getFriendList(cursor).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },
    //测试
    [types.TEST](state, test) {
        state.test = test
    }
}

export default mutations