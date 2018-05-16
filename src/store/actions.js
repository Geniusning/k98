import axios from 'axios';
import api from 'common/api'
import util from "common/util";

const actions = {
    get_Friendlist({ commit, state }, params) {
        api.getFriendList(params).then(res => {
            console.log(res)
            commit("GET_FRIENDlIST", { data: res })
            // $router.push({
            //     name: "friend"
            // })
            // util.routerTo("friend", playload.this)
        })
        // commit('GET_FRIENDlIST')
    }
}

export default actions