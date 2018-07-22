<template>
    <section class="layer">
        <div class="mb"></div>
        <div class="layer-container">
            <div class="layer-title">
                <p>{{title}}</p>
                <span class="close-btn" @click="operatingLayer">X</span>
            </div>
            <div class="layer-content">
                <slot></slot>
            </div>
            <div class="layer-operations">
                <el-button v-if="cancel" @click="btnHandler(false)">{{cancel}}</el-button>
                <el-button v-if="confirm" type="primary" @click="btnHandler(true)" :loading="isLoading">{{confirm}}</el-button>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "layer",

  data() {
    return {
      isLoading: false
    };
  },

  props: {
    title: {
      type: String,
      default: "标题"
    },
    cancel: {
      type: String,
      default: "取消"
    },
    confirm: {
      type: String,
      default: "确定"
    }
  },

  methods: {
    ...mapActions(["operatingLayer"]),

    btnHandler(val) {
      if (!val) {
        this.operatingLayer();
      }
      this.isLoading = true;
      this.$emit("btnHandler", val);

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../plugins/assets/css/flex.less);

.layer {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
  .layer-container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    .layer-title {
      color: #fff;
      padding: 1vw;
      background: @blue;
      p {
        font-size: 20px;
      }
      .close-btn {
        position: absolute;
        right: 1vw;
        top: 1vw;
      }
    }
    .layer-content {
      padding: 2vw;
    }
    .layer-operations {
      .flex-between;
      button {
        flex-grow: 1;
        margin: 0;
        border-radius: 0;
      }
    }
  }
}
</style>