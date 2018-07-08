<template>
    <layer title="请确认支付条码" confirm="去充值" @btnHandler="btnHandler">
        <div class="member-recharge">
            <el-input placeholder="扫码识别支付条码或者手动输入" v-model="code" type="string"></el-input>
            <calculator class="calculator"></calculator>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import Calculator from "@/components/common/Calculator.vue";

export default {
  name: "memberRecharge",

  data() {
    return {};
  },

  components: {
    Layer,
    Calculator
  },

  methods: {
    btnHandler(val) {
      if (val) {
        this.memberOperation(this.$parent.layerType.payResult);
      }
    }
  },

  computed: {
    code() {
      return this.$store.state.common.calculatorVal
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


