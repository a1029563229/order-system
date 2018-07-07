<template>
    <section class="page flex-between">
        <navigator-left></navigator-left>
        <router-view></router-view>
    </section>
</template>
<script>
import NavigatorLeft from "@/components/navigatorLeft/NavigatorLeft";

export default {
    name: "Page",

    components: {
        "NavigatorLeft": NavigatorLeft
    },

    mounted() {
        this.$router.push("/member");
        console.log(this.$route);
    },
}
</script>
<style lang="less" scoped>
    @import url(../plugins/assets/css/flex.less);
    .page {
        width: 100%;
        height: 100%;
        align-items: flex-start;
    }
</style>

