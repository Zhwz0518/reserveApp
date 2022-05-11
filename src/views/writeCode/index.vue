<template>
  <div class="container">
    <van-form ref="form">
      <div class="title">
        <div class="l1" @click="goback"><van-icon name="cross" /></div>
        <div class="center"></div>
        <div class="r1" @click="toCheck">完成</div>
      </div>
      <div class="nonebox"></div>
      <div class="mainbox">
        <div class="titlebtm">输入信息</div>
        <div class="valuebox">
          <van-field
            v-model="idCode"
            name="idCode"
            clearable
            readonly
            placeholder="请输入身份证号码"
            :rules="[
              { validator: verifyCardId, message: '请输入正确的身份证号码' },
            ]"
            @click="input1 = true"
          />
          <van-field
            v-show="showTelephone"
            v-model="telephone"
            clearable
            readonly
            style="margin-top: 10px"
            placeholder="请输入手机号码"
            :rules="[
              {
                validator: verifyPhone,

                message: '请输入正确的手机号码',
              },
            ]"
            @click="input2 = true"
          />
          <div v-show="!showTelephone" class="titlebtm" style="color: #0f5bff">
            <span
              @click="
                showTelephone = true;
                input1 = false;
              "
              >填写手机号</span
            >
          </div>
          <div v-show="showTelephone" class="titlebtm" style="color: #0f5bff">
            <span
              @click="
                showTelephone = false;
                telephone = undefined;
              "
            >
              隐藏手机号</span
            >
          </div>
          <van-number-keyboard
            v-model="idCode"
            :show="input1"
            extra-key="X"
            @input="onInput"
            @blur="input1 = false"
            @delete="onDelete"
          />
          <van-number-keyboard
            v-model="telephone"
            :show="input2"
            @blur="input2 = false"
            @input="onInput"
            @delete="onDelete"
          />
        </div></div
    ></van-form>
  </div>
</template>

<script>
import { checkCode } from "@/api/cityMnagement.js";
export default {
  data() {
    return {
      idCode: undefined,
      input1: false,
      input2: false,
      show: false,
      telephone: undefined,
      site: {},
      showTelephone: false,
    };
  },
  created() {
    this.site = JSON.parse(this.$route.query.site);
  },
  methods: {
    goback() {
      this.$router.push({
        name: "scanCode",
        query: { site: JSON.stringify(this.site) },
      });
      // this.$router.go(-1);
    },
    verifyPhone(val) {
      return /^1\d{10}$/.test(val); // 返回true或false
    },
    verifyCardId(val) {
      return /^[a-zA-Z0-9]{18}$/.test(val); // 返回true或false
    },
    onInput(value) {
      // console.log(value);
    },
    onDelete(value) {
      // console.log(value);
    },
    toCheck() {
      if (this.telephone) {
        this.$refs["form"]
          .validate()
          .then(() => {
            this.sendForm();
          })
          .catch((res) => {
            console.log(res);
            //验证失败
          });
      } else {
        this.$refs["form"]
          .validate("idCode")
          .then(() => {
            this.sendForm();
          })
          .catch((res) => {
            console.log(res);
            //验证失败
          });
      }
    },
    sendForm() {
      const m = {
        areaId: this.site.areaId,
        areaName: this.site.areaName,
        communityId: this.site.communityId,
        communityName: this.site.communityName,
        idCard: this.idCode,
        siteId: this.site.id,
        telephone: this.telephone,
        siteName: this.site.name,
        streetId: this.site.streetId,
        streetName: this.site.streetName,
      };
      checkCode(m).then((res) => {
        if (res.data.code == 0) {
          setTimeout(() => {
            this.$router.push({
              name: "writeOff",
              query: { form: JSON.stringify(res.data) },
            });
          }, 100);
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    toTeleponr() {
      this.$router.push({
        name: "writeTelepone",
        query: { site: JSON.stringify(this.site) },
      });
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
  background: #3c3d3d;
}
.title {
  display: flex;
  text-align: center;
  height: 90px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #fff;

  line-height: 90px;
}
.center {
  width: 70%;
}
.r1,
.l1 {
  width: 15%;
}
.nonebox {
  height: calc(30vh - 90px);
}
.mainbox {
  height: 70vh;
  background: #fff;
  border-radius: 30px 30px 0px 0px;
  .titlebtm {
    text-align: center;
    height: 10vh;
    line-height: 6vh;
    font-size: 32px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
  }
}
::v-deep {
  .van-cell {
    border-radius: 40px 40px 40px 40px;
    opacity: 1;
    border: 2px solid #aaaaaa;
    margin: 0 20px;
    width: calc(100% - 40px);
  }
  .van-field__control {
    font-size: 32px;
  }
}
</style>
