<template>
    <layer title="选择充值的会员" confirm="去充值" @btnHandler="btnHandler">
        <div class="member-recharge">
            <el-input placeholder="请输入手机号/会员号或者扫码识别" v-model="phone" type="string"></el-input>
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
    return {

    }
  },

  components: {
    Layer,
    Calculator
  },

  methods: {
    btnHandler(val) {
      if (val) {
        this.memberOperation(this.$parent.layerType.rechargeCount);
      }
    }
  },

  computed: {
    phone() {
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


