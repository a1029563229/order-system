<template>
    <layer title="请确认支付条码" confirm="确认支付" @btnHandler="btnHandler">
        <div class="member-recharge">
            <el-input placeholder="扫码识别支付条码或者手动输入" v-model="authCode" type="string"></el-input>
            <calculator class="calculator"></calculator>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import Calculator from "@/components/common/Calculator.vue";
import { mapActions } from "vuex";

export default {
  name: "memberRecharge",

  data() {
    return {
      authCode: ""
    };
  },

  components: {
    Layer,
    Calculator
  },

  methods: {
    ...mapActions(["setCalculatorVal", "setUserPayInfo"]),

    btnHandler(val) {
      if (val) {
        if (!this.authCode) {
          this.$message.warning("请输入支付条码");
          return;
        }

        let api_url = "";
        switch (this.payInfo.payWay) {
          case 0:
            if (this.payInfo.payType === 1) {
              api_url = "pay/dianPay/weixin";
            } else {
              api_url = "pay/orderPay/weixin";
            }
            break;
          case 1:
            if (this.payInfo.payType === 1) {
              api_url = "pay/dianPay/zhifubao";
            } else {
              api_url = "pay/orderPay/zhifubao";
            }
            break;
        }
        this.payForByOrder(this.payInfo.payType, api_url);
      }
    },

    payForByOrder(payType, api_url) {
      let payParams = {
        authCode: this.authCode,
        payType: this.payInfo.payWay,
        userMobile: this.memberInfo ? this.memberInfo.userMobile : undefined,
        suTspableId: this.tableInfo ? this.tableInfo.tableId : undefined,
        productList: JSON.stringify(this.$store.state.product.productList)
      };

      if (payType === 1) {
        // 点单
        payParams = Object.assign({}, payParams, {
          payModel: this.payInfo.payModel,
          totalPrice: this.orderInfo.totalPrice,
          payPrice: this.orderInfo.payPrice
        });
      } else if (payType === 2) {
        // 订单
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

      this.$message.success("请提醒用户在手机上继续完成操作");
      this.$axios
        .post(api_url, payParams)
        .then(res => {
          this.$message.success("支付成功!");
          this.memberOperation(this.layerType.payResult);
          this.setUserPayInfo({
            key: "stepNo",
            value: res[0].stepNo
          });
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  },

  computed: {
    code() {
      return this.$store.state.common.calculatorVal;
    }
  },

  watch: {
    authCode(val) {
      this.setCalculatorVal(val);
    },

    "$store.state.common.calculatorVal"(val) {
      if (this.authCode === val) return;
      this.authCode = val;
    }
  }
};
</script>
<style lang="less" scoped>
.member-recharge {
  .calculator {
    margin-top: 50px;
  }
}
</style>


