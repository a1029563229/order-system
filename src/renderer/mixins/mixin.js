export const mixin = {
  data() {
    return {
      layerType: {
        register: "REGISTER",
        recharge: "RECHARGE",
        rechargeCount: "RECHARGE_COUNT",
        payWay: "PAY_WAY",
        payCode: "PAY_CODE",
        payResult: "PAY_RESULT",
        payOrder: "PAY_ORDER",
        info: "INFO",
        addReservation: "ADD_RESERVATION"
      },

      currentLayerType: ""
    }
  },

  methods: {
    locationHref(url) {
      this.$router.push(url);
    },

    toggleMenu(menuType) {
      this.$emit("toggleMenu", menuType)
    },

    orderOperation(operation, params) {
      this.$emit("orderOperation", operation, params)
    },

    memberOperation(operation, params) {
      this.$emit("memberOperation", operation, params)
    },

    include(list, target) {
      return !!(~list.indexOf(target));
    },

    evokeLayer(layerType) {
      // Since the watch will perform later than the emit event
      // So need manual defer perform this function in here.
      setTimeout(() => {
        console.log("test");
        this.currentLayerType = layerType;
      });
    },

    clearLayer() {
      this.currentLayerType = "";
    }
  },

  watch: {
    "$store.state.common.layerCount"(val) {
      this.clearLayer();
    }
  }
}
