<template>
  <div class="container">
    <div class="mainbox">
      <div class="imgbox">
        <img src="@/assets/writeOff.png" />
      </div>
      <div class="dialogbox">
        <div class="titlebox">核销成功</div>
        <div class="contentbox">
          <div class="info">
            {{ "手机号码：" + form.telephone }}
          </div>
          <div class="info">
            {{ "身份证号码：" + form.idCard }}
          </div>
          <div class="info">
            {{ "预约检测点：" + form.siteName }}
          </div>
          <div class="info">
            {{ "核销时间：" + form.times }}
          </div>
          <div class="btnbox">
            <van-button round type="info" @click="goback">确定</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        telephone: "15722895601",
        date: "2022-04-01",
        times: "14:00-19:00",
        address: "秦淮区 中华门街道 1865园区 ",
        idCard: "320333333333333333",
      },
      tips: "请于预约时间前10分钟到场，前往检测点时戴好口罩，排队间隔1米，做好个人防护。",
    };
  },
  created() {
    this.form = JSON.parse(this.$route.query.form).data;
  },
  methods: {
    goback() {
      this.$router.go(-1);
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
  color: #fff;
  background: #3c3d3d;
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
  background: #3c3d3d;
  height: 100vh;
  padding: 100px 60px 30px 60px;
}
.imgbox {
  height: 20vh;
  text-align: center;
  img {
    height: 100%;
  }
}
.dialogbox {
  height: 50vh;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  border-radius: 20px;
  .titlebox {
    background: #0f5bff;
    height: 8vh;
    line-height: 8vh;
    font-size: 34px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }
  .contentbox {
    height: 42vh;
    background: #fff;
    padding: 30px;
  }
  .info {
    // height: 5vh;
    line-height: 5vh;
    font-size: 32px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333;
  }
  .btnbox {
    text-align: center;
  }
  .van-button--round {
    width: 80%;
    background: #0f5bff;
    border-color: #0f5bff;
    margin-bottom: 10px;
  }
}
</style>
