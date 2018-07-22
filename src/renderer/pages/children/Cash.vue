<template>
    <section>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px" class="search-options">
            <el-form-item label="搜索" prop="orderNum">
                <el-input placeholder="订单号/会员号/手机号" v-model="searchForm.orderNum"></el-input>
            </el-form-item>
            <el-form-item label="支付时间" prop="payTime">
                <el-date-picker
                v-model="searchForm.payTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <div class="level-control">
                    <span @click="getRecentData(1)">今日</span>
                    <span @click="getRecentData(-1)">昨日</span>
                    <span @click="getRecentData(-7)">七天</span>
                </div>
            </el-form-item>
            <el-form-item label="支付方式" prop="payMethod">
                <el-select v-model="searchForm.payMethod" placeholder="请选择">
                    <el-option
                    v-for="item in payWays"
                    :key="item.title"
                    :label="item.title"
                    :value="item.type">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="submit-btn" type="primary" @click="onSubmit">搜索</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <template>
            <el-table
                class="table-list"
                ref="multipleTable"
                :data="receiptList"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                type="selection">
                </el-table-column>
                <el-table-column
                prop="orderNum"
                label="订单编号">
                </el-table-column>
                <el-table-column
                prop="payPhone"
                label="会员号">
                </el-table-column>
                <el-table-column
                prop="stepNo"
                label="交易流水号">
                </el-table-column>
                <el-table-column
                label="支付时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.payTime | dateTime }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="orderCost"
                label="订单金额">
                </el-table-column>
                <el-table-column
                prop="sholdReceive"
                label="应收金额">
                </el-table-column>
                <el-table-column
                label="支付方式">
                  <template slot-scope="scope">
                    <span>{{ scope.row.payMethod | payMethod(payWays) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">收款详情</el-button>
                </template>
                </el-table-column>
            </el-table>
        </template>
        <pagination :totalCount="totalCount" @current-change="handleCurrentChange"></pagination>
    </section>
</template>
<script>
import Pagination from "@/components/common/pagination.vue";
import { dateTime } from "@/filters/custom.filter";

export default {
  name: "cash",

  data() {
    return {
      searchForm: {
        orderNum: "",
        payTime: [],
        payMethod: ""
      },

      receiptList: [],

      totalCount: 0,
      currentPage: 1
    };
  },

  components: {
    Pagination
  },

  methods: {
    onSubmit() {
      let params = {};
      for (let key in this.searchForm) {
        if (key === "payTime") {
          if (this.searchForm[key].length > 1) {
            // console.log(dateTime(this.searchForm[key][0], 'dateTime'));
            params["startPayTime"] = dateTime(
              this.searchForm[key][0].toString(),
              "dateTime"
            );
            params["endPayTime"] = dateTime(
              this.searchForm[key][1].toString(),
              "dateTime"
            );
          }
          continue;
        }

        if (this.searchForm[key] !== "") {
          params[key] = this.searchForm[key];
          continue;
        }
      }

      this.getReceiptList(params);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.onSubmit();
    },

    getRecentData(day) {
      let times = this.getDateTime(day);
      this.searchForm.payTime = [times.startTime, times.endTime];
      this.onSubmit();
    },

    getReceiptList(params) {
      this.$axios
        .post(
          "order/receipt/list",
          Object.assign({}, params, {
            currentPage: this.currentPage
          })
        )
        .then(res => {
          this.receiptList = res ? res.data || [] : [];
          this.totalCount = res.totalCount || 0;
        });
    }
  },

  filters: {
    payMethod(val, payWays) {
      if (isNaN(+val)) return val;

      let payMethod = payWays.filter(state => state.type == val)[0];

      if (payMethod) {
        return payMethod.title;
      } else {
        return val;
      }
    }
  },

  mounted() {
    this.getReceiptList();
  }
};
</script>
<style lang="less" scoped>
@import "../../plugins/assets/css/flex.less";

section {
  width: 0;
  flex: 1;
  position: relative;
  height: 100%;
  .search-options {
    padding: 30px;
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
    max-height: 70vh;
    overflow-y: auto;
  }
}
</style>

