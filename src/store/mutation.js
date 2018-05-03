import * as types from './mutation-types'

const mutations = {
    [types.CHANGE_VALIDATE](state, flag) {
        state.isShow = flag;
    },
    //获取用户数据
    [types.GET_USERINFO](state, userinfo) {
        state.userInfo = userinfo
    },
    //测试
    [types.TEST](state, test) {
        state.test = test
    }
}

export default mutations