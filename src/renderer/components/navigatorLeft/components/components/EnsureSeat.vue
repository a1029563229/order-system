<template>
    <section class="ensure-seat">
        <h1 class="ensure-title">桌号选择</h1>
        <p class="prompt">请确认下单桌号</p>
        <div class="sku-container">
            <sku :skus="seatList"></sku>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";

export default {
  name: "ensureSeat",

  data() {
    return {
      seatList: []
    }
  },

  components: {
    Sku
  },

  methods: {
    getSeatList() {
      this.$axios.post("shop/table/list", {
        shopId: this.userInfo.shopId
      }).then(seatList => {
        this.seatList = seatList;
      })
    }
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


