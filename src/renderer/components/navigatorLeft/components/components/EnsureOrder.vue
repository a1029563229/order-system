<template>
    <section class="ensure-order">
        <h1 class="order-title">收银</h1>
        <div>
            <p class="prompt">请确认订单内容</p>
            <div class="recharge-item">
                <span>商品数</span>
                <span>{{orderInfo.count}}</span>
            </div>
            <div class="recharge-item">
                <span>订单金额</span>
                <span>￥{{orderInfo.totalPrice | toPrice}}</span>
            </div>
        </div>
        <div v-if="memberInfo">
            <p class="prompt">会员信息</p>
            <div class="recharge-item">
                <span>会员账号</span>
                <span>{{memberInfo.userMobile}}</span>
            </div>
            <div class="recharge-item">
                <span>会员折扣</span>
                <span>{{memberInfo.discountLevel}}%</span>
            </div>
        </div>
        <div v-if="tableInfo">
            <p class="prompt">会员信息</p>
            <div class="recharge-item">
                <span>桌号</span>
                <span>{{tableInfo.tableName}}</span>
            </div>
        </div>
        <div>
            <p class="prompt">应付金额</p>
            <div class="recharge-item">
                <span>应付金额</span>
                <span>￥{{payPrice | toPrice}}</span>
            </div>
        </div>
    </section>
</template>
<script>
import { goodsMixin } from "../goods.mixin";

export default {
  name: "ensureOrder",

  mixins: [goodsMixin],

  data() {
    return {
      payPrice: 0
    };
  },

  mounted() {
    this.payPrice = this.computedPayPrice(
      this.orderInfo.totalPrice,
      this.memberInfo
    );
  }
};
</script>
<style lang="less" scoped>
@import url(../../../../plugins/assets/css/flex.less);
.order-title {
  font-size: 1.2vw;
}
.prompt {
  color: @blue;
  margin: 2vw 0;
}

.recharge-item span {
  margin-bottom: 20px;
  font-size: 14px;
}

.text-danger {
  color: #f56c6c;
  margin: 30px 0;
  font-size: 14px;
}
</style>


