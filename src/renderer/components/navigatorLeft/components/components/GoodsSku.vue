<template>
    <section class="goods-sku">
        <h1 class="goods-title">规格 - 这里是商品名称</h1>
        <p class="prompt">请选择商品规格</p>
        <div class="sku-container">
            <sku></sku>
        </div>
        <div class="goods-practice">
            做法
        </div>
        <div class="sku-container">
            <sku></sku>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";

export default {
  name: "goodsSku",

  components: {
    Sku
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

.goods-practice {
    margin: 30px 0;
}
</style>


