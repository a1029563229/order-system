
const state = {
    productList: [
        {
            "updatedTime": "2018-06-22T09:51:00.000+0000",
            "productId": 2233,
            "salePrice": 120,
            "smarketPrice": 0,
            "originalImg": "/aigou/shop/20180621/160797a5-7b26-4992-90d5-0c042c71b814.jpg",
            "cateId1": 1035,
            "cateId2": 1036,
            "thumbImg": "/aigou/shop/20180621/160797a5-7b26-4992-90d5-0c042c71b814.jpg",
            "cateId3": 1037,
            "attList": [
                {
                    "attributeId": 2310,
                    "attributeValueId": 9740,
                    "attributeValueName": "621",
                    "attributeName": "商品测试621"
                }
            ],
            "attrName": "621",
            "productNum": "152956758172129603",
            "specAttributeValIds": "9740",
            "managerId": 2668,
            "productPinyin": "CSSP",
            "productName": "2测试商品标题621",
            "specConfig": "1",
            "specAttributeIds": "2310",
            "integral": 0,
            "createdTime": "2018-06-21T07:53:03.000+0000",
            "state": 0,
            "shopId": 1334,
            "stock": 99,
            "skuCustom": "2311:测试属性621:621",
            "officialState": 1,
            "count": 1
        }
    ],

    currentIndex: 0,

    memberInfo: null,
    ensureIdeType: 1
}

const mutations = {
    ADD_PRODUCT(state, product) {
        state.productList.push(Object.assign({}, product, {
            count: 1,
            attrName: product.attList 
                ? product.attList.map(attr => attr.attributeValueName).join("、")
                : "暂无规格"
        }));
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
    },

    MODIFY_ENSURE_IDENTITY_TYPE(state, ensureIdeType) {
        state.ensureIdeType = ensureIdeType;
    },

    SET_MEMBER_INFO(state, memberInfo) {
        state.memberInfo = memberInfo;
    }
}

const actions = {
    addProduct({ commit }, product) {
        commit('ADD_PRODUCT', product);
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
    },

    modifyEnsureType({ commit }, ensureIdeType) {
        commit('MODIFY_ENSURE_IDENTITY_TYPE', ensureIdeType);
    },

    setMemberInfo({ commit }, memberInfo) {
        commit("SET_MEMBER_INFO", memberInfo);
    }
}

export default {
    state,
    mutations,
    actions
}
