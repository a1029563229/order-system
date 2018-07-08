<template>
    <layer title="确认充值账户和充值金额" confirm="去充值" @btnHandler="btnHandler">
        <div class="member-recharge">
            <div class="recharge-item">
                <span>会员号码</span>
                <span>18244913996</span>
            </div> 
            <div class="recharge-item">
                <span>账户余额</span>
                <span>￥800.00</span>
            </div> 
            <el-input placeholder="请输入充值金额" v-model="amount" type="string"></el-input>
            <calculator class="calculator"></calculator>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import Calculator from "@/components/common/Calculator.vue";

export default {
  name: "memberRechargeCount",

  data() {
    return {
      
    };
  },

  components: {
    Layer,
    Calculator
  },

  methods: {
    btnHandler(val) {
      if (val) {
        this.memberOperation(this.$parent.layerType.payWay);
      }
    }
  },

  computed: {
    amount() {
      return this.$store.state.common.calculatorVal;
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


