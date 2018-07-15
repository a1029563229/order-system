const state = {
    productList: [
        {
            "updatedTime": "2018-06-22T09:51:00.000+0000",
            "productId": 2232,
            "salePrice": 199,
            "originalImg": "/aigou/shop/20180621/eefd7a5d-c983-4600-bf67-184cb7e817ad.jpg",
            "cateId1": 1035,
            "cateId2": 1036,
            "thumbImg": "/aigou/shop/20180621/eefd7a5d-c983-4600-bf67-184cb7e817ad.jpg",
            "cateId3": 1037,
            "PurchasePrice": 100,
            "productNum": "1529565208498-1503",
            "specAttributeValIds": "",
            "managerId": 2668,
            "productPinyin": "CSSP",
            "productName": "测试商品标题621",
            "specConfig": "0",
            "specAttributeIds": "",
            "integral": 0,
            "createdTime": "2018-06-21T07:14:17.000+0000",
            "state": 0,
            "shopId": 1334,
            "stock": 99,
            "skuCustom": "2311:测试属性621:621",
            "remarks": "备注信息测试",
            "officialState": 1,
            "count": 1
        }
    ],

    currentIndex: 0
}

const mutations = {
    ADD_PRODUCT(state, product) {
        let productIndex = state.productList.findIndex(item => item.productId === product.productId);
        if (!!~productIndex) {
            state.productList[productIndex].count++;
        } else {
            state.productList.push(Object.assign({}, product, {
                count: 1
            }));
        }
    },

    REMOVE_PRODUCT(state) {
        state.productList.splice(state.currentIndex, 1);
        state.currentIndex = state.currentIndex - 1 > 0 ? state.currentIndex - 1 : 0;
    },

    SET_CURRENT_OPERATION_PRODUCT_INDEX(state, index) {
        state.currentIndex = index;
    },

    MODIFY_PRODUCT_COUNT(state, count) {
        let currentIndex = state.currentIndex;
        state.productList[currentIndex].count = parseFloat(count);
    },

    SET_PRODUCT_PROPERTY(state, obj) {
        let currentIndex = state.currentIndex;
        state.productList[currentIndex][obj.key] = obj.value;
    }
}

const actions = {
    addProduct({ commit }, product) {
        commit('ADD_PRODUCT', product)
    },

    removeProduct({ commit }) {
        commit('REMOVE_PRODUCT')
    },

    setCurrent({ commit }, index) {
        commit('SET_CURRENT_OPERATION_PRODUCT_INDEX', index);
    },

    modifyCount({ commit }, count) {
        commit('MODIFY_PRODUCT_COUNT', count);
    },

    setProperty({ commit }, obj) {
        commit('SET_PRODUCT_PROPERTY', obj);
    }
}

export default {
    state,
    mutations,
    actions
}
