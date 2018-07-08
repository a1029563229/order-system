<template>
    <section class="ensure-seat">
        <h1 class="ensure-title">桌号选择</h1>
        <p class="prompt">请确认下单桌号</p>
        <div class="sku-container">
            <sku></sku>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";

export default {
  name: "ensureSeat",

  components: {
    Sku
  }
};
</script>
<style lang="less" scoped>
@import url(../../../../plugins/assets/css/flex.less);
.ensure-title {
  font-size: 1.2vw;
}
.prompt {
  color: @blue;
  margin: 2vw 0;
}

.ensure-practice {
    margin: 30px 0;
}
</style>


