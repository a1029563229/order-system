<template>
    <section class="flex-left sku-container">
          <el-button plain v-for="(sku, index) in skus" :key="index" 
          :class="{'active': index === activeIndex}" 
          @click="activeIndex = index;selectSku(index)">{{sku[keyName] | lenLimit(5)}}</el-button>
    </section>
</template>
<script>
export default {
  name: "sku",

  data() {
    return {
      activeIndex: 0
    };
  },

  props: {
    skus: {
      type: Array,
      default: []
    },

    keyName: {
      type: String,
      default: ''
    },

    valueName: {
      type: String,
      default: ''
    },

    value: {
      type: Object,
      default: null
    }
  },

  methods: {
    selectSku(index) {
      this.$emit("selectSku", index);
    },

    matchValue() {
      if (!this.value || !this.valueName) return;
      let value = this.value[this.valueName];
      this.activeIndex = this.skus.findIndex((item) => item[this.valueName] === value);
    }
  },

  mounted() {
    this.matchValue();
  }
};
</script>
<style lang="less" scoped>
@import url(../../plugins/assets/css/flex.less);

.sku-container {
  flex-wrap: wrap;
  width: 100%;
  button {
    background: rgba(238, 239, 240, 1);
    border: 1px solid @gray;
    width: 30%;
    padding-left: 0;
    padding-right: 0;
    margin: 0;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .active {
    border: 1px solid @blue;
    color: rgba(91, 156, 249, 1);
    background: #fff;
  }
}
</style>