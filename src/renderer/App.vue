<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'order-system',

    mounted() {
        if (!this.userInfo) {
          this.$router.push("/login");
        } else {
          this.$router.push("/form");
        }
    }
  }
</script>

<style lang="less">
  /* CSS */
  #app {
    width: 100%;
    height: 100%;
  }
</style>
