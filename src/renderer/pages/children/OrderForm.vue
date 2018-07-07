<template>
    <section class="order-form flex-between">
        <div class="goods-list">
          <ol>
              <li v-for="(goods, index) in goodsList" :key="index">
                  <div class="img-control">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1069659981,3245211992&fm=27&gp=0.jpg" alt="">
                    <el-button type="primary">￥60.00</el-button>
                  </div>
                  <p>金枪鱼鸡蛋薯片挞</p>
              </li>
          </ol>
        </div>
        <ul class="classification">
            <li v-for="(classify, index) in classificationList" :key="index" :class="{'active': index === activeClassify}" @click="activeClassify = index">
                全部商品
            </li>
        </ul>
    </section>
</template>
<script>
export default {
  name: "orderForm",

  data() {
    return {
      goodsList: [
        1,
        2,
        3,
        1,
        2,
        3,
        3,
        1,
        2,
        3,
        1,
        2,
        3,
        1,
        2,
        3,
        3,
        1,
        2,
        3,
        1,
        2,
        3,
        1,
        2,
        3,
        3,
        1,
        2,
        3,
        5
      ],

      classificationList: [1, 2, 3, 4, 5],
      activeClassify: 0
    };
  }
};
</script>
<style lang="less" scoped>
@import "../../plugins/assets/css/flex.less";

.order-form {
  flex-grow: 1;
  height: 100%;
  background: @blue;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  .goods-list {
    flex-grow: 1;
    height: 100%;
    background: #fff;
    border-radius: 3px 0 0 0;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 60px 40px;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    ol {
      position: absolute;
      left: 60px;
      top: 40px;
      width: 100%;
      height: 100%;
      display: flex;
      display: flex;
      justify-content: left;
      align-items: flex-start;
      flex-wrap: wrap;
      li {
        width: 160px;
        height: 200px;
        margin-right: 40px;
        margin-bottom: 40px;
        cursor: pointer;
        .img-control {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 15px;
          img {
            width: 160px;
            height: 160px;
          }
          button {
            position: absolute;
            bottom: 0;
            left: 0;
            background: @blue;
            width: 100%;
            border-radius: 0;
          }
        }
      }
    }
  }
  .classification {
    width: 140px;
    height: 100%;
    background: #fff;
    border-radius: 3px 0 0 0;
    overflow: auto;
    box-sizing: border-box;
    padding: 26px 17px;
    li {
      padding: 20px 15px;
      font-size: 18px;
      color: rgba(69, 69, 69, 1);
      border-radius: 10px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .active {
      background: rgba(92, 179, 227, 1);
      color: #fff;
    }
  }
}
</style>

