<template>
    <section class="order-menu">
        <div class="order-header">
            <div class="flex-between order-options">
                <div>
                      <el-button type="primary" @click="toggleMenu('mainMenu')">菜单</el-button>
                </div>
                <div class="button-options flex-left">
                      <el-button type="primary">挂单</el-button>
                      <el-badge :value="12" class="item">
                        <el-button type="primary">取单</el-button>
                      </el-badge>
                      <el-button type="primary">取消</el-button>
                </div>
            </div>
            <div class="nickname" @click="chooseOperationByName('MEMBER')">
                <span>微信昵称：</span>    
                <p>超长超长超长超长超长超长超长超长超长超长</p>
            </div>
        </div>
        <div class="order-container">
            <div class="order-list-container">
                <ol class="order-list">
                    <li v-for="(goods, index) in goodsList" :key="index" :class="{'active': activeGoodsIndex === index}" @click="activeGoodsIndex = index">
                        <span class="goods-name">这里是商品名称</span>
                        <span>350ml</span>
                        <span class="goods-price">￥20.80</span>
                        <span class="goods-num">x1</span>
                    </li>
                </ol>
                <div class="price-total">
                    共 {{goodsList.length}} 项   ￥20.80
                </div>
            </div>
            <div class="order-operations">
                <el-button plain v-for="(operation, index) in operations" 
                :key="index" 
                @click="chooseOperationByIndex(index)" 
                :class="{'active': currentOperation === operation.identifier}">{{operation.name}}</el-button>
            </div>
        </div>
        <el-button class="payment" type="primary">收银￥12.00</el-button>
        <transition name="order-operation-transition"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
          <section class="floating-box" v-if="currentOperation !== '' && currentOperation !== 'DELETE'">
            <goods-count v-if="currentOperation === 'COUNT'"></goods-count>
            <goods-sku v-if="currentOperation === 'SKU'"></goods-sku>
            <goods-remark v-if="currentOperation === 'REMARK'"></goods-remark>
            <goods-seat v-if="currentOperation === 'SEAT'"></goods-seat>
            <member-validate v-if="currentOperation === 'MEMBER'"></member-validate>
            <ensure-identity v-if="currentOperation === ensureType.identity"></ensure-identity>
            <ensure-order v-if="currentOperation === ensureType.order"></ensure-order>
            <ensure-member v-if="currentOperation === ensureType.member"></ensure-member>
            <ensure-seat v-if="currentOperation === ensureType.seat"></ensure-seat>
            <div class="floating-close" @click="clearOperation">X</div>
            <el-button class="ensure-btn" type="primary">确认</el-button>
        </section>
      </transition>
    </section>
</template>
<script>
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
import { setTimeout, setInterval } from "timers";

export default {
  name: "orderMenu",

  data() {
    return {
      goodsList: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7],
      activeGoodsIndex: 0,
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
          identifier: "DELETE"
        }
      ],
      ensureType: {
        identity: "IDENTITY",
        order: "ORDER",
        member: "MEMBER",
        seat: "ENSURE_SEAT",
      },
      currentOperation: "ENSURE_SEAT",
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
    EnsureSeat
  },

  methods: {
    chooseOperationByIndex(index) {
      this.currentOperation = this.operations[index].identifier;
    },

    chooseOperationByName(identifier) {
      this.currentOperation = identifier;
    },

    clearOperation() {
      this.currentOperation = "";
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

.order-menu {
  width: 30vw;
  height: 100%;
  background: #f5f5f5;
  position: relative;
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
    margin-top: 15px;
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

.animated {
  animation-duration: 0.5s;
}
</style>



