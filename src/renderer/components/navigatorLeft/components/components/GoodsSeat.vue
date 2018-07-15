<template>
    <section class="goods-seat">
        <h1 class="goods-title">桌号</h1>
        <p class="prompt">请选择您的座位</p>
        <div class="sku-container">
            <sku :sku="seatList"></sku>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";

export default {
  name: "goodsSeat",

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
      this.$axios
        .post("shop/table/list", {
          shopId: this.userInfo.shopId
        })
        .then(seatList => {
          this.seatList = seatList;
        });
    }
  },

  mounted() {
      this.getSeatList();
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


