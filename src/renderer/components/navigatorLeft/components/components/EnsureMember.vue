<template>
    <section class="ensure-member">
        <h1 class="member-title">收银</h1>
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
        <div>
            <p class="prompt">会员认证</p>
            <el-button type="primary">会员认证</el-button>
            <p class="text-danger">*无有效认证默认为游客，不支持挂单和折扣</p>
            <div class="recharge-item">
                <span>应付金额</span>
                <span>￥{{orderInfo.totalPrice | toPrice}}</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  name: "ensureMember"
};
</script>
<style lang="less" scoped>
@import url(../../../../plugins/assets/css/flex.less);
.member-title {
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


