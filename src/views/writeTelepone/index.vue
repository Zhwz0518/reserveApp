<template>
  <div class="container">
    <div class="title">
      <div class="l1" @click="goback"><van-icon name="cross" /></div>
      <div class="center"></div>
      <div class="r1" @click="toCheck">完成</div>
    </div>
    <div class="nonebox"></div>
    <div class="mainbox">
      <div class="titlebtm">输入手机号码</div>
      <div class="valuebox">
        <van-field
          v-model="idCode"
          clearable
          readonly
          placeholder="请输入手机号码"
        />
        <div class="titlebtm" style="color: #0f5bff" @click="towrite">
          切换身份证号
        </div>
        <van-number-keyboard
          v-model="idCode"
          :show="true"
          @input="onInput"
          @delete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { checkCode } from "@/api/cityMnagement.js";
export default {
  data() {
    return {
      idCode: undefined,
      show: false,
      site: {},
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
    onInput(value) {
      console.log(value);
    },
    onDelete(value) {
      console.log(value);
    },
    toCheck() {
      const m = {
        areaId: this.site.areaId,
        areaName: this.site.areaName,
        communityId: this.site.communityId,
        communityName: this.site.communityName,
        telephone: this.idCode,
        siteId: this.site.id,
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
    towrite() {
      this.$router.push({
        name: "writeCode",
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
  height: calc(40vh - 90px);
}
.mainbox {
  height: 60vh;
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
