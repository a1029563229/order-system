export const goodsMixin = {
    methods: {
        computedPayPrice(originalPrice, memberInfo) {
            if (memberInfo) {
                return originalPrice * (memberInfo.discountLevel / 100);
            } else {
                return originalPrice;
            }
        }
    },

    computed: {
        currentGoods() {
            let product = this.$store.state.product;
            return product.productList[product.currentIndex];
        }
    }
}
