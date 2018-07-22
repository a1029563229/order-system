<template>
    <layer title="选择支付方式" confirm="立即支付" @btnHandler="btnHandler">
        <div class="member-pay-way">
            <el-button 
            v-for="(payWay, index) in payWays" 
            :key="index" 
            v-if="isShowStored(index)"
            @click="selectPayWay(payWay.type)"
            >{{payWay.title}}</el-button>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import { goodsMixin } from "../navigatorLeft/components/goods.mixin";
import { mapActions } from "vuex";

export default {
  name: "memberPayWay",

  mixins: [goodsMixin],

  data() {
    return {
      payWay: ""
    };
  },

  components: {
    Layer
  },

  methods: {
    ...mapActions(["setPayWay"]),

    isShowStored(index) {
      return index !== 3 || this.memberInfo;
    },

    selectPayWay(payWay) {
      this.payWay = payWay;
    },

    btnHandler(boo) {
      if (boo) {
        if (this.payWay === "") {
          this.$message.warning("请选择至少一种支付方式！");
          return;
        }

        this.setPayWay(this.payWay);
        switch (this.payWay) {
          default:
            break;
          case 0:
            this.memberOperation(this.layerType.payCode);
            break;
          case 2:
            this.payForByRechargeOrder(this.payInfo.payType);
            break;
          case 4:
            this.memberOperation(this.layerType.payResult);
            break;
        }
      }
    },

    payForByRechargeOrder(payType) {
      let payParams = {
        payType: this.payInfo.payWay,
        userMobile: this.memberInfo ? this.memberInfo.userMobile : undefined,
        suTspableId: this.tableInfo ? this.tableInfo.tableId : undefined,
        productList: JSON.stringify(this.$store.state.product.productList)
      };
      let api_url = "";

      if (payType === 1) { // 点单
        api_url = "pay/dianPay/storagePay";
        payParams = Object.assign({}, payParams, {
          totalPrice: this.orderInfo.totalPrice,
          payPrice: this.orderInfo.payPrice
        });
      } else if (payType === 2) { // 订单
        api_url = "pay/orderPay/storagePay";
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
          this.$message.success("支付成功!");
          this.memberOperation(this.layerType.payResult);
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.member-pay-way {
  button {
    padding: 30px 18px;
    width: 45%;
    margin-right: 30px;
    margin-left: 0;
    margin-bottom: 20px;
  }
  :nth-child(even) {
    margin-right: 0;
  }
}
</style>


