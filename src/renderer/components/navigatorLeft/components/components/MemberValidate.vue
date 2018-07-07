<template>
    <section class="member-validate">
        <h1 class="goods-title">会员验证</h1>
      <template v-if="!isValidated">
        <p class="prompt">请输入会员号码或者手机号码</p>
        <el-input class="phone-input" placeholder="请输入手机号码"></el-input>
        <div class="calculator-container">
          <calculator></calculator>
        </div>
      </template>
      <template v-else>
        <p class="prompt">请确认会员信息</p>
        <ul class="member-info">
          <li>
            <span>会员号码</span>
            <span>18244913996</span>
          </li>
          <li>
            <span>会员昵称</span>
            <span>杨先生</span>
          </li>
          <li>
            <span>会员等级</span>
            <span>Vip6</span>
          </li>
          <li>
            <span>会员折扣</span>
            <span>100%</span>
          </li>
        </ul>
      </template>
       
    </section>
</template>
<script>
import Calculator from "@/components/common/Calculator.vue";

export default {
  name: "memberValidate",

  data() {
    return {
      isValidated: true
    };
  },

  components: {
    Calculator
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

.calculator-container {
  margin-top: 5vw;
}

.member-info {
  margin-top: 3vw;
  li {
    font-size: 14px;
    .flex-between;
    margin-bottom: 2vw;
  }
}
</style>


