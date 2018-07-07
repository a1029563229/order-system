export const mixin = {
  methods: {
    locationHref(url) {
      this.$router.push(url);
    },

    toggleMenu(menuType) {
      this.$emit("toggleMenu", menuType)
    }
  }
}
