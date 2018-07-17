<template>
    <section class="goods-seat">
        <h1 class="goods-title">桌号</h1>
        <p class="prompt">请选择您的座位</p>
        <div class="sku-container">
            <sku @selectSku="selectTable" :skus="seatList" keyName="homePlace"></sku>
        </div>
        <p class="prompt">请选择您的座位号</p>
        <div class="sku-container">
            <sku @selectSku="selectSeatNo" :skus="seatCounters" keyName="code"></sku>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";

export default {
  name: "goodsSeat",

  data() {
      return {
          seatList: [],
          seatCounters: [],

          tableId: "",
          seatNo: ""
      }
  },

  components: {
    Sku
  },

  methods: {
    selectTable(pos) {
      this.tableId = this.seatList[pos].tableId;
      this.generateSeat(pos);
    },

    selectSeatNo(seatNo) {
      this.seatNo = seatNo;
    },

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

    generateSeat(pos = 0) {
      this.seatCounters = [];
      let seat = { code: 0 },
      max = this.seatList[pos].homePlayers,
        i = 1;
      while (i !== max + 1) {
        this.seatCounters.push(Object.assign({}, seat, {
          code: i
        }));
        i++;
      }
      this.selectSeatNo(0);
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


