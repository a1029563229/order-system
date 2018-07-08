<template>
    <layer title="选择支付方式" confirm="去充值" @btnHandler="btnHandler">
        <div class="member-pay-way">
            <el-button>微信支付</el-button>
            <el-button>支付宝</el-button>
            <el-button>现金支付</el-button>
            <el-button>储值扣费</el-button>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";

export default {
  name: "memberPayWay",

  data() {
    return {};
  },

  components: {
    Layer
  },

  methods: {
    btnHandler(val) {
        if (val) {
            this.memberOperation(this.$parent.layerType.payCode);
        }
    }
  }
};
</script>
<style lang="less" scoped>
.member-pay-way {
  button {
    padding: 30px 18px;
    width: 45%;
    margin-right: 30px;
    margin-left: 0;
    margin-bottom: 20px;
  }
  :nth-child(even) {
    margin-right: 0;
  }
}
</style>


