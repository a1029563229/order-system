<template>
    <section class="flex-between calculator-container">
          <el-button plain v-for="(key, index) in keys" :key="index" @click="calculatorInputHandler(key)">{{key}}</el-button>
    </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "calculator",

  data() {
    return {
      input: null,
      keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "delete"]
    };
  },

  props: {
    id: {
      type: String,
      default: "calculator"
    }
  },

  methods: {
    ...mapActions(["setCalculatorVal", "clearCalculatorVal"]),

    calculatorInputHandler(key) {
      switch (key) {
        default:
          this.setInputVal(key);
          break;
        case ".":
          this.setDecimalPoint(key);
          break;
        case "delete":
          this.deleteInputVal();
          break;
      }
    },

    setInputVal(val) {
      this.setCalculatorVal(this.calculatorVal + val);
    },

    setDecimalPoint(key) {
      if (this.include(this.calculatorVal, ".") || !this.calculatorVal.length) {
        return;
      }

      this.setInputVal(key);
    },

    deleteInputVal() {
      if (!this.calculatorVal.length) {
        return;
      }

      this.setCalculatorVal(
        this.calculatorVal.slice(0, this.calculatorVal.length - 1)
      );
    }
  },

  computed: {
    calculatorVal() {
      return this.$store.state.common.calculatorVal;
    }
  },

  mounted() {
    console.log(this);
  },

  destroyed() {
    this.clearCalculatorVal();
  }
};
</script>
<style lang="less" scoped>
@import url(../../plugins/assets/css/flex.less);

.calculator-container {
  flex-wrap: wrap;
  width: 100%;
  button {
    background: rgba(238, 239, 240, 1);
    border: 1px solid @gray;
    width: 30%;
    padding-left: 0;
    padding-right: 0;
    margin: 0;
    margin-bottom: 10px;
  }
}
</style>