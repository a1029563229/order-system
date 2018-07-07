<template>
  <div :class="'vp-toast mask animated fadeIn mask-now'">
    <div class="tips-container">
      <div class="tips">
        {{tips}}
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css';
import $ from 'jquery';
export default {
  name: 'vp-toast',

  props: ['tips', 'type'],

  mounted() {

  }
}
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
.mask {
  background: rgba(0, 0, 0, .8);
  z-index: 1001;
  .tips-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1002;
    justify-content: center;
    align-items: center;
    .tips {
      border-radius: .1rem;
      font-size: .3rem;
      text-align: center;
      color: #A97446;
      padding: .3rem .2rem;
      background: #fff;
      line-height: .5rem;
      max-width: 90%;
      box-sizing: border-box;
      width: auto;
      float: left;
      margin: 0 auto;
    }
  }
}

.animated {
  animation-duration: .5s;
}
</style>
