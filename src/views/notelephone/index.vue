<template>
  <div class="container">
    <div class="title">
      <div class="l1" @click="goback"><van-icon name="arrow-left" /></div>
      <div class="center">预约码</div>
      <div class="r1"></div>
    </div>
    <div class="mainbox">
      <div class="codebox">
        <div class="infobox">
          <div class="infotitle">手机号码</div>
          <div class="content" @click="show = true">{{ form.telephone }}</div>
        </div>

        <div class="codeimg" style="padding-top: 30px"></div>
        <div class="changebox">
          <div class="btnbox">
            <van-button round type="info" @click="toReload"
              >重新查询</van-button
            >
          </div>
        </div>
      </div>

      <van-number-keyboard
        v-model="form.telephone"
        :show="show"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { getCode, doCancel } from "@/api/cityMnagement.js";
export default {
  data() {
    return {
      show: false,
      form: {
        telephone: 15722894352,
        personList: [
          // { name: "aaa", idCard: "320322199999999999" },
          // { name: "bbb", idCard: "320322199911111119" },
          // { name: "ccc", idCard: "320322199992222299" },
        ],
      },
      nowIndex: 0,
      nowperson: {},
    };
  },
  created() {
    this.toCancel();
  },
  methods: {
    goback() {
      this.$router.push("/");
    },
    toReload() {
      localStorage.setItem("reservetelephone", this.form.telephone);
      this.$router.push("/myCodes");
    },
    onInput(value) {},
    onDelete() {},
    toCancel() {
      this.show = true;
      this.form.telephone = "";
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
::v-deep {
}
.container {
  width: 100vw;
  height: 100vh;
  background: #0f5bff;
}
.title {
  display: flex;
  text-align: center;
  height: 90px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #fff;
  background: #0f5bff;
  line-height: 90px;
}
.center {
  width: 70%;
}
.r1,
.l1 {
  width: 15%;
}
.mainbox {
  height: calc(100vh - 90px);
  padding: 20px;
}
.codebox {
  height: 70%;

  background: #fff;
  border-radius: 20px;
  padding: 20px 50px;
}
.tipbox {
  padding-top: 5%;
  font-size: 32px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  height: 15%;
}
.infobox {
  height: 80px;
  line-height: 80px;
  display: flex;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  border-bottom: 1px solid #eeeeee;
  .infotitle {
    width: 30%;
  }
  .content {
    width: 70%;
  }
}
.btnbox {
  height: 15%;
  text-align: center;
}
.van-button--info {
  width: 30%;
  color: #0f5bff;
  background-color: #fff;
  border: 0.02667rem solid #fff;
}
.imgbox {
  text-align: center;
  padding-top: 30px;
  height: 200px;
  img {
    height: 100%;
  }
}
.codeimg {
  text-align: center;
  // height: calc(70vh - 621px);
  // width: calc(70vh - 621px);
  height: 360px;
  width: 100%;
  .imgCode {
    height: 360px;
    width: 360px;
    margin: 0 auto;
  }
}
.changebox {
  height: 100px;
  font-size: 32px;
  line-height: 100px;
  text-align: center;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #333333;
}
</style>
