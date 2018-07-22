
const state = {
    productList: [],

    currentIndex: 0,

    // memberInfo: null,
    memberInfo: {
        "nowBalance": 994000,
        "discountLevel": 98,
        "userLevel": "vip2",
        "userIdStr": "96cc4a70970c4caf8a4d659d3bea7733",
        "userMobile": "15220060077",
        "nickName": "偷偷",
        "userId": 12437
    },

    tableInfo: null,
    ensureIdeType: 1,
    menuType: "mainMenu"
}

const mutations = {
    SET_PRODUCT_LIST(state, productList) {
        state.productList = productList;
    },

    ADD_PRODUCT(state, product) {
        state.productList.push(Object.assign({}, product, {
            count: 1,
            attrName: product.attList
                ? product.attList.map(attr => attr.attributeValueName).join("、")
                : "暂无规格"
        }));

        if (state.menuType === 'mainMenu') {
            state.menuType = 'orderMenu';
        }
    },

    REMOVE_PRODUCT(state) {
        state.productList.splice(state.currentIndex, 1);
        state.currentIndex = state.currentIndex - 1 > 0 ? state.currentIndex - 1 : 0;
    },

    CLEAR_PRODUCT_LIST(state) {
        state.productList = [];
    },

    SET_CURRENT_OPERATION_PRODUCT_INDEX(state, index) {
        state.currentIndex = index;
    },

    MODIFY_PRODUCT_COUNT(state, count) {
        let currentIndex = state.currentIndex;
        state.productList[currentIndex].count = parseFloat(count);
    },

    SET_PRODUCT_ATTR_LIST(state, attList) {
        let currentIndex = state.currentIndex;
        state.productList[currentIndex]['attList'] = attList;
        state.productList[currentIndex]['attrName'] = attList.map(attr => attr.attributeValueName).join("、");
    },

    SET_PRODUCT_PROPERTY(state, obj) {
        let currentIndex = state.currentIndex;
        state.productList[currentIndex][obj.key] = obj.value;
    },

    MODIFY_ENSURE_IDENTITY_TYPE(state, ensureIdeType) {
        state.ensureIdeType = ensureIdeType;
    },

    SET_MEMBER_INFO(state, memberInfo) {
        state.memberInfo = memberInfo;
        state.tableInfo = null;
    },

    SET_TABLE_INFO(state, tableInfo) {
        state.tableInfo = tableInfo;
        state.memberInfo = null;
    },

    CLEAR_VALIDATE_INFO(state) {
        state.memberInfo = null;
        state.tableInfo = null;
    },

    TOGGLE_MENU_TYPE(state, menuType) {
        state.menuType = menuType;
    }
}

const actions = {
    setProductList({ commit }, productList) {
        commit("SET_PRODUCT_LIST", productList)
    },

    addProduct({ commit }, product) {
        commit('ADD_PRODUCT', product);
    },

    removeProduct({ commit }) {
        commit('REMOVE_PRODUCT')
    },

    clearProductList({ commit }) {
        commit("CLEAR_PRODUCT_LIST");
    },

    setCurrent({ commit }, index) {
        commit('SET_CURRENT_OPERATION_PRODUCT_INDEX', index);
    },

    modifyCount({ commit }, count) {
        commit('MODIFY_PRODUCT_COUNT', count);
    },

    setAttrList({ commit }, attList) {
        commit("SET_PRODUCT_ATTR_LIST", attList);
    },

    setProperty({ commit }, obj) {
        commit('SET_PRODUCT_PROPERTY', obj);
    },

    modifyEnsureType({ commit }, ensureIdeType) {
        commit('MODIFY_ENSURE_IDENTITY_TYPE', ensureIdeType);
    },

    setMemberInfo({ commit }, memberInfo) {
        commit("SET_MEMBER_INFO", memberInfo);
    },

    setTableInfo({ commit }, tableInfo) {
        commit("SET_TABLE_INFO", tableInfo);
    },

    clearValidateInfo({ commit }) {
        commit("CLEAR_VALIDATE_INFO");
    },
    
    toggleMenu({commit}, menuType) {
        commit("TOGGLE_MENU_TYPE", menuType);
    }
}

export default {
    state,
    mutations,
    actions
}
