const state = {
    layerCount: 0,
    calculatorVal: ""
}

const mutations = {
    INCREMENT_LAYER_COUNTER(state) {
        state.layerCount++
    },

    SET_CALCULATOR_VAL(state, val) {
        state.calculatorVal = val;
    }
}

const actions = {
    operatingLayer({ commit }) {
        // do something async
        commit('INCREMENT_LAYER_COUNTER')
    },

    setCalculatorVal({ commit }, val) {
        commit("SET_CALCULATOR_VAL", val);
    },

    clearCalculatorVal({ commit }) {
        commit("SET_CALCULATOR_VAL", "");
    }
}

export default {
    state,
    mutations,
    actions
}
