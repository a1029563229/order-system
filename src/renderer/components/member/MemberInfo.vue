<template>
    <layer title="请输入会员信息" confirm="会员支付" cancel="立即支付" @btnHandler="btnHandler">
        <div class="member-info">
            <!-- <div class="recharge-item">
                <span>桌号</span>
                <span>华山</span>
            </div>  -->
            <div class="recharge-item">
                <span>订单金额</span>
                <span>￥{{orderInfo.totalPrice | toPrice}}</span>
            </div> 
            <el-input placeholder="请输入会员号或者手机号码" v-model="userMobile" type="string"></el-input>
            <calculator class="calculator"></calculator>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import Calculator from "@/components/common/Calculator.vue";
import { mapActions } from "vuex";

export default {
  name: "memberInfo",

  data() {
    return {
      userMobile: "15220060077"
    };
  },

  components: {
    Layer,
    Calculator
  },

  methods: {
    ...mapActions(["setCalculatorVal", "setMemberInfo", "clearValidateInfo", "operatingLayer"]),

    async btnHandler(val) {
      this.clearValidateInfo();
      if (val) {
        if (!this.userMobile) {
          this.$message.warning("请输入会员号或手机号码！");
          return;
        }

        let isMember = await this.validateMemberInfo();
        if (!isMember) {
          this.$message.warning("未查询到该会员");
          return;
        }
      }

      this.memberOperation(this.layerType.payOrder);
    },

    validateMemberInfo() {
      return new Promise((resolve, reject) => {
        this.$axios
          .post("user/vip/check", {
            userMobile: this.userMobile
          })
          .then(members => {
            let memberInfo = members[0];
            if (!memberInfo) {
              resolve(false);
            } else {
              this.setMemberInfo(memberInfo);
              resolve(true);
            }
          });
      });
    }
  },

  watch: {
    userMobile(val) {
      this.setCalculatorVal(val);
    },

    "$store.state.common.calculatorVal"(val) {
      if (this.userMobile === val) return;
      this.userMobile = val;
    }
  }
};
</script>
<style lang="less" scoped>
.member-info {
  .calculator {
    margin-top: 50px;
  }
}
</style>


