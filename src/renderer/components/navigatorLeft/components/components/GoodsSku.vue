<template>
    <section class="goods-sku">
        <h1 class="goods-title">规格 - {{currentGoods.productName}}</h1>
        <p class="prompt">请选择商品规格</p>
        <div v-for="(attr, index) in attributes" :key="index">
            <div class="goods-practice">
                {{attr.attributeName | lenLimit(12)}}
            </div>
            <div class="sku-container">
                <sku @selectSku="selectSku($event, index)" :skus="attr.attrValueList" keyName="attributeValueName"></sku>
            </div>
        </div>
    </section>
</template>
<script>
import Sku from "@/components/common/Sku.vue";
import { goodsMixin } from "../goods.mixin";

export default {
  name: "goodsSku",

  data() {
    return {
      attributes: [],

      attList: []
    };
  },

  components: {
    Sku
  },

  mixins: [goodsMixin],

  methods: {
    selectSku(valueIndex, attrIndex) {
      this.modifyAttrs(attrIndex, valueIndex);
    },

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
          this.attributes.forEach((attr, index) => {
            this.modifyAttrs(index, 0);
          });
        });
    },

    modifyAttrs(attrIndex, valueIndex) {
      this.attList[attrIndex] = {
        attributeId: this.attributes[attrIndex].attributeId,
        attributeName: this.attributes[attrIndex].attributeName,
        attributeValueId: this.attributes[attrIndex].attrValueList[valueIndex]
          .attributeValueId,
        attributeValueName: this.attributes[attrIndex].attrValueList[valueIndex]
          .attributeValueName
      };
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


