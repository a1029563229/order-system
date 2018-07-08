<template>
    <layer title="支付订单" confirm="去支付">
        <div class="member-pay-order">
            <div class="recharge-item">
                <span>订单数量</span>
                <span>11</span>
            </div> 
            <div class="recharge-item">
                <span>订单金额</span>
                <span>￥500.00</span>
            </div>
            <div class="recharge-item">
                <span>会员</span>
                <span>18244913996</span>
            </div> 
            <div class="recharge-item">
                <span>会员折扣</span>
                <span>100%</span>
            </div>
            <div class="recharge-item">
                <span>应付金额</span>
                <span>￥560.00</span>
            </div>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";

export default {
  name: "memberPayOrder",

  data() {
    return {};
  },

  components: {
    Layer
  }
};
</script>
<style lang="less" scoped>

</style>


