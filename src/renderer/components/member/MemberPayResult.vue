<template>
    <layer title="确认支付" confirm="充值完成">
        <div class="member-pay-result">
            <div class="pay-by-cash" v-if="currentPayType === payType.cash">
                <div class="recharge-item">
                    <span>应付金额</span>
                    <span>￥500.00</span>
                </div> 
                <div class="recharge-item">
                    <span>实付金额</span>
                    <el-input placeholder="输入金额" v-model="ruleForm.name" type="number"></el-input>
                </div> 
                <div class="recharge-item">
                    <span>找零</span>
                    <span>￥60.00</span>
                </div> 
                <calculator class="calculator"></calculator>
            </div>
            <template v-if="currentPayType === payType.wechat">
                <div class="recharge-item">
                    <span>应付金额</span>
                    <span>￥500.00</span>
                </div> 
                <div class="recharge-item">
                    <span>实付金额</span>
                    <span>￥500.00</span>
                </div> 
                <div class="recharge-item">
                    <span>交易流水</span>
                    <span>12233333333</span>
                </div> 
                <div class="recharge-item">
                    <span>账户余额</span>
                    <span>￥500.00</span>
                </div> 
                <div class="recharge-item">
                    <span>支付方式</span>
                    <span>微信支付</span>
                </div> 
            </template>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import Calculator from "@/components/common/Calculator.vue";

export default {
  name: "memberRecharge",

  data() {
    return {
      ruleForm: {
        name: ""
      },

      payType: {
        cash: "CASH",
        wechat: "WECHAT"
      }
    };
  },

  props: {
    currentPayType: {
      type: String,
      default: "WECHAT"
    }
  },

  components: {
    Layer,
    Calculator
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


