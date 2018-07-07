<template>
    <section>
        <ul class="main-menu">
            <li v-for="(navigator, index) in navigatorList" :key="index" :class="{'active': $route.path === navigator.route}" @click="navigatorHandler(index)">
              {{navigator.title}}
            </li>
        </ul>
        <div class="user-information">
            <p>当前账号</p>
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1854346221,3333534330&fm=27&gp=0.jpg" class="avatar" alt="">
            <p>今何在</p>
            <div>
                <el-button class="button" type="primary">切换账号</el-button>
            </div>
            <el-button class="button" type="primary">退出</el-button>
        </div>
    </section>
</template>
<script>
export default {
  name: "mainMenu",

  data() {
    return {
      navigatorList: [
        {
          title: "点单",
          icon: "",
          route: "/form"
        },
        {
          title: "订单",
          icon: "",
          route: "/order"
        },
        {
          title: "收银明细",
          icon: "",
          route: "/cash"
        },
        {
          title: "会员中心",
          icon: "",
          route: "/member"
        }
      ]
    };
  },

  methods: {
    navigatorHandler(index) {
      this.locationHref(this.navigatorList[index].route);

      if (this.$route.name === 'form-page' && index === 0) {
        this.toggleMenu("orderMenu");
      }
    }
  },

  mounted() {}
};
</script>
<style lang="less" scoped>
@import url(../../../plugins/assets/css/flex.less);
section {
  width: 150px;
  height: 100%;
  overflow: auto;
  background: @blue;
  box-sizing: border-box;
  padding: 9vh 20px 20px 20px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  .main-menu {
    margin-bottom: 10vh;
    li {
      height: 10vh;
      min-height: 30px;
      border-radius: 5px;
      margin-bottom: 20px;
      cursor: pointer;
      .flex-auto;
    }
    .active {
      background: rgba(204, 147, 43, 1);
    }
  }
  .user-information {
    .avatar {
      width: 60%;
      margin: 10px 0;
    }
    p {
      font-size: 14px;
    }
    .button {
      margin-top: 10px;
      border: 2px solid #fff;
      width: 100%;
    }
  }
}
</style>


