<template>
    <layer title="支付订单" confirm="去支付" @btnHandler="btnHandler">
        <div class="member-pay-order">
            <div class="recharge-item">
                <span>订单数量</span>
                <span>{{payInfo.orderCount}}</span>
            </div> 
            <div class="recharge-item">
                <span>订单金额</span>
                <span>￥{{orderInfo.totalPrice}}</span>
            </div>
            <template v-if="memberInfo">
                <div class="recharge-item">
                    <span>会员</span>
                    <span>{{memberInfo.userMobile}}</span>
                </div> 
                <div class="recharge-item">
                    <span>会员折扣</span>
                    <span>{{memberInfo.discountLevel}}%</span>
                </div>
            </template>
            <div class="recharge-item">
                <span>应付金额</span>
                <span>￥{{orderInfo.payPrice}}</span>
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
  },

  methods: {
    btnHandler(val) {
        if (val) {
            this.memberOperation(this.layerType.payWay);
        } else {
            this.clearOrderInfo();
        }
    }
  }
};
</script>
<style lang="less" scoped>
</style>


