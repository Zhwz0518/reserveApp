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
          <div class="content">{{ nowperson.telephone }}</div>
        </div>
        <div class="infobox">
          <div class="infotitle">身份证号码</div>
          <div class="content">{{ nowperson.idCard }}</div>
        </div>
        <div class="infobox">
          <div class="infotitle">检测点</div>
          <div class="content">{{ nowperson.site.name }}</div>
        </div>
        <div class="infobox">
          <div class="infotitle">检测地址</div>
          <div class="content">{{ nowperson.address }}</div>
        </div>
        <div class="infobox">
          <div class="infotitle">预约时间</div>
          <div class="content">
            {{ nowperson.times.startTime + "-" + nowperson.times.endTime }}
          </div>
        </div>
        <div class="imgbox">
          <img src="@/assets/mycode.png" />
        </div>
        <div class="codeimg">
          <div class="iconbox" style="line-height: 160px">
            <van-icon
              :color="nowIndex > 0 ? '#0f5bff' : '#666'"
              name="arrow-left"
              @click="toLast"
            />
          </div>

          <div class="imgCode" style="width: 180px">
            <div
              id="qrcode"
              ref="qrcode"
              style="width: 180px"
              class="qrcode"
            ></div>
          </div>
          <div class="iconbox" style="line-height: 160px">
            <van-icon
              name="arrow"
              :color="
                nowIndex < form.personList.length - 1 ? '#0f5bff' : '#666'
              "
              @click="toNext"
            />
          </div>
        </div>
        <!--<div class="changebox">
          <van-icon
            :color="nowIndex > 0 ? '#0f5bff' : '#666'"
            name="arrow-left"
            @click="toLast"
          />

          <van-icon
            name="arrow"
            :color="nowIndex < form.personList.length - 1 ? '#0f5bff' : '#666'"
            @click="toNext"
          />
        </div>-->
      </div>
      <div class="tipbox">
        <van-icon name="warning" color="#FFA900" />
        请于预约时间前10分钟到场，前往检测点时
        <span style="color: #ffa900"> 戴好口罩</span>
        ， 排队间隔1米，做好个人防护。
      </div>

      <div class="btnbox">
        <van-button round type="info" @click="toCancel">取消预约</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { getCode, doCancel } from "@/api/cityMnagement.js";
export default {
  data() {
    return {
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
    if (localStorage.getItem("reservetelephone")) {
      this.getCodes();
    } else {
      this.$router.push("/notelephone");
    }
  },
  methods: {
    goback() {
      this.$router.push("/");
    },
    async getCodes() {
      const a = localStorage.getItem("reservetelephone");
      const { data } = await getCode({ telephone: a });
      if (!data.data) {
        this.$router.push("/noCode");
      } else {
        this.form.personList = data.data.memberInfos;
        this.form.personList.forEach((item) => {
          const a = item.site.areaName ? item.site.areaName : "";
          const b = item.site.streetName ? item.site.streetName : "";
          const c = item.site.communityName ? item.site.communityName : "";
          item.address = a + b + c;
        });
        this.nowperson = this.form.personList[0];
        this.nowIndex = 0;
        this.openCode();
      }
    },
    toLast() {
      if (this.nowIndex > 0) {
        this.$refs.qrcode.innerHTML = "";
        this.nowIndex = this.nowIndex - 1;
        this.nowperson = this.form.personList[this.nowIndex];
        this.openCode();
      }
    },
    toNext() {
      if (this.nowIndex < this.form.personList.length - 1) {
        this.$refs.qrcode.innerHTML = "";
        this.nowIndex = this.nowIndex + 1;
        this.nowperson = this.form.personList[this.nowIndex];
        this.openCode();
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
  height: 80%;

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
  height: 10%;
}
.infobox {
  // height: 70px;
  line-height: 70px;
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
  height: 10%;
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
  height: 160px;
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
  display: flex;
  .imgCode {
    height: 360px;
    width: 360px;
    margin: 0 auto;
  }
  .iconbox {
    width: 15%;
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
