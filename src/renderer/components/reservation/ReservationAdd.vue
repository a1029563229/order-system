<template>
    <layer title="新增预约" confirm="确认预约">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="userMobile">
                <el-input v-model="ruleForm.userMobile" type="number"></el-input>
            </el-form-item>
            <el-form-item label="发起人" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="预约时间" required>
               <el-date-picker
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预约人数" prop="resource">
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预约游戏" prop="resource">
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预约桌号" prop="resource">
                 <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            </el-form>
    </layer>
</template>
<script>
import Layer from "@/components/common/Layer.vue";

export default {
  name: "reservationAdd",

  data() {
    return {
      ruleForm: {
        userMobile: "",
        userName: "",
        bookTime: [],
        gameId: "",
        homeId: "",
        bookSeatNum: ""
      },
      rules: {
        name: [
          { required: true, message: "手机号为必填项", trigger: "blur" },
          { min: 9, max: 9, message: "长度为9个字符", trigger: "blur" }
        ],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },

  components: {
    Layer
  }
};
</script>
<style lang="less" scoped>
</style>


