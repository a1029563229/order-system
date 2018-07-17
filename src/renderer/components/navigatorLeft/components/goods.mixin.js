export const goodsMixin = {
    computed: {
        currentGoods() {
            let product = this.$store.state.product;
            return product.productList[product.currentIndex];
        }
    }
}
