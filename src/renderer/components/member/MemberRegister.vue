<template>
    <layer title="新增会员" confirm="确认注册新会员" @btnHandler="btnHandler">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="name">
                <el-input v-model="ruleForm.name" type="number"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                <el-radio label="先生"></el-radio>
                <el-radio label="女士"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" required>
                <el-date-picker
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="证件号码" prop="name">
                <el-input v-model="ruleForm.name" type="number"></el-input>
            </el-form-item>
            </el-form>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";

export default {
  name: "memberRegister",

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
    Layer
  },

  methods: {
    btnHandler(val) {

    }
  }
};
</script>
<style lang="less" scoped>
</style>


