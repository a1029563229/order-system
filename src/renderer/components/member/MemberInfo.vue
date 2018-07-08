<template>
    <layer title="确认充值账户和充值金额" confirm="会员支付" cancel="立即支付">
        <div class="member-info">
            <div class="recharge-item">
                <span>桌号</span>
                <span>华山</span>
            </div> 
            <div class="recharge-item">
                <span>订单金额</span>
                <span>￥800.00</span>
            </div> 
            <el-input placeholder="请输入会员号或者手机号码" v-model="ruleForm.name" type="number"></el-input>
            <calculator class="calculator"></calculator>
        </div>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";
import Calculator from "@/components/common/Calculator.vue";

export default {
  name: "memberInfo",

  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "手机号为必填项", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },

  components: {
    Layer,
    Calculator
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


