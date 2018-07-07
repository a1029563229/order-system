<template>
    <section class="goods-remark">
        <h1 class="goods-title">备注</h1>
        <el-input
            class="remark-input"
            type="textarea"
            :rows="10"
            placeholder="这里填写备注信息">
            </el-input>
    </section>
</template>
<script>
export default {
  name: "goodsRemark"
};
</script>
<style lang="less" scoped>
@import url(../../../../plugins/assets/css/flex.less);
.goods-title {
  font-size: 1.2vw;
}
.remark-input {
    margin-top: 40px;
}
</style>


