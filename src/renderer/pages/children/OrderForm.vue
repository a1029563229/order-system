<template>
    <section class="order-form flex-between">
        <div class="goods-list">
          <ol>
              <li v-for="(goods, index) in goodsList" :key="index" @click="addProduct(goods)">
                  <div class="img-control">
                    <img :src="absImgUrl + goods.originalImg" alt="">
                    <el-button type="primary">￥{{goods.salePrice | toPrice}}</el-button>
                  </div>
                  <p>{{goods.productName}}</p>
              </li>
          </ol>
        </div>
        <ul class="classification">
            <li v-for="(category, index) in categoryList" :key="index" :class="{'active': index === activeCategory}" @click="activeCategory = index;getGoodsList(category.cateId)">
                {{category.cateName}}
            </li>
        </ul>
    </section>
</template>
<script>
import $ from "jquery";
import { mapActions } from "vuex";

export default {
  name: "orderForm",

  data() {
    return {
      goodsList: [],

      categoryList: [],
      activeCategory: 0
    };
  },

  methods: {
    ...mapActions(["addProduct"]),

    getCategoryList() {
      this.$axios.post("shop/product/cateList").then(categoryList => {
        this.categoryList = categoryList;
        this.getGoodsList(categoryList[0].cateId);
      });
    },

    getGoodsList(cateId) {
      this.$axios
        .post("shop/product/list", {
          shopId: this.userInfo.shopId,
          cateId
        })
        .then(goodsList => {
          this.goodsList = goodsList;
        });
    }
  },

  mounted() {
    if (!this.userInfo) return;

    this.getCategoryList();
  }
};
</script>
<style lang="less" scoped>
@import "../../plugins/assets/css/flex.less";

.order-form {
  flex-grow: 1;
  height: 100%;
  background: @blue;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  .goods-list {
    flex-grow: 1;
    height: 100%;
    background: #fff;
    border-radius: 3px 0 0 0;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 60px 40px;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    ol {
      position: absolute;
      left: 60px;
      top: 40px;
      width: 100%;
      height: 100%;
      display: flex;
      display: flex;
      justify-content: left;
      align-items: flex-start;
      flex-wrap: wrap;
      li {
        width: 160px;
        height: 200px;
        margin-right: 40px;
        margin-bottom: 40px;
        cursor: pointer;
        .img-control {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 15px;
          img {
            width: 160px;
            height: 160px;
          }
          button {
            position: absolute;
            bottom: 0;
            left: 0;
            background: @blue;
            width: 100%;
            border-radius: 0;
          }
        }
      }
    }
  }
  .classification {
    width: 140px;
    height: 100%;
    background: #fff;
    border-radius: 3px 0 0 0;
    overflow: auto;
    box-sizing: border-box;
    padding: 26px 17px;
    li {
      padding: 20px 15px;
      font-size: 18px;
      color: rgba(69, 69, 69, 1);
      border-radius: 10px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .active {
      background: rgba(92, 179, 227, 1);
      color: #fff;
    }
  }
}
</style>

