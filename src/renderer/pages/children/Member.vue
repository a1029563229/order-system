<template>
    <section class="member-container">
        <section class="member-header">
          <div class="member-operation">
            <el-button type="warning" @click="evokeLayer(layerType.register)">新增会员</el-button>
            <el-button type="warning" @click="evokeLayer(layerType.recharge)">会员充值</el-button>
          </div>
          <div class="member-classify">
            <el-button>会员列表</el-button>
            <el-button>会员储值记录</el-button>
            <el-button>会员消费记录</el-button>
          </div>
          <div class="member-statistics">
            共 <span>1999</span> 个会员，今日新增 <span>0</span> 个
          </div>
        </section>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-width="100px" class="search-options">
            <el-form-item label="搜索" prop="userMobile">
                <el-input placeholder="会员号/手机号" v-model="searchForm.userMobile"></el-input>
            </el-form-item>
            <el-form-item label="开卡时间" prop="name">
                <el-date-picker
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="会员等级" prop="name">
                <el-select v-model="searchForm.level" placeholder="请选择">
                    <el-option
                    v-for="item in levelList"
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
                :data="memberList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection">
                </el-table-column>
                <el-table-column
                prop="userAccount"
                label="会员号">
                </el-table-column>
                <el-table-column
                prop="userMobile"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="userState"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="nickName"
                label="会员昵称">
                </el-table-column>
                <el-table-column
                prop="userVIPLevel"
                label="等级">
                </el-table-column>
                <el-table-column
                prop="discountLevel"
                label="折扣">
                </el-table-column>
                <el-table-column
                prop="nowBalance"
                label="余额">
                </el-table-column>
                <el-table-column
                label="开卡时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createdTime | dateTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                prop="note"
                label="备注">
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">充值</el-button>
                </template>
                </el-table-column>
            </el-table>
        </template>
        <pagination></pagination>
        <transition name="order-operation-transition"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut">
          <member-register v-if="currentLayerType === layerType.register"></member-register>
          <member-recharge v-if="currentLayerType === layerType.recharge" @memberOperation="evokeLayer"></member-recharge>
          <member-recharge-count v-if="currentLayerType === layerType.rechargeCount" @memberOperation="evokeLayer"></member-recharge-count>
          <member-pay-way v-if="currentLayerType === layerType.payWay" @memberOperation="evokeLayer"></member-pay-way>
          <member-pay-code v-if="currentLayerType === layerType.payCode" @memberOperation="evokeLayer"></member-pay-code>
          <member-pay-result v-if="currentLayerType === layerType.payResult"></member-pay-result>
          <member-pay-order v-if="currentLayerType === layerType.payOrder"></member-pay-order>
          <member-info v-if="currentLayerType === layerType.info"></member-info>
        </transition>
    </section>
</template>
<script>
import Pagination from "@/components/common/pagination.vue";
import {
  MemberRegister,
  MemberRecharge,
  MemberRechargeCount,
  MemberPayWay,
  MemberPayCode,
  MemberPayResult,
  MemberPayOrder,
  MemberInfo
} from "@/components/member";

export default {
  name: "member",

  data() {
    return {
      searchForm: {
        userMobile: "",
        createdTime: [],
        level: "",
      },

      levelList: [
        {
          key: 1,
          value: "avoid the error prompt"
        }
      ],

      memberTypes: {
        memberList: "MEMBER_LIST",
        storedRecord: "STORED_RECORD",
        consumeRecord: "CONSUME_RECORD",
      },

      memberType: "MEMBER_LIST",

      memberList: [],

      multipleSelection: []
    };
  },

  components: {
    Pagination,
    MemberRegister,
    MemberRecharge,
    MemberRechargeCount,
    MemberPayWay,
    MemberPayCode,
    MemberPayResult,
    MemberPayOrder,
    MemberInfo
  },

  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    getLevelList() {
      this.$axios.post("user/vip/levelList").then(levelList => {
        this.levelList = levelList;
      })
    },

    getMemberList(params = {}) {
      this.$axios
        .post(
          "user/vip/list",
          Object.assign({}, params, {
            currentPage: 1
          })
        )
        .then(memberList => {
          this.memberList = memberList;
        });
    }
  },

  mounted() {
    this.getLevelList();
    this.getMemberList();
  }
};
</script>
<style lang="less" scoped>
@import "../../plugins/assets/css/flex.less";

.member-container {
  width: 0;
  flex: 1;
  position: relative;
  height: 100%;
  .member-header {
    padding: 30px;
    padding-bottom: 0;
    box-sizing: border-box;
    .flex-left;
    align-items: flex-end;
    .member-operation {
      margin-right: 5vw;
      button {
        font-size: 2vw;
      }
    }
    .member-classify {
      margin-right: 5vw;
    }
    .member-statistics {
      font-size: 1.5vw;
      span {
        color: @blue;
      }
    }
  }
  .search-options {
    padding: 30px 0;
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

