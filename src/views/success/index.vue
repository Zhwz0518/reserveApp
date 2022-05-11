<template>
  <div class="container">
    <div class="title">
      <div class="l1" @click="goback"><van-icon name="cross" /></div>
      <div class="center">预约结果</div>
      <div class="r1"></div>
    </div>
    <div class="mainbox">
      <div class="dialogbox">
        <div class="imgbox">
          <img src="@/assets/success.png" />
        </div>
        <div class="infobox">
          <div class="info1">
            <span style="color: #ffa900">{{
              "尾号" +
              nowperson.data.slice(
                nowperson.data.length - 4,
                nowperson.data.length
              )
            }}</span
            ><span :class="nowperson.success ? 'success' : 'wrong'">{{
              nowperson.success ? "，预约成功" : "，预约失败"
            }}</span>
          </div>
          <div class="info2">
            {{ form.day + " " + form.timesName }}
          </div>
          <div class="info3">
            {{ "预约地址：" + form.address }}
          </div>
          <div v-show="nowperson.success" class="info3">
            {{ tips }}
          </div>
          <div v-show="!nowperson.success" class="info4">
            {{ "失败原因:" + nowperson.errorMsg }}
          </div>
        </div>
        <div class="codebox">
          <div class="leftbox">
            <van-icon
              :color="nowIndex > 0 ? '#0f5bff' : '#666'"
              name="arrow-left"
              @click="toLast"
            />
            <!--  <img src="@/assets/codebg1.png" />-->
          </div>
          <div class="middlebox">
            <div class="codes" style="width: 180px">
              <div
                v-show="nowperson.success"
                id="qrcode"
                ref="qrcode"
                style="width: 100%"
                class="qrcode"
              ></div>
              <img v-show="!nowperson.success" src="@/assets/wrong.png" />
            </div>
            <div class="btnbos">
              <span class="btnn" @click="toCancel">{{
                nowperson.success ? "取消预约" : "预约失败"
              }}</span>
            </div>
          </div>
          <div class="rightbox">
            <van-icon
              name="arrow"
              :color="
                nowIndex < form.personList.length - 1 ? '#0f5bff' : '#666'
              "
              @click="toNext"
            />
            <!--   <img src="@/assets/codebg.png" />-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { doCancel } from "@/api/cityMnagement.js";
export default {
  data() {
    return {
      form: {},
      tips: "请于预约时间前10分钟到场，前往检测点时戴好口罩，排队间隔1米，做好个人防护。",
      nowIndex: 0,
      nowperson: {},
    };
  },
  created() {
    this.form = JSON.parse(this.$route.query.form);
    localStorage.setItem("reservetelephone", this.form.telephone);
    this.form.personList = JSON.parse(this.$route.query.info);
    const a = this.form.areaName ? this.form.areaName : "";
    const b = this.form.streetName ? this.form.streetName : "";
    const c = this.form.communityName ? this.form.communityName : "";
    this.form.address = a + b + c;
    this.nowperson = this.form.personList[0];
    this.nowIndex = 0;
    if (this.nowperson.success) {
      this.openCode();
    }
  },
  methods: {
    goback() {
      this.$router.push("/");
    },
    toLast() {
      if (this.nowIndex > 0) {
        this.$refs.qrcode.innerHTML = "";
        this.nowIndex = this.nowIndex - 1;
        this.nowperson = this.form.personList[this.nowIndex];
        if (this.nowperson.success) {
          this.openCode();
        }
      }
    },
    toNext() {
      if (this.nowIndex < this.form.personList.length - 1) {
        this.$refs.qrcode.innerHTML = "";
        this.nowIndex = this.nowIndex + 1;
        this.nowperson = this.form.personList[this.nowIndex];
        if (this.nowperson.success) {
          this.openCode();
        }
      }
    },
    qrcode(url) {
      let qrcode = new QRCode("qrcode", {
        width: 180, // 二维码宽度，单位像素

        height: 180, // 二维码高度，单位像素

        text: url, // 生成二维码的链接
      });
    },
    //报名二维码
    openCode() {
      this.$nextTick(() => {
        const a = this.nowperson.qrCodeString;
        this.qrcode(a);
      });
    },
    toCancel() {
      if (this.nowperson.success) {
        doCancel({ qrCodeString: this.nowperson.qrCodeString }).then((res) => {
          if (res.data.code == 0) {
            this.$toast(res.data.message);
            if (this.form.personList.length == 1) {
              setTimeout(() => {
                this.goback();
              }, 100);
            } else {
              const arr = this.form.personList;
              arr.splice(this.nowIndex, 1);
              this.form.personList = arr;
              this.nowperson = this.form.personList[0];
              this.nowIndex = 0;
            }
          } else {
            this.$toast(res.data.message);
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.container {
  width: 100vw;
  height: 100vh;
  background: #f4f4f4;
}
.title {
  display: flex;
  text-align: center;
  height: 90px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #333;
  background: #fff;
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
  background: #7a7a7a;
  height: calc(100vh - 90px);
  padding: 150px 60px 70px 60px;
}
.dialogbox {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  .imgbox {
    // background: linear-gradient(
    //   to bottom,
    //   transparent 0%,
    //   transparent 30%,
    //   #0f5bff 30%,
    //   #0f5bff 100%
    // );
    position: fixed;
    top: 100px;
    z-index: 1;
    left: 0;
    right: 0;
    width: 100vw;
    height: calc(25vh - 20px);
    text-align: center;
    img {
      width: calc(100vw - 280px);
    }
  }
  .infobox {
    text-align: center;
    height: 50%;
    background: #0f5bff;
    padding-top: calc(25vh - 150px);
    .info1 {
      font-size: 36px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      .success {
        color: #67c23a;
      }
      .wrong {
        color: #f56c6c;
      }
    }
    .info2 {
      font-size: 32px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      width: 70%;
      background: #fff;
      margin: 5px auto;
      border-radius: 30px;
      padding: 10px 0;
      color: #0f5bff;
    }
    .info3 {
      margin: 10px 0;
      padding: 0 20px;
      font-size: 30px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
    }
    .info4 {
      margin: 10px 0;
      padding: 0 20px;
      font-size: 30px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #f56c6c;
    }
  }
  .codebox {
    height: 50%;
    background: #fff;
    display: flex;
    .wrong {
      padding: 20px;
      font-size: 36px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #f56c6c;
    }

    .leftbox,
    .rightbox {
      width: 20%;
      height: 100%;
      text-align: center;
      // position: relative;
      line-height: calc(50vh - 200px);
      img {
        width: 100%;
      }
    }

    .leftbox {
      // padding-top: 50%;
    }
    .rightbox {
      // padding-top: 10%;
    }
    .middlebox {
      width: 60%;
      padding-top: 5%;
      height: 100%;
      text-align: center;
    }
    .codes {
      // border: px solid #0f5bff;
      // width: calc(60vw - 92px);
      // height: calc(60vw - 92px);
      width: 360px;
      height: 360px;
      line-height: 360px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .btnbos {
      height: 80px;
      line-height: 80px;
      .btnn {
        width: 60%;
        background: #0f5bff;
        border-color: #0f5bff;
        border-radius: 50px;
        font-size: 36px;
        padding: 10px 20px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }
      .van-icon {
        font-size: 56px;
      }
    }
  }
}
</style>
