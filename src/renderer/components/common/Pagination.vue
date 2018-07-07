<template>
    <section class="pagination">
        <el-pagination
            :page-size="20"
            :pager-count="5"
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
        <slot></slot>
    </section>
</template>
<script>
export default {
  name: "pagination"
};
</script>
<style lang="less" scoped>
@import url(../../plugins/assets/css/flex.less);

.pagination {
  width: 100%;
  height: auto;
  background: #fff;
  z-index: 5;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 30px;
  border-top: 1px solid @gray;
  .flex-left;
}
</style>
