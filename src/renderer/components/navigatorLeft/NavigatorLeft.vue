<template>
    <section class="navigator-left">
        <transition name="order-operation-transition"
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutLeft">
          <order-menu @toggleMenu="toggleMenu" v-if="menuType === 'orderMenu'"></order-menu>
          <main-menu @toggleMenu="toggleMenu" v-if="menuType === 'mainMenu'"></main-menu>
        </transition>
    </section>
</template>
<script>
import MainMenu from "./components/MainMenu";
import OrderMenu from "./components/OrderMenu";
console.log({ MainMenu });

export default {
  name: "navigatorLeft",

  data() {
    return {
      menuType: "mainMenu"
    };
  },

  components: {
    MainMenu: MainMenu,
    OrderMenu: OrderMenu
  },

  methods: {
    toggleMenu(menuType) {
      this.menuType = menuType;
    }
  }
};
</script>
<style lang="less" scoped>
.navigator-left {
  height: 100%;
}

.animated {
  animation-duration: .5s;
}
</style>
<style lang="less">
.navigator-left section{
  position: relative;
}
</style>

