<template>
    <section class="ensure-seat">
        <h1 class="ensure-title">桌号选择</h1>
        <p class="prompt">请确认下单桌号</p>
        <div class="sku-container">
            <sku @selectSku="selectTable" :skus="seatList" keyName="homePlace"></sku>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";

export default {
  name: "ensureSeat",

  data() {
    return {
      seatList: [],

      tableInfo: ""
    };
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
          this.selectTable(0);
        });
    },

    selectTable(pos) {
      this.tableInfo = this.seatList[pos];
    }
  },

  mounted() {
    this.getSeatList();
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


