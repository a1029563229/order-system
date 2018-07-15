<template>
    <section>
        <ul class="main-menu">
            <li v-for="(navigator, index) in navigatorList" :key="index" :class="{'active': $route.path === navigator.route}" @click="navigatorHandler(index)">
              <div>
                <div class="img-control" v-if="navigator.icon">
                  <img :src="navigator.icon" alt="">
                </div>
                {{navigator.title}}
              </div>
            </li>
        </ul>
        <div class="user-information">
            <p>语音</p>
            <div class="voice-control">
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ccc">
              </el-switch>
            </div>
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
      value: true,
      
      navigatorList: [
        {
          title: "点单",
          icon: require("~/icon/01.png"),
          route: "/form"
        },
        {
          title: "订单",
          icon: require("~/icon/02.png"),
          route: "/order"
        },
        {
          title: "收银明细",
          icon: require("~/icon/03.png"),
          route: "/cash"
        },
        {
          title: "会员中心",
          icon: require("~/icon/04.png"),
          route: "/member"
        },
        {
          title: "预约中心",
          // icon: require("~/icon/05.png"),
          route: "/reservation"
        }
      ]
    };
  },

  methods: {
    navigatorHandler(index) {
      this.locationHref(this.navigatorList[index].route);

      if (this.$route.name === "form-page" && index === 0) {
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
  font-size: 18px;
  text-align: center;
  .main-menu {
    margin-bottom: 10vh;
    li {
      height: 10.5vh;
      min-height: 30px;
      border-radius: 5px;
      margin-bottom: 25px;
      cursor: pointer;
      .flex-auto;
      .img-control {
        margin-bottom: 10px;
      }
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
    .voice-control {
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


