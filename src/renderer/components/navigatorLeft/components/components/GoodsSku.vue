<template>
    <section class="goods-sku" v-if="currentGoods">
        <h1 class="goods-title">规格 - {{currentGoods.productName}}</h1>
        <p class="prompt">请选择商品规格</p>
        <div v-for="(attr, index) in attributes" :key="index" v-if="attributes.length > 0">
            <div class="goods-practice">
                {{attr.attributeName | lenLimit(12)}}
            </div>
            <div class="sku-container">
                <sku @selectSku="selectSku($event, index)" :skus="attr.attrValueList" keyName="attributeValueName" valueName="attributeValueId" :value="attList[index]"></sku>
            </div>
        </div>
        <div class="sku-none" v-if="attributes.length === 0">
            当前商品暂无规格
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
      let productList = this.$store.state.product.productList,
        currentIndex = this.$store.state.product.currentIndex,
        productId = productList[currentIndex].productId;
      this.attList = [...productList[currentIndex].attList] || [];

      this.$axios
        .post("shop/attribute/list", {
          shopId: this.userInfo.shopId,
          productId
        })
        .then(attributes => {
          this.attributes = attributes || [];
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
    // TestPoint
    try {
      this.getAttributes();
    } catch (e) {
      setTimeout(() => {
        this.getAttributes();
      }, 500);
    }
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


