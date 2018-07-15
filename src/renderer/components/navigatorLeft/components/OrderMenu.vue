<template>
  <section class="order-group">
      <section class="order-menu">
          <div class="order-header">
              <div class="flex-between order-options">
                  <div>
                        <el-button type="primary" @click="toggleMenu('mainMenu')">菜单</el-button>
                  </div>
                  <div class="button-options flex-left">
                        <el-button type="primary" @click="locationHref('/order')">挂单</el-button>
                        <el-badge :value="12" class="item">
                          <el-button type="primary" @click="locationHref('/order')">取单</el-button>
                        </el-badge>
                        <el-button type="primary" @click="toggleMenu('mainMenu')">取消</el-button>
                  </div>
              </div>
              <div class="nickname" @click="switchOperation(operationType.validate)">
                  <span>微信昵称：</span>    
                  <p>超长超长超长超长超长超长超长超长超长超长</p>
              </div>
          </div>
          <div class="order-container">
              <div class="order-list-container">
                  <ol class="order-list">
                      <li v-for="(goods, index) in goodsList" :key="index" :class="{'active': activeGoodsIndex === index}" @click="setCurrent(index)">
                          <span class="goods-name">{{goods.productName | lenLimit(10)}}</span>
                          <span>{{goods.size || ''}}</span>
                          <span class="goods-price">￥{{goods.salePrice | toPrice}}</span>
                          <span class="goods-num">x{{goods.count}}</span>
                      </li>
                  </ol>
                  <div class="price-total">
                      共 {{goodsList.length}} 项   ￥{{totalPrice | toPrice}}
                  </div>
              </div>
              <div class="order-operations">
                  <el-button plain v-for="(operation, index) in operations" 
                  :key="index" 
                  @click="chooseOperationByIndex(index)" 
                  :class="{'active': currentOperation === operation.identifier}">{{operation.name}}</el-button>
              </div>
          </div>
          <el-button class="payment" type="primary" @click="switchOperation(operationType.ensureIdentity)">收银￥{{totalPrice | toPrice}}</el-button>
          <transition name="order-operation-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
            <section class="floating-box" v-if="currentOperation !== '' && currentOperation !== operationType.remove">
              <div class="inside-box">
                <goods-count ref="goodsCount" v-if="currentOperation === operationType.count"></goods-count>
                <goods-sku v-if="currentOperation === operationType.sku"></goods-sku>
                <goods-remark ref="goodsRemark" v-if="currentOperation === operationType.remark"></goods-remark>
                <goods-seat v-if="currentOperation === operationType.seat"></goods-seat>
                <member-validate v-if="currentOperation === operationType.validate"></member-validate>
                <ensure-identity v-if="currentOperation === operationType.ensureIdentity" @orderOperation="switchOperation"></ensure-identity>
                <ensure-order v-if="currentOperation === operationType.ensureOrder"></ensure-order>
                <ensure-member v-if="currentOperation === operationType.ensureMember"></ensure-member>
                <ensure-seat v-if="currentOperation === operationType.ensureSeat"></ensure-seat>
              </div>
              <div class="floating-close" @click="clearOperation">X</div>
              <el-button class="ensure-btn" type="primary" @click="operationHandler">确认</el-button>
          </section>
        </transition>
          <transition name="order-operation-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
            <member-pay-way v-if="currentLayerType === layerType.payWay" @memberOperation="evokeLayer"></member-pay-way>
            <member-pay-code v-if="currentLayerType === layerType.payCode" @memberOperation="evokeLayer"></member-pay-code>
            <member-pay-result v-if="currentLayerType === layerType.payResult"></member-pay-result>
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
  MemberPayResult
} from "@/components/member";

export default {
  name: "orderMenu",

  data() {
    return {
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
      currentOperation: "SKU",
      previousOperation: ""
    };
  },

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
    MemberPayResult,
    MemberPayWay,
    MemberPayCode,
    MemberPayResult
  },

  methods: {
    ...mapActions([
      "setCurrent",
      "modifyCount",
      "removeProduct",
      "setProperty"
    ]),

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
      this.previousOperation = this.currentOperation;
      this.currentOperation = operation;
    },

    clearOperation() {
      this.currentOperation = "";
    },

    operationHandler() {
      const prevOperations = [
        this.operationType.ensureMember,
        this.operationType.ensureSeat
      ];

      if (
        this.include(prevOperations, this.currentOperation) &&
        this.previousOperation
      ) {
        this.switchOperation(this.previousOperation);
        return;
      }

      switch (this.currentOperation) {
        default:
          this.clearOperation();
          break;
        case this.operationType.count:
          this.setGoodsCount();
          this.switchOperation(this.operationType.sku);
          break;
        case this.operationType.remark:
          this.setGoodsRemark();
          this.switchOperation(this.operationType.seat);
          break;
        case this.operationType.ensureIdentity:
          this.switchOperation(this.operationType.ensureOrder);
          break;
        case this.operationType.ensureOrder:
          this.clearOperation();
          this.evokeLayer(this.layerType.payWay);
          break;
      }
    },

    setGoodsCount() {
      let count = this.$refs.goodsCount.count;
      this.modifyCount(count);
    },

    setGoodsRemark() {
      console.log(this.$refs.goodsRemark);
      let remark = this.$refs.goodsRemark.remark;
      this.setProperty({
        key: "remark",
        value: remark
      });
    }
  },

  computed: {
    goodsList() {
      return this.$store.state.product.productList;
    },

    activeGoodsIndex() {
      return this.$store.state.product.currentIndex;
    },

    totalPrice() {
      let totalPrice = 0;
      totalPrice = this.goodsList.reduce((totalPrice, goods) => {
        return (totalPrice += goods.count * goods.salePrice);
      }, totalPrice);
      return totalPrice;
    }
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
            width: 40%;
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



