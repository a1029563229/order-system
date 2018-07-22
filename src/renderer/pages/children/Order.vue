<template>
    <section>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px" class="search-options">
            <el-form-item label="搜索" prop="orderNum">
                <el-input placeholder="订单号/会员号/手机号" v-model="searchForm.orderNum"></el-input>
            </el-form-item>
            <el-form-item label="下单时间" prop="createdTime">
                <el-date-picker
                v-model="searchForm.createdTime"
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
            <el-form-item label="桌号" prop="tableNum">
                <el-select v-model="searchForm.tableNum" placeholder="请选择">
                    <el-option
                    v-for="item in tableList"
                    :key="item.tableId"
                    :label="item.tableName"
                    :value="item.tableId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="座位" prop="seatNo">
                <el-select v-model="searchForm.seatNo" placeholder="请选择">
                    <el-option
                    v-for="item in seatList"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="orderState">
                <el-select v-model="searchForm.orderState" placeholder="请选择">
                    <el-option
                    v-for="item in orderStates"
                    :key="item.key"
                    :label="item.key"
                    :value="item.value">
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
                :data="orderList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection">
                </el-table-column>
                <el-table-column
                prop="orderNum"
                label="订单编号">
                </el-table-column>
                <el-table-column
                prop="userId"
                label="会员号">
                </el-table-column>
                <el-table-column
                prop="tableNum"
                label="桌号">
                </el-table-column>
                <el-table-column
                prop="seatNo"
                label="座位号">
                </el-table-column>
                <el-table-column
                label="下单时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdTime | dateTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                prop="totalPrice"
                label="订单金额">
                </el-table-column>
                <el-table-column
                label="订单状态">
                  <template slot-scope="scope">
                    <span>{{scope.row.orderState | orderState(orderStates)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                label="商品列表">
                  <template slot-scope="scope">
                    <el-checkbox-group>
                      <div v-for="(product, index) in scope.row.productList" :key="index">
                         <el-checkbox-group v-model="scope.row.selectedGoods">
                          <el-checkbox :label="index + ' ' + product.productName + ' 数量： ' + product.count">
                          </el-checkbox>
                         </el-checkbox-group>
                      </div>
                    </el-checkbox-group>
                  </template>
                </el-table-column>
                <el-table-column
                label="操作">
                  <template slot-scope="scope">
                      <el-button type="text" size="small">查看</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </template>
        <pagination :totalCount="totalCount" @current-change="handleCurrentChange">
          <section class="pagination-slot">
             <div>
                合计单数<span>（单）</span>：{{totalCount}}
            </div>
            <div>
                合计金额<span>（元）</span>：{{allMoney}}
            </div>
            <div>
                <el-button type="primary" @click="sortOrder">支付</el-button>
                <el-button type="warning">加单</el-button>
                <el-button>取消</el-button>
            </div>
          </section>
        </pagination>
          <transition name="order-operation-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
            <member-info v-if="currentLayerType === layerType.info" @memberOperation="evokeLayer"></member-info>
            <member-pay-way v-if="currentLayerType === layerType.payWay" @memberOperation="evokeLayer"></member-pay-way>
            <member-pay-code v-if="currentLayerType === layerType.payCode" @memberOperation="evokeLayer"></member-pay-code>
            <member-pay-order v-if="currentLayerType === layerType.payOrder" @memberOperation="evokeLayer"></member-pay-order>
            <member-pay-result v-if="currentLayerType === layerType.payResult" @memberOperation="evokeLayer"></member-pay-result>
          </transition>
    </section>
</template>
<script>
import Pagination from "@/components/common/pagination.vue";
import { mapActions } from "vuex";
import { dateTime } from "@/filters/custom.filter";
import {
  MemberPayWay,
  MemberPayCode,
  MemberPayResult,
  MemberPayOrder,
  MemberInfo
} from "@/components/member";

export default {
  name: "order",

  data() {
    return {
      searchForm: {
        orderNum: "",
        createdTime: [],
        tableNum: "",
        seatNo: "",
        orderState: ""
      },

      tableList: [],
      seatList: [],
      currentPage: 1,
      orderStates: [
        {
          key: "待支付",
          value: 0
        },
        {
          key: "已支付",
          value: 4
        },
        {
          key: "已取消",
          value: -1
        }
      ],

      orderList: [],

      selectedOrderList: [],

      totalCount: 0,
      currentPage: 1
    };
  },

  components: {
    Pagination,
    MemberPayWay,
    MemberPayResult,
    MemberPayCode,
    MemberPayOrder,
    MemberInfo
  },

  methods: {
    ...mapActions(["setProductList", "setUserPayInfo", "setPayModel"]),

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.onSubmit();
    },

    onSubmit() {
      let params = {};
      for (let key in this.searchForm) {
        if (key === "createdTime") {
          if (this.searchForm[key].length > 1) {
            // console.log(dateTime(this.searchForm[key][0], 'dateTime'));
            params["startCreatedTime"] = dateTime(
              this.searchForm[key][0].toString(),
              "dateTime"
            );
            params["endCreatedTime"] = dateTime(
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

      this.getOrderList(params);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleSelectionChange(val) {
      this.selectedOrderList = val;
    },

    getRecentData(day) {
      let times = this.getDateTime(day);
      this.searchForm.createdTime = [times.startTime, times.endTime];
      this.onSubmit();
    },

    sortOrder() {
      if (this.selectedOrderList.length === 0) {
        this.$message.warning("请至少选择一个订单支付");
        return;
      }

      if (this.selectedOrderList.some(order => +order.orderState === 4)) {
        this.$message.warning("请选择未支付的订单支付");
        return;
      }

      let productList = [];
      this.selectedOrderList.forEach(order => {
        let selectedGoods = order.selectedGoods.map(
          label => +label.slice(0, 1)
        );
        let goodsList = order.productList.filter((product, index) =>
          this.include(selectedGoods, index)
        );
        productList = [...productList, ...goodsList];
      });

      if (productList.length === 0) {
        this.$message.warning("请至少选择一个商品支付");
        return;
      }

      this.setUserPayInfo({
        key: "orderCount",
        value: this.selectedOrderList.length
      });
      this.setUserPayInfo({
        key: "orderList",
        value: this.selectedOrderList
      });
      this.setUserPayInfo({
        key: "payType",
        value: 2
      });
      this.setProductList(productList);
      this.validateMemberInfo();
    },

    validateMemberInfo() {
      this.evokeLayer(this.layerType.info);
    },

    getOrderList(params = {}) {
      this.$axios
        .post(
          "order/list",
          Object.assign({}, params, {
            currentPage: this.currentPage
          })
        )
        .then(res => {
          this.orderList =
            res.data.map((order, sort) =>
              Object.assign({}, order, {
                selectedGoods: [],
                sort
              })
            ) || [];
          this.totalCount = res.totalCount;
        });
    },

    getTableList() {
      this.$axios.post("shop/table/list").then(tableList => {
        this.tableList = tableList;
      });
    }
  },

  filters: {
    orderState(val, orderStates) {
      if (isNaN(!+val)) return val;

      let orderState = orderStates.filter(state => state.value === +val)[0];

      if (orderState) {
        return orderState.key;
      } else {
        return val;
      }
    }
  },

  computed: {
    allMoney() {
      return this.orderList.reduce(
        (money, order) => (money * 100 + order.totalPrice * 100) / 100,
        0
      );
    }
  },

  watch: {
    "searchForm.tableNum"(tableId) {
      let seatCount = this.tableList.filter(
        table => table.tableId === tableId
      )[0].homePlayers;
      this.searchForm.seatNo = "";
      this.seatList = [];
      for (let i = 0; i < seatCount; i++) {
        this.seatList[i] = i + 1;
      }
    }
  },

  mounted() {
    this.getTableList();
    this.getOrderList();
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
    max-height: 55vh;
    overflow-y: auto;
  }
}
</style>

