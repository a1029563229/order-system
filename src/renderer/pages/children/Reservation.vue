<template>
    <section class="reservation-container">
        <section class="reservation-header">
          <div class="reservation-operation">
            <el-button type="warning" @click="evokeLayer(layerType.addReservation)">新增预约</el-button>
          </div>
          <div class="reservation-statistics">
            今日预约 <span>15</span> 个
          </div>
        </section>
        <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" label-width="100px" class="search-options">
            <el-form-item label="预约时间" prop="name">
                <el-date-picker
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="过期否" prop="name">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="搜索" prop="name">
                <el-input placeholder="会员号/手机号" v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起始时间" prop="name">
                <el-date-picker
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="桌号" prop="name">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="submit-btn" type="primary">搜索</el-button>
                <!-- <el-button @click="resetForm('searchForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
        <template>
            <el-table
                class="table-list"
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection">
                </el-table-column>
                <el-table-column
                prop="a"
                label="会员号">
                </el-table-column>
                <el-table-column
                prop="e"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="f"
                label="发起人">
                </el-table-column>
                <el-table-column
                prop="g"
                label="发起时间">
                </el-table-column>
                <el-table-column
                prop="h"
                label="桌号">
                </el-table-column>
                <el-table-column
                prop="i"
                label="预约时段">
                </el-table-column>
                <el-table-column
                prop="j"
                label="预约游戏">
                </el-table-column>
                <el-table-column
                prop="j"
                label="预约人数">
                </el-table-column>
                <el-table-column
                prop="j"
                label="是否过期">
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">取消</el-button>
                </template>
                </el-table-column>
            </el-table>
        </template>
        <pagination></pagination>
        <transition name="order-operation-transition"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
            <reservation-add v-if="currentLayerType === layerType.addReservation"></reservation-add>
        </transition>
    </section>
</template>
<script>
import Pagination from "@/components/common/pagination.vue";
import { ReservationAdd } from "@/components/reservation";

export default {
  name: "reservation",

  data() {
    return {
      searchForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
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
      value: "",
      rules: {},

      tableData3: [
        {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
          f: 6,
          g: 7,
          h: 8,
          i: 9,
          j: 10,
          k: 11
        }
      ],

      multipleSelection: []
    };
  },

  components: {
    Pagination,
    ReservationAdd
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },

  mounted() {
    var i = 4;
    while (i--) {
      this.tableData3 = [...this.tableData3, ...this.tableData3];
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../plugins/assets/css/flex.less";

.reservation-container {
  width: 0;
  flex: 1;
  position: relative;
  height: 100%;
  .reservation-header {
    padding: 30px;
    padding-bottom: 0;
    box-sizing: border-box;
    .flex-left;
    align-items: flex-end;
    .reservation-operation {
      margin-right: 5vw;
      button {
        font-size: 2vw;
      }
    }
    .reservation-classify {
      margin-right: 5vw;
    }
    .reservation-statistics {
      font-size: 1.5vw;
      span {
        color: @blue;
      }
    }
  }
  .search-options {
    padding-top: 30px;
    box-sizing: border-box;
    .level-control {
      margin-left: 20px;
    }
    .submit-btn {
      background: @btn;
    }
  }
  .pagination-slot {
    .flex-left;
    > div {
      margin-left: 10vw;
    }
  }
  .table-list {
    max-height: 55vh;
    overflow-y: auto;
  }
}

.animated {
  animation-duration: .3s;
}
</style>

