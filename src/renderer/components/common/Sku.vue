<template>
    <section class="flex-between sku-container">
          <el-button plain v-for="(sku, index) in skus" :key="index" 
          :class="{'active': index === activeIndex}" 
          @click="activeIndex = index">{{sku}}</el-button>
    </section>
</template>
<script>
export default {
  name: "sku",

  data() {
    return {
      skus: ["正常糖", "少糖", "少冰", "多冰", "五分糖", "七分糖"],
      activeIndex: 0
    };
  }
};
</script>
<style lang="less" scoped>
@import url(../../plugins/assets/css/flex.less);

.sku-container {
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
  .active {
    border: 1px solid @blue;
    color: rgba(91, 156, 249, 1);
    background: #fff;
  }
}
</style>