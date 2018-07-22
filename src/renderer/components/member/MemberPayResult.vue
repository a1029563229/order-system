<template>
    <layer title="关闭" confirm="确认" @btnHandler="btnHandler">
        <div class="member-pay-result">
            <div class="pay-by-cash" v-if="isCashNow">
                <div class="recharge-item">
                    <span>应付金额</span>
                    <span>￥{{orderInfo.payPrice | toPrice}}</span>
                </div> 
                <div class="recharge-item">
                    <span>实付金额</span>
                    <el-input placeholder="输入金额" v-model="money" type="string"></el-input>
                </div> 
                <div class="recharge-item">
                    <span>找零</span>
                    <span>￥{{Change}}</span>
                </div> 
                <calculator class="calculator"></calculator>
            </div>
            <template v-else>
                <div class="recharge-item">
                    <span>应付金额</span>
                    <span>￥{{orderInfo.payPrice | toPrice}}</span>
                </div> 
                <div class="recharge-item">
                    <span>实付金额</span>
                    <span>￥{{orderInfo.payPrice | toPrice}}</span>
                </div> 
                <div class="recharge-item">
                    <span>交易流水</span>
                    <span>{{payInfo.stepNo}}</span>
                </div> 
                <div class="recharge-item" v-if="memberInfo">
                    <span>账户余额</span>
                    <span>￥{{memberInfo.nowBalance | toPrice}}</span>
                </div> 
                <div class="recharge-item">
                    <span>支付方式</span>
                    <span>{{payInfo.payWay | payWay}}</span>
                </div> 
            </template>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import Calculator from "@/components/common/Calculator.vue";
import { goodsMixin } from "../navigatorLeft/components/goods.mixin";
import { mapActions } from "vuex";

export default {
  name: "memberRecharge",

  mixins: [goodsMixin],

  data() {
    return {
      isCashNow: false,
      money: ""
    };
  },

  components: {
    Layer,
    Calculator
  },

  methods: {
    ...mapActions(["setUserPayInfo"]),

    btnHandler(val) {
      if (val) {
        if (!this.isCashNow) {
          this.$store.dispatch("operatingLayer");
          return;
        }

        if (isNaN(+this.money) || !this.money) {
          this.$message.error("实付金额有误");
          return;
        }

        if (this.money < this.orderInfo.payPrice) {
          this.$message.error("实付金额必须大于应付金额！");
          return;
        }

        this.payForByCash(this.payInfo.payType);
      }
    },

    payForByCash(payType) {
      let payParams = {
        payType: this.payInfo.payWay,
        payModel: this.payInfo.payModel,
        userMobile: this.memberInfo ? this.memberInfo.userMobile : undefined,
        suTspableId: this.tableInfo ? this.tableInfo.tableId : undefined,
        productList: JSON.stringify(this.$store.state.product.productList),
        sholdReceive: this.orderInfo.payPrice,
        reallyReceived: this.money
      };
      let api_url = "";

      if (payType === 1) {
        // 点单
        api_url = "pay/dianPay/money";
        payParams = Object.assign({}, payParams, {
          payPrice: this.orderInfo.payPrice,
          totalPrice: this.orderInfo.totalPrice
        });
      } else if (payType === 2) {
        // 订单
        api_url = "pay/orderPay/money";
        payParams = Object.assign({}, payParams, {
          orderList: JSON.stringify(this.payInfo.orderList),
          orderTotalAmount: this.orderInfo.payPrice,
          orderNumStr: this.payInfo.orderList
            .map(order => order.orderId)
            .join("、")
        });
      } else {
        this.$message.error("支付类型错误");
        return;
      }

      this.$axios
        .post(api_url, payParams)
        .then(res => {
          this.isCashNow = false;
          this.$message.success("支付成功!");
          this.setUserPayInfo({
            key: "stepNo",
            value: res[0].stepNo
          });
        })
        .catch(error => {
          this.$message.error(error);
        });
    },

    setIsCashNow() {
      if (this.payInfo.payWay === this.payMethods.CASH) {
        this.isCashNow = true;
      } else {
        this.isCashNow = false;
      }
    }
  },

  computed: {
    Change() {
      let Change =
        ((this.money || 0) * 100 - this.orderInfo.payPrice * 100) / 100;
      return Change < 0 ? 0 : Change;
    },

    payWay() {
      return this.$store.state.user.payInfo.payWay;
    }
  },

  watch: {
    "$store.state.common.calculatorVal"(val) {
      this.money = val;
    }
  },

  filters: {
    payWay(val) {
      switch (val) {
        default:
          return "未知";
        case 0:
          return "微信支付";
        case 1:
          return "支付宝";
        case 2:
          return "储值支付";
        case 4:
          return "现金支付";
      }
    }
  },

  mounted() {
    this.setIsCashNow();
  },

  destroyed() {
    this.clearOrderInfo();
  }
};
</script>
<style lang="less" scoped>
@import "../../plugins/assets/css/flex.less";

.member-pay-result {
  .calculator {
    margin-top: 50px;
  }
  .pay-by-cash {
    .recharge-item {
      margin-bottom: 20px;
      .flex-between;
      .el-input {
        width: 150px;
      }
    }
  }
}
</style>


