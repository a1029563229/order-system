<template>
    <section class="navigator-left">
        <transition name="order-operation-transition"
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutLeft">
          <order-menu v-if="menuType === 'orderMenu'"></order-menu>
          <main-menu v-if="menuType === 'mainMenu'"></main-menu>
        </transition>
    </section>
</template>
<script>
import MainMenu from "./components/MainMenu";
import OrderMenu from "./components/OrderMenu";
import { mapActions } from "vuex";

export default {
  name: "navigatorLeft",

  data() {
    return {};
  },

  components: {
    MainMenu: MainMenu,
    OrderMenu: OrderMenu
  },

  methods: {
    ...mapActions(["toggleMenu"])
  },

  computed: {
    menuType() {
      return this.$store.state.product.menuType;
    }
  },

  watch: {
    "$route.name"(val) {
      if (val !== "form-page") {
        this.toggleMenu("mainMenu");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.navigator-left {
  height: 100%;
}

.animated {
  animation-duration: 0.5s;
}
</style>
<style lang="less">
.navigator-left section {
  position: relative;
}
</style>

