<template>
    <section class="flex-between calculator-container">
          <el-button plain v-for="(control, index) in controls" :key="index">{{control}}</el-button>
    </section>
</template>
<script>
export default {
  name: "calculator",

  data() {
    return {
      controls: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", "delete"]
    };
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