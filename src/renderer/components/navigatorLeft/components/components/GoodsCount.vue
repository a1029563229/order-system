<template>
    <section class="goods-count">
        <h1 class="goods-title">数量 - 这里是商品名称</h1>
        <p class="prompt">请选择商品数量</p>
        <div class="count-container">
            <div class="add">+</div>
            <div class="count">{{count}}</div>
            <div class="desc">-</div>
        </div>
        <div class="calculator-container">
          <calculator></calculator>
        </div>
    </section>
</template>
<script>
import Calculator from "@/components/common/Calculator.vue";

export default {
  name: "goodsCount",

  components: {
    Calculator
  },

  computed: {
    count() {
      return this.$store.state.common.calculatorVal;
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../../plugins/assets/css/flex.less);
.goods-title {
  font-size: 1.2vw;
}
.prompt {
  color: @blue;
  margin: 2vw 0;
}

.count-container {
  width: 100%;
  text-align: center;
  font-size: 2vw;
  border: 1px solid rgba(210, 210, 210, 1);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  font-weight: bold;
  .flex-between;
  .count {
    width: 40%;
  }
  div {
    flex-grow: 1;
    cursor: pointer;
  }
}
.calculator-container {
  margin-top: 5vw;
}
</style>


