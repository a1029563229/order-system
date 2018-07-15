const state = {
    info: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
}

const mutations = {
    SET_USER_INFO(state, info) {
        state.info = info;
    }
}

const actions = {
    setUserInfo({ commit }, info) {
        // do something async
        commit('SET_USER_INFO', info)
    }
}

export default {
    state,
    mutations,
    actions
}
