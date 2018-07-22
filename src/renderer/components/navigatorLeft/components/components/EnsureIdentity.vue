<template>
    <section class="ensure-identity">
        <h1 class="identity-title">身份选择</h1>
        <div>
            <p class="prompt">会员认证</p>
            <el-button type="primary" @click="orderOperation($parent.operationType.validate)">会员认证</el-button>
        </div>
        <div>
            <p class="prompt">桌号认证</p>
            <el-button type="primary" @click="orderOperation($parent.operationType.ensureSeat)">桌号认证</el-button>
        </div>
    </section>
</template>
<script>
export default {
  name: "ensureIdentity",

  computed: {
    navigatoroperationType() {
        return this.$store.state.product.ensureIdeType === 1 
            ? 'validate' 
            : 'ensureOrder'
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../../plugins/assets/css/flex.less);
.identity-title {
  font-size: 1.2vw;
}
.prompt {
  color: @blue;
  margin: 2vw 0;
}
</style>


