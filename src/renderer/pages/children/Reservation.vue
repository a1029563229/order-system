<template>
    <section class="reservation-container">
        <section class="reservation-header">
          <div class="reservation-operation">
            <el-button type="warning" @click="evokeLayer(layerType.addReservation)">新增预约</el-button>
          </div>
          <div class="reservation-statistics">
            今日预约 <span>{{todayReservationCount}}</span> 个
          </div>
        </section>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px" class="search-options">
            <el-form-item label="预约时间" prop="bookTime">
                <el-date-picker
                v-model="searchForm.bookTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="过期否" prop="state">
                <el-select v-model="searchForm.state" placeholder="请选择">
                    <el-option
                    v-for="item in states"
                    :key="item.key"
                    :label="item.key"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="搜索" prop="userMobile">
                <el-input placeholder="会员号/手机号" v-model="searchForm.userMobile"></el-input>
            </el-form-item>
            <el-form-item label="起始时间" prop="addTime">
                <el-date-picker
                v-model="searchForm.addTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="桌号" prop="tableId">
                <el-select v-model="searchForm.tableId" placeholder="请选择">
                   <el-option
                    v-for="item in tableList"
                    :key="item.tableId"
                    :label="item.tableName"
                    :value="item.tableId">
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
                :data="reservationList"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                prop="userAccount"
                label="会员号">
                </el-table-column>
                <el-table-column
                prop="userMobile"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="bookRoundName"
                label="发起人">
                </el-table-column>
                <el-table-column
                label="发起时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.addTime | dateTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                prop="tableName"
                label="桌号">
                </el-table-column>
                <el-table-column
                label="预约时段">
                  <template slot-scope="scope">
                    <span>{{scope.row.bookStartTime | dateTime}}-{{scope.row.bookEndTime | dateTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                prop="gameName"
                label="预约游戏">
                </el-table-column>
                <el-table-column
                prop="bookSeatNum"
                label="预约人数">
                </el-table-column>
                <el-table-column
                label="是否过期">
                  <template slot-scope="scope">
                    <span>{{scope.row.state === 1 ? "未过期" : "已过期"}}</span>
                  </template>
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
        <pagination :totalCount="totalCount" @current-change="handleCurrentChange"></pagination>
          <transition name="order-operation-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
            <reservation-add v-if="currentLayerType === layerType.addReservation" @memberOperation="evokeLayer"></reservation-add>
          </transition>
    </section>
</template>
<script>
import Pagination from "@/components/common/pagination.vue";
import { dateTime } from "@/filters/custom.filter";
import { ReservationAdd } from "@/components/reservation";

export default {
  name: "cash",

  data() {
    return {
      searchForm: {
        state: "",
        userMobile: "",
        bookTime: [],
        addTime: [],
        tableId: ""
      },

      states: [
        {
          key: "未过期",
          value: 1
        },
        {
          key: "已过期",
          value: 2
        }
      ],
      tableList: [],
      reservationList: [],

      totalCount: 0,
      currentPage: 1,

      todayReservationCount: 0
    };
  },

  components: {
    Pagination,
    ReservationAdd
  },

  methods: {
    onSubmit() {
      let params = {};
      for (let key in this.searchForm) {
        if (key === "bookTime") {
          if (this.searchForm[key].length > 1) {
            // console.log(dateTime(this.searchForm[key][0], 'dateTime'));
            params["bookStartTime"] = dateTime(
              this.searchForm[key][0].toString(),
              "dateTime"
            );
            params["bookEndTime"] = dateTime(
              this.searchForm[key][1].toString(),
              "dateTime"
            );
          }

          if (key === "addTime") {
            if (this.searchForm[key].length > 1) {
              // console.log(dateTime(this.searchForm[key][0], 'dateTime'));
              params["startAddTime"] = dateTime(
                this.searchForm[key][0].toString(),
                "dateTime"
              );
              params["endAddTime"] = dateTime(
                this.searchForm[key][1].toString(),
                "dateTime"
              );
            }
          }
          continue;
        }

        if (this.searchForm[key] !== "") {
          params[key] = this.searchForm[key];
          continue;
        }
      }

      this.getReservationList(params);
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

    getReservationList(params) {
      this.$axios
        .post(
          "user/vip/bespeak/list",
          Object.assign({}, params, {
            currentPage: this.currentPage
          })
        )
        .then(res => {
          this.reservationList = res ? res.data || [] : [];
          this.totalCount = res.totalCount || 0;
        });
    },

    getTodayReservationCount() {
      this.$axios.post("user/vip/bespeak/count").then(todayReservationCount => {
        this.todayReservationCount = todayReservationCount;
      });
    },

    getTableList() {
      this.$axios.post("shop/table/list").then(tableList => {
        this.tableList = tableList;
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
    this.getTableList();
    this.getReservationList();
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
  animation-duration: 0.3s;
}
</style>

