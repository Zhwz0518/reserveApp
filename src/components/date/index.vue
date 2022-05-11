<template>
  <div>
    <!--  <div @click="showPopup">
      {{ yesr }}-<span v-show="actived < 10 ? true : false">0</span
      >{{ actived }}
    </div>-->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
      @click-overlay="close"
    >
      <main>
        <!-- 选择年 -->
        <div class="yesr">
          <van-icon name="arrow-left" @click="last" />
          <span
            >{{ yesr }}年<span v-show="actived < 10 ? true : false">0</span
            >{{ actived }}月</span
          >
          <van-icon name="arrow" @click="next" />
        </div>

        <section>
          <div>
            <span
              v-for="(item, index) in 12"
              :key="index"
              :class="actived === item ? 'spanBGd' : false"
              @click="spanmouth(item)"
            >
              {{ item }}月
            </span>
          </div>
        </section>

        <footer></footer>
      </main>
      <div class="button" @click="button">确定</div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Popup } from "vant";

Vue.use(Icon);
Vue.use(Popup);
export default {
  data() {
    return {
      yesr: 1970, //年
      actived: 1, //月
      show: false,
    };
  },
  mounted() {
    //   设置默认年份
    var date = new Date();
    this.yesr = date.getFullYear();
    this.actived = date.getMonth() + 1;
  },
  methods: {
    //   上一年
    last() {
      this.yesr = this.yesr - 1;
    },
    // 下一年
    next() {
      this.yesr = this.yesr + 1;
    },
    //选择月份
    spanmouth(item) {
      this.actived = item;
    },
    //弹出层
    showPopup() {
      this.show = true;
    },
    //关闭弹出层
    close() {
      //   设置默认年份
      var date = new Date();
      this.yesr = date.getFullYear();
      this.actived = date.getMonth() + 1;
    },
    //确定
    button() {
      this.show = false;
      var Datenum = `${this.yesr}-${this.actived}`;
      this.$emit("datebutton", Datenum);
    },
  },
};
</script>

<style scoped>
main > .yesr {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
  color: #fff;
  font-size: 42px;
  background: #605c87;
}
section {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
section > div {
  width: 74%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
section > div > span {
  width: 25%;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  margin: 20px 0;
  text-align: center;
}
.spanBGd {
  background: #605c87;
  color: #fff;
  border-radius: 10px;
}
.button {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  font-size: 44px;
  color: #fff;
  margin: 20px auto;
  line-height: 80px;
  background: linear-gradient(270deg, #605c87 0%, #605c87 100%);
  outline: none;
  border-radius: 2px;
  text-align: center;
}
</style>
