<template>
    <layer title="选择支付方式" confirm="去充值">
        <div class="member-pay-way">
            <el-button>微信支付</el-button>
            <el-button>支付宝</el-button>
            <el-button>现金支付</el-button>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";

export default {
  name: "memberPayWay",

  data() {
    return {
      
    };
  },

  components: {
    Layer
  }
};
</script>
<style lang="less" scoped>
    .member-recharge {
        .calculator {
            margin-top: 50px;
        }
    }
</style>


