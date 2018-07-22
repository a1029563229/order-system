import { mapActions } from "vuex";

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

      currentLayerType: "",

      absImgUrl: "http://weiyuntest-1253191691.picgz.myqcloud.com",

      payMethods: {
        WECHAT: 0,
        ZHIFUBAO: 1,
        STORED: 2,
        CASH: 4,
      },

      payWays: [
        {
          title: "微信支付",
          type: 0
        },
        {
          title: "支付宝",
          type: 1
        },
        {
          title: "储值扣费",
          type: 2
        },
        {
          title: "现金支付",
          type: 4
        }
      ],
    }
  },

  methods: {
    ...mapActions([
      "clearProductList",
      "clearValidateInfo",
      "clearPayInfo",
      "clearOrderInfo"
    ]),

    isDef(val) {
      return typeof val !== undefined && typeof val !== null;
    },

    locationHref(url) {
      this.$router.push(url);
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
        this.currentLayerType = layerType;
      });
    },

    clearLayer() {
      this.currentLayerType = "";
    },

    getDateTime(day = 1) {
      let time = day * 24 * 60 * 60 * 1000;

      let todayDate = new Date();
      todayDate.setHours(0);
      todayDate.setMinutes(0);
      todayDate.setSeconds(0);
      todayDate.setMilliseconds(0);

      let todayTime = todayDate.getTime();

      if (day > 0) {
        return {
          startTime: new Date(todayTime),
          endTime: new Date(todayTime + time)
        }
      } else {
        return {
          startTime: new Date(todayTime + time),
          endTime: new Date(todayTime)
        }
      }
    },

    clearOrderInfo() {
      this.clearProductList();
      this.clearValidateInfo();
      this.clearPayInfo();
    },
  },

  watch: {
    "$store.state.common.layerCount"(val) {
      this.clearLayer();
    }
  },

  computed: {
    userInfo() {
      return this.$store.state.user.info;
    },

    memberInfo() {
      return this.$store.state.product.memberInfo;
    },

    tableInfo() {
      return this.$store.state.product.tableInfo;
    },

    orderInfo() {
      let goodsList = this.$store.state.product.productList,
        totalPrice = 0,
        count = 0;
      goodsList.forEach(goods => {
        count += goods.count;
        totalPrice = (Math.ceil(totalPrice * 100) + Math.ceil((goods.count * goods.salePrice) * 100)) / 100
      });

      let payPrice = this.memberInfo
        ? parseFloat((totalPrice * this.memberInfo.discountLevel / 100).toFixed(2))
        : totalPrice;
      return {
        totalPrice,
        payPrice,
        count
      };
    },

    payInfo() {
      return this.$store.state.user.payInfo
    }
  }
}
