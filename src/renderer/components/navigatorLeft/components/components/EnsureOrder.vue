<template>
    <section class="ensure-order">
        <h1 class="order-title">收银</h1>
        <div>
            <p class="prompt">请确认订单内容</p>
            <div class="recharge-item">
                <span>商品数</span>
                <span>2</span>
            </div>
            <div class="recharge-item">
                <span>订单金额</span>
                <span>￥12.00</span>
            </div>
        </div>
        <div>
            <p class="prompt">会员信息</p>
            <div class="recharge-item">
                <span>会员账号</span>
                <span>18244913996</span>
            </div>
            <div class="recharge-item">
                <span>会员折扣</span>
                <span>100%</span>
            </div>
        </div>
        <div>
            <p class="prompt">应付金额</p>
            <div class="recharge-item">
                <span>应付金额</span>
                <span>￥12.00</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  name: "ensureOrder"
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


