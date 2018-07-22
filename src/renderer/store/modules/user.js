const state = {
    info: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null,

    payInfo: {
        payType: 0, // 1 点单 2 订单
        stepNo: 0,
        payWay: 4,
        payModel: 1,
        orderCount: 0,
        orderList: []
    }
}

const mutations = {
    SET_USER_INFO(state, info) {
        state.info = info;
    },

    SET_PAY_WAY(state, payWay) {
        state.payInfo.payWay = payWay;
    },

    SET_PAY_MODEL(state, payModel) {
        state.payInfo.payModel = payModel;
    },

    SET_PAY_INFO(state, params) {
        state.payInfo[params.key] = params.value;
    },

    CLEAR_PAY_INFO(state) {
        state.payInfo = {};
    }
}

const actions = {
    setUserInfo({ commit }, info) {
        // do something async
        commit('SET_USER_INFO', info)
    },

    setPayWay({ commit }, payWay) {
        commit('SET_PAY_WAY', payWay);
    },

    setPayModel({ commit }, payModel) {
        commit('SET_PAY_MODEL', payModel);
    },

    setUserPayInfo({ commit }, params) {
        commit("SET_PAY_INFO", params);
    },

    clearPayInfo({ commit }) {
        commit("CLEAR_PAY_INFO");
    }
}

export default {
    state,
    mutations,
    actions
}
