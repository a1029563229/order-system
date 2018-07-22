<template>
  <section class="order-group">
      <section class="order-menu">
          <div class="order-header">
              <div class="flex-between order-options">
                  <div>
                        <el-button type="primary" @click="toggleMenu('mainMenu')">菜单</el-button>
                  </div>
                  <div class="button-options flex-left">
                        <el-button type="primary" @click="addOrder">挂单</el-button>
                        <el-badge :value="orderNotPayCount" class="item">
                          <el-button type="primary" @click="locationHref('/order')">取单</el-button>
                        </el-badge>
                        <el-button type="primary" @click="clearOrderInfo">垃圾箱</el-button>
                  </div>
              </div>
              <div class="nickname" @click="switchOperation(operationType.ensureIdentity);modifyEnsureType(1);ensureModel = 1;">
                  <template v-if="memberInfo">
                    <span>会员账号</span>    
                    <p>{{memberInfo.userMobile}}</p>
                  </template>
                  <template v-else-if="tableInfo">
                    <span>桌号</span>    
                    <p>{{tableInfo.tableName | lenLimit(5)}}</p>
                  </template>
                  <div class="validate-identity" v-else>
                    身份验证
                  </div>
              </div>
          </div>
          <div class="order-container">
              <div class="order-list-container">
                  <ol class="order-list">
                      <li v-for="(goods, index) in goodsList" :key="index" :class="{'active': activeGoodsIndex === index}" @click="setCurrent(index);clearOperation();">
                          <span class="goods-name">{{goods.productName | lenLimit(5)}}</span>
                          <span>{{goods.attrName | lenLimit(5)}}</span>
                          <span class="goods-price">￥{{goods.salePrice | toPrice}}</span>
                          <span class="goods-num">x{{goods.count}}</span>
                      </li>
                  </ol>
                  <div class="price-total">
                      共 {{goodsList.length}} 项   ￥{{orderInfo.totalPrice | toPrice}}
                  </div>
              </div>
              <div class="order-operations">
                  <el-button plain v-for="(operation, index) in operations" 
                  :key="index" 
                  @click="chooseOperationByIndex(index);" 
                  :class="{'active': currentOperation === operation.identifier}">{{operation.name}}</el-button>
              </div>
          </div>
          <el-button class="payment" type="primary" @click="readyToPayFor">收银￥{{orderInfo.totalPrice | toPrice}}</el-button>
          <transition name="order-operation-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
            <section class="floating-box" v-if="currentOperation !== '' && currentOperation !== operationType.remove">
              <div class="inside-box">
                <goods-count ref="goodsCount" v-if="currentOperation === operationType.count"></goods-count>
                <goods-sku ref="goodsSku" v-if="currentOperation === operationType.sku"></goods-sku>
                <goods-remark ref="goodsRemark" v-if="currentOperation === operationType.remark"></goods-remark>
                <goods-seat ref="goodsSeat" v-if="currentOperation === operationType.seat"></goods-seat>
                <member-validate ref="memberValidate" v-if="currentOperation === operationType.validate" @orderOperation="switchOperation"></member-validate>
                <ensure-identity v-if="currentOperation === operationType.ensureIdentity" @orderOperation="switchOperation"></ensure-identity>
                <ensure-order v-if="currentOperation === operationType.ensureOrder"></ensure-order>
                <ensure-member v-if="currentOperation === operationType.ensureMember"></ensure-member>
                <ensure-seat ref="ensureSeat" v-if="currentOperation === operationType.ensureSeat"></ensure-seat>
              </div>
              <div class="floating-close" @click="clearOperation">X</div>
              <el-button class="ensure-btn" type="primary" @click="operationHandler">确认</el-button>
          </section>
        </transition>
          <transition name="order-operation-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
            <member-info v-if="currentLayerType === layerType.info" @memberOperation="evokeLayer"></member-info>
            <member-pay-way v-if="currentLayerType === layerType.payWay" @memberOperation="evokeLayer"></member-pay-way>
            <member-pay-code v-if="currentLayerType === layerType.payCode" @memberOperation="evokeLayer"></member-pay-code>
            <member-pay-order v-if="currentLayerType === layerType.payOrder" @memberOperation="evokeLayer"></member-pay-order>
            <member-pay-result v-if="currentLayerType === layerType.payResult" @memberOperation="evokeLayer"></member-pay-result>
          </transition>
      </section>
      <transition name="order-operation-transition"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">
        <div class="order-mb" v-if="currentOperation !== '' && currentOperation !== operationType.remove"></div>
      </transition>
    </section>
</template>
<script>
import { mapActions } from "vuex";
import { goodsMixin } from "./goods.mixin";

import {
  GoodsCount,
  GoodsSku,
  GoodsSeat,
  GoodsRemark,
  MemberValidate,
  EnsureIdentity,
  EnsureOrder,
  EnsureMember,
  EnsureSeat
} from "./components";

import {
  MemberPayWay,
  MemberPayCode,
  MemberPayResult,
  MemberPayOrder,
  MemberInfo
} from "@/components/member";

export default {
  name: "orderMenu",

  data() {
    return {
      orderNotPayCount: 0,

      operations: [
        {
          name: "数量",
          identifier: "COUNT"
        },
        {
          name: "规格/做法",
          identifier: "SKU"
        },
        {
          name: "备注",
          identifier: "REMARK"
        },
        {
          name: "座位号",
          identifier: "SEAT"
        },
        {
          name: "删除",
          identifier: "REMOVE"
        }
      ],
      operationType: {
        count: "COUNT",
        sku: "SKU",
        remark: "REMARK",
        seat: "SEAT",
        remove: "REMOVE",
        validate: "VALIDATE",
        ensureIdentity: "ENSURE_IDENTITY",
        ensureOrder: "ENSURE_ORDER",
        ensureMember: "ENSURE_MEMBER",
        ensureSeat: "ENSURE_SEAT"
      },
      currentOperation: "",
      ensureModel: 0 // 1 认证 2 认证后支付
    };
  },

  mixins: [goodsMixin],

  components: {
    GoodsCount,
    GoodsSku,
    GoodsSeat,
    GoodsRemark,
    MemberValidate,
    EnsureIdentity,
    EnsureOrder,
    EnsureMember,
    EnsureSeat,
    MemberPayWay,
    MemberPayCode,
    MemberPayResult,
    MemberPayOrder,
    MemberInfo
  },

  methods: {
    ...mapActions([
      "setCurrent",
      "modifyCount",
      "removeProduct",
      "setAttrList",
      "setProperty",
      "modifyEnsureType",
      "setTableInfo",
      "setPayModel",
      "setUserPayInfo",
      "toggleMenu"
    ]),

    addOrder() {
      if (!this.validateOrderCondition()) return;

      let loading = this.$loading();
      let payPrice = this.computedPayPrice(
          this.orderInfo.totalPrice,
          this.memberInfo
        ),
        userMobile = this.memberInfo ? this.memberInfo.userMobile : null,
        suTspableId = this.tableInfo ? this.tableInfo.tableId : null;

      this.$axios
        .post("order/suspend", {
          totalPrice: this.orderInfo.totalPrice,
          payPrice,
          userMobile,
          suTspableId,
          productList: JSON.stringify(this.goodsList)
        })
        .then(res => {
          loading.close();
          this.clearOrderInfo();
          this.$message.success("挂单成功！");
          this.$router.push("/order");
        });
    },

    validateOrderCondition() {
      try {
        if (!this.goodsList.length) {
          throw new Error("请至少选择一件商品！");
        }

        if (!this.memberInfo && !this.tableInfo) {
          throw new Error("请完成会员认证或桌号认证！");
        }
      } catch (e) {
        this.$message.warning(e.message);
        return false;
      }

      return true;
    },

    readyToPayFor() {
      if (!this.goodsList.length) {
        this.$message.warning("请选择至少一项商品！");
        return;
      }
      this.ensureModel = 2;
      this.switchOperation(this.operationType.ensureIdentity);
    },

    chooseOperationByIndex(index) {
      if (!this.goodsList.length) {
        return;
      }

      this.currentOperation = this.operations[index].identifier;

      if (this.currentOperation === this.operationType.remove) {
        this.removeProduct();
      }
    },

    switchOperation(operation) {
      this.currentOperation = operation;
    },

    clearOperation() {
      this.currentOperation = "";
    },

    operationHandler() {
      switch (this.currentOperation) {
        default:
          this.clearOperation();
          break;
        case this.operationType.count:
          this.setGoodsCount();
          this.switchOperation(this.operationType.sku);
          break;
        case this.operationType.sku:
          this.setGoodsSku();
          this.switchOperation(this.operationType.remark);
          break;
        case this.operationType.remark:
          this.setCustomProperty("goodsRemark", "remark");
          this.switchOperation(this.operationType.seat);
          break;
        case this.operationType.seat:
          this.setCustomProperty("goodsSeat", "tableId");
          this.setCustomProperty("goodsSeat", "seatNo");
          this.clearOperation();
          break;
        case this.operationType.validate:
          this.validateMember();
          break;
        case this.operationType.ensureSeat:
          this.setTableInfo(this.$refs.ensureSeat.tableInfos);
          if (this.ensureModel === 1) {
            this.switchOperation(this.operationType.ensureIdentity);
          } else {
            this.switchOperation(this.operationType.ensureOrder);
          }
          break;
        case this.operationType.ensureIdentity:
          this.identityHandler();
          break;
        case this.operationType.ensureOrder:
          this.clearOperation();
          this.setPayModel(1);
          this.setUserPayInfo({
            key: "payType",
            value: 1
          });
          this.evokeLayer(this.layerType.payWay);
          break;
      }
    },

    setGoodsCount() {
      let count = this.$refs.goodsCount.count;
      this.modifyCount(count);
      this.setProperty({
        key: "stock",
        value: count
      });
    },

    setGoodsSku() {
      this.setAttrList(this.$refs.goodsSku.attList);
      this.searchProductPrice();
    },

    searchProductPrice() {
      let currentProduct = this.goodsList[this.activeGoodsIndex],
        attList = currentProduct.attList
          .map(product => product.attributeValueId)
          .join(","),
        productId = currentProduct.productId;

      if (!attList) {
        return;
      }
      this.$axios
        .post("shop/product/price", {
          productId,
          attList
        })
        .then(salePriceList => {
          if (!this.isDef(salePriceList)) {
            this.$message.error("该商品数据出现问题，请联系管理员处理！");
            return;
          }

          let salePrice = salePriceList[0].salePrice;
          if (!isNaN(+salePrice)) {
            this.setProperty({
              key: "salePrice",
              value: +salePrice
            });
          }
        });
    },

    setCustomProperty(refName, name) {
      let value = this.$refs[refName][name];
      this.setProperty({
        key: name,
        value
      });
    },

    validateMember() {
      let memberValidate = this.$refs.memberValidate;
      memberValidate.validateMember();
    },

    identityHandler() {
      if (this.memberInfo || this.tableInfo) {
        this.switchOperation(this.operationType.ensureOrder);
      } else {
        this.$message.warning("请完成会员认证或桌号认证！");
      }
    },

    setOrderNotPayCount() {
      this.$axios
        .post("order/list", { currentPage: 1, orderState: 0 })
        .then(res => {
          this.orderNotPayCount = res.totalCount;
        });
    }
  },

  computed: {
    goodsList() {
      return this.$store.state.product.productList;
    },

    activeGoodsIndex() {
      return this.$store.state.product.currentIndex;
    }
  },

  mounted() {
    this.setOrderNotPayCount();
  }
};
</script>
<style lang="less" scoped>
@import url(../../../plugins/assets/css/flex.less);

.options-box {
  padding: 1vw;
  padding-top: 1.5vw;
  box-sizing: inherit;
}

.order-group {
  height: 100%;
}

.order-menu {
  width: 30vw;
  height: 100%;
  background: #f5f5f5;
  position: relative;
  z-index: 10;
  .order-header {
    height: 100px;
    box-sizing: border-box;
    background: @blue;
    color: #fff;
    .flex-between;
    flex-wrap: wrap;
    .order-options {
      flex-grow: 1;
      border-right: 1px solid #cecece;
      .options-box;
      flex-wrap: wrap;
      button {
        border: 1px solid #fff;
        margin-left: 0.1vw;
        font-size: 1vw;
        padding: 0.5vw 1.2vw;
        margin-left: 5px;
        outline: none;
        background: transparent;
      }
      .get-order-container {
        position: relative;
        display: inline;
        .order-count {
          position: absolute;
          top: -80%;
          right: 0;
          background: #ff0000;
          padding: 3px 5px;
          font-size: 12px;
          border-radius: 10px;
        }
      }
    }
    .nickname {
      width: 20%;
      height: 100%;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
      .options-box;
      .flex-auto;
      p {
        margin-top: 5px;
        width: 100%;
        height: 2em;
        overflow: hidden;
        text-overflow: ellipsis;
        // white-space: nowrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .validate-identity {
        font-size: 30px;
      }
    }
  }
  .order-container {
    height: 80vh;
    font-size: 0.8vw;
    .flex-between;
    align-items: flex-start;
    .order-list-container {
      flex-grow: 1;
      border-right: 1px solid #cecece;
      height: inherit;
      .order-list {
        overflow-y: auto;
        height: 90%;
        font-size: 1vw;
        color: @blue;
        li {
          padding: 1vw 0.5vw;
          padding-right: 1vw;
          cursor: pointer;
          border-bottom: 1px solid rgba(218, 219, 220, 1);
          .flex-between;
          > span {
            flex-grow: 1;
          }
          > :nth-child(1) {
            width: 30%;
          }
        }
        .active {
          background: rgba(224, 235, 237, 1);
        }
      }
      .price-total {
        margin: 0 0.5vw;
        padding: 1vw 0;
        box-sizing: border-box;
        text-align: right;
        border-top: 1px solid rgba(231, 231, 231, 1);
        border-bottom: 1px solid rgba(231, 231, 231, 1);
      }
    }
    .order-operations {
      width: 20%;
      box-sizing: border-box;
      padding: 1vw 1vw;
      font-size: inherit;
      button {
        width: 100%;
        margin-bottom: 15px;
        padding: 12px 5px;
        margin-left: 0;
        font-size: inherit;
        color: rgba(98, 99, 100, 1);
        border: 1px solid rgba(98, 99, 100, 0.5);
      }
      .active {
        background: @blue;
        color: #fff;
        border: 1px solid transparent;
      }
    }
  }
  .payment {
    display: block;
    background: @blue;
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
  }

  .floating-box {
    width: 20vw;
    height: 100%;
    background: #f5f5f5;
    position: absolute;
    right: -20vw;
    top: 0;
    z-index: 10;
    box-sizing: border-box;
    padding: 1.5vw;
    border-left: 1px solid @gray;
    .inside-box {
      height: 90%;
      overflow-y: auto;
    }
    .floating-close {
      position: absolute;
      right: 1.5vw;
      top: 1.5vw;
      font-size: 1.2vw;
      cursor: pointer;
    }
    .ensure-btn {
      background: @blue;
      position: absolute;
      bottom: 20px;
      width: 60%;
      left: 20%;
    }
  }
}

.order-mb {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.animated {
  animation-duration: 0.5s;
}
</style>



