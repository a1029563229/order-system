<template>
  <div class="vp-mb-alert animated fadeIn">
    <div class="vp-alert vp-alert-center animated zoomIn">
      <div class="vp-alert-content">
        {{content}}
      </div>
      <div class="vp-alert-btn">
        <div class="vp-alert-btn-list">
          <button type="button" class="btn btn-wait" @click="hideButton(true)">{{confirm}}</button>
          <button type="button" class="btn btn-sure" @click="hideButton(false)">{{close}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css';
export default {
  name: 'VpAlert',

  props: ['title', 'content', 'confirm', 'close', 'type'],

  methods: {
    hideButton(type) {
      this.$alert.close(type);
    }
  }
}
</script>

<style lang="less" scoped rel="stylesheet/less" type="text/css">
@import '../../../assets/css/flex';
.animated {
  animation-duration: .3s;
}

.vp-mb-alert {
  background: rgba(0, 0, 0, .8);
}

.vp-alert {
  font-family: '微软雅黑';
  background-color: #fff;
  text-align: left;
  width: 65%;
  display: inline-block;
  vertical-align: middle;
  color: #333;
  border-radius: .1rem;
  box-sizing: border-box;
  padding: .3rem .1rem .2rem .1rem;
  &-content {
    padding: .2rem;
    text-align: center;
    color: #000;
    margin-bottom: .5rem;
    font-size: .34rem;
  }
  &-btn {
    margin: .3rem .2rem .1rem .3rem;
    overflow: hidden;
    &-list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        font-size: .3rem;
        background: #fff;
        padding: .2rem .3rem;
        border-radius: .1rem;
      }
      .btn-wait {
        border: .01rem solid #ccc;
      }
      .btn-sure {
        background: #204B13;
        color: #fff;
      }
    }
  }
  .vp-btn {
    font-size: .26rem;
  }
}
</style>
