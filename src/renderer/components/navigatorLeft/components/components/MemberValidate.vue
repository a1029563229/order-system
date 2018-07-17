<template>
    <section class="member-validate">
        <h1 class="goods-title">会员验证</h1>
      <template v-if="!memberInfo || operationStep === 1">
        <p class="prompt">请输入会员号码或者手机号码</p>
        <el-input class="phone-input" placeholder="请输入手机号码" v-model="userMobile"></el-input>
        <p class="text-danger" v-show="!isMember">*未查询到您的会员，请重新输入</p>
        <div class="calculator-container">
          <calculator></calculator>
        </div>
      </template>
      <template v-else>
        <p class="prompt">请确认会员信息</p>
        <ul class="member-info">
          <li>
            <span>会员号码</span>
            <span>{{memberInfo.userMobile}}</span>
          </li>
          <li>
            <span>会员昵称</span>
            <span>{{memberInfo.nickName}}</span>
          </li>
          <li>
            <span>会员等级</span>
            <span>{{memberInfo.userLevel}}</span>
          </li>
          <li>
            <span>会员折扣</span>
            <span>{{memberInfo.discountLevel}}</span>
          </li>
        </ul>
      </template>
       
    </section>
</template>
<script>
import Calculator from "@/components/common/Calculator.vue";
import { mapActions } from "vuex";

export default {
  name: "memberValidate",

  data() {
    return {
      userMobile: "15220060077",

      operationStep: 1,

      isMember: true
    };
  },

  components: {
    Calculator
  },

  methods: {
    ...mapActions(["setCalculatorVal", "setMemberInfo"]),

    validateMember() {
      switch (this.operationStep) {
        default:
          break;
        case 1:
          this.validateUser();
          break;
        case 2:
          this.$parent.clearOperation();
          this.operationStep = 1;
          break;
      }
    },

    validateUser() {
      if (this.userMobile === "") return;
      this.isMember = true;

      this.$axios
        .post("user/vip/check", {
          userMobile: this.userMobile
        })
        .then(members => {
          let memberInfo = members[0];
          if (!memberInfo) {
            this.isMember = false;
          } else {
            this.setMemberInfo(memberInfo);
            this.operationStep = 2;
          }
        });
    }
  },

  computed: {
    memberInfo() {
      return this.$store.state.product.memberInfo;
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
@import url(../../../../plugins/assets/css/flex.less);
.goods-title {
  font-size: 1.2vw;
}
.prompt {
  color: @blue;
  margin: 2vw 0;
}

.text-danger {
  font-size: 0.7vw;
  margin-top: 10px;
  color: red;
}

.calculator-container {
  margin-top: 5vw;
}

.member-info {
  margin-top: 2.5vw;
  li {
    font-size: 14px;
    .flex-between;
    margin-bottom: 2vw;
  }
}
</style>


