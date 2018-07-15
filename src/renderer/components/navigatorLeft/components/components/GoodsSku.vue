<template>
    <section class="goods-sku">
        <h1 class="goods-title">规格 - 这里是商品名称</h1>
        <p class="prompt">请选择商品规格</p>
        <div v-for="(attr, index) in attributes" :key="index">
            <div class="goods-practice">
                {{attr.attributeName | lenLimit(12)}}
            </div>
            <div class="sku-container">
                <sku :skus="attr.attrValueList" keyName="attributeValueName"></sku>
            </div>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";

export default {
  name: "goodsSku",

  data() {
    return {
      attributes: []
    };
  },

  components: {
    Sku
  },

  methods: {
    getAttributes() {
      let productList = this.$store.state.product.productList;
      let currentIndex = this.$store.state.product.currentIndex;
      let specAttributeIds = productList[currentIndex].specAttributeIds;

      this.$axios
        .post("shop/attribute/list", {
          shopId: this.userInfo.shopId,
          specAttributeIds
        })
        .then(attributes => {
          this.attributes = attributes;
        });
    }
  },

  mounted() {
    this.getAttributes();
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


