<template>
    <section class="login-container">
        <img class="background-bottom" src="~assets/login/background_bottom.png" alt="">
        <img class="exit" src="~assets/login/icon_exit.png" alt="">
        <h1 class="title">月满天台-狼人杀收银系统</h1>
        <div class="main-container flex-between">
            <img class="card" src="~assets/login/card.png" alt="">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
                <h2>账户登录</h2>
                <el-form-item prop="accountName">
                   <el-input prefix-icon="el-icon-message" v-model="loginForm.accountName" type="text"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input prefix-icon="el-icon-message" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-button class="submit-btn" type="primary" @click="submitForm('loginForm')">搜索</el-button>
            </el-form>
        </div>
    </section>
</template>
<script>
import md5 from "md5";

export default {
  name: "login",

  data() {
    return {
      loginForm: {
        accountName: "lidewen2",
        password: "123456"
      },
      rules: {
        accountName: [
          { required: true, message: "账号为必填项", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码为必填项", trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },

    login() {
      let password = md5(this.loginForm.password);
      this.$axios
        .get("login/loginIn", {
          params: {
            accountName: this.loginForm.accountName,
            password: md5(
              "wejj#$(!fja;23842JFWEO342jNN@#$M" + this.loginForm.password
            ),
            sign: md5(
              `LIDEWEN757198810237430&accountName=${
                this.loginForm.accountName
              }&password=${md5(
                "wejj#$(!fja;23842JFWEO342jNN@#$M" + this.loginForm.password
              )}`
            )
          }
        })
        .then(res => {
          this.$store.dispatch("setUserInfo", res[0]);
          localStorage.userInfo = JSON.stringify(res[0]);
          this.$router.push("/form");
        });
    }
  },

  mounted() {
    // Since element-ui will give '.el-form-item__content''s style marginLeft as 100px,
    // so fix that problem in here.
    document.querySelectorAll(".el-form-item__content").forEach(item => {
      item.style.marginLeft = "0";
    });
  }
};
</script>
<style lang="less" scoped>
@import url(../plugins/assets/css/flex.less);
.login-container {
  width: 100%;
  height: 100%;
  background: #ddedfe;
  position: relative;
  .exit {
    position: absolute;
    right: 40px;
    top: 40px;
  }
  .background-bottom {
    position: absolute;
    width: 100%;
    height: auto;
    bottom: 0;
  }
  .title {
    padding-top: 100px;
    margin-bottom: 150px;
    font-size: 35px;
    text-align: center;
    font-weight: bold;
  }
  .main-container {
    position: relative;
    width: 80vw;
    margin: 0 auto;
    z-index: 5;
    .card {
      width: 40vw;
      height: auto;
    }
  }
  .login-form {
    width: 380px;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 5px;
    h2 {
      font-size: 20px;
      text-align: center;
      margin-bottom: 30px;
    }
    .submit-btn {
      width: 100%;
      margin-bottom: 30px;
    }
  }
}
</style>

