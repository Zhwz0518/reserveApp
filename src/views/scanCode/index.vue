<template>
  <div class="page-scan">
    <div class="title">
      <div class="l1" @click="clickIndexLeft">
        <van-icon name="arrow-left" />
      </div>
      <div class="center">
        <!-- 提示语 -->
        <div v-show="tipShow" class="scan-tip">正在识别预约码</div>
      </div>
      <div class="r1"></div>
    </div>
    <!-- 扫码区域 -->
    <video ref="video" id="video" class="scan-video" autoplay></video>

    <div class="btm">
      <p style="font-size: 16px">{{ aaa }}</p>
      <div class="btnbox">身份证</div>
      <div class="btnbox" style="color: #0f5bff"><span>预约码</span></div>
      <div class="btnbox"><span @click="goWrite">手动输入</span></div>
      <div class="btnbox"><span @click="goNum">手动计数</span></div>
    </div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader } from "@zxing/library";
// import { Dialog, Notify } from 'vant';
import { checkCode } from "@/api/cityMnagement.js";
export default {
  name: "scanCodePage",
  data() {
    return {
      loadingShow: false,
      codeReader: null,
      scanText: "",
      vin: null,
      tipMsg: "正在尝试识别....",
      tipShow: false,
      aaa: undefined,
      site: {},
      nowIndex: 0,
    };
  },
  created() {
    this.site = JSON.parse(this.$route.query.site);
    this.codeReader = new BrowserMultiFormatReader();
    this.openScan();
  },
  destroyed() {
    this.codeReader.reset();
  },
  watch: {
    // $route(to, from) {
    //   if (to.path == "/scanCodePage") {
    //     this.codeReader = new BrowserMultiFormatReader();
    //     this.openScanTwo();
    //   }
    // },
  },
  methods: {
    doChange() {},
    async openScan(data) {
      this.nowIndex = 0;
      this.codeReader
        .getVideoInputDevices()
        .then((videoInputDevices) => {
          this.tipShow = true;
          this.tipMsg = "正在调用摄像头...";
          console.log("videoInputDevices", videoInputDevices);
          // 默认获取第一个摄像头设备id
          let firstDeviceId = videoInputDevices[0].deviceId;
          // 获取第一个摄像头设备的名称
          const videoInputDeviceslablestr = JSON.stringify(
            videoInputDevices[0].label
          );

          firstDeviceId =
            videoInputDevices[videoInputDevices.length - 1].deviceId;
          this.decodeFromInputVideoFunc(firstDeviceId);
        })
        .catch((err) => {
          this.tipShow = false;
          console.error(err);
        });
    },
    // async openScanTwo() {
    // this.nowIndex=1
    //   this.codeReader = await new BrowserMultiFormatReader();
    //   this.codeReader
    //     .getVideoInputDevices()
    //     .then((videoInputDevices) => {
    //       this.tipShow = true;
    //       this.tipMsg = "正在调用摄像头...";
    //       console.log("videoInputDevices", videoInputDevices);
    //       // 默认获取第一个摄像头设备id
    //       let firstDeviceId = videoInputDevices[0].deviceId;
    //       // 获取第一个摄像头设备的名称
    //       const videoInputDeviceslablestr = JSON.stringify(
    //         videoInputDevices[0].label
    //       );
    //       if (videoInputDevices.length > 1) {
    //         // 判断是否后置摄像头
    //         if (videoInputDeviceslablestr.indexOf("back") > -1) {
    //           firstDeviceId = videoInputDevices[0].deviceId;
    //         } else {
    //           firstDeviceId = videoInputDevices[1].deviceId;
    //         }
    //       }
    //       firstDeviceId = videoInputDevices[0].deviceId;
    //       this.decodeFromInputVideoFunc(firstDeviceId);
    //     })
    //     .catch((err) => {
    //       this.tipShow = false;
    //       console.error(err);
    //     });
    // },

    decodeFromInputVideoFunc(firstDeviceId) {
      this.codeReader.reset(); // 重置
      this.scanText = "";
      this.codeReader.decodeFromInputVideoDeviceContinuously(
        firstDeviceId,
        "video",
        (result, err) => {
          this.tipMsg = "正在尝试识别...";
          this.scanText = "";
          if (result) {
            this.tipMsg = result;
            console.log("扫描结果", result);
            this.scanText = result.text;
            if (this.scanText) {
              // this.tipShow = false;
              const m = {
                areaId: this.site.areaId,
                areaName: this.site.areaName,
                communityId: this.site.communityId,
                communityName: this.site.communityName,
                qrCodeString: this.scanText,
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
              // 这部分接下去的代码根据需要，读者自行编写了
              // this.$store.commit('app/SET_SCANTEXT', result.text);
              // console.log('已扫描的小票列表', this.$store.getters.scanTextArr);
            }
          }
          if (err && !err) {
            this.tipMsg = "识别失败";
            setTimeout(() => {
              this.tipShow = false;
            }, 2000);
            console.error(err);
          }
        }
      );
    },
    clickIndexLeft() {
      // 返回上一页
      this.codeReader = null;
      this.$destroy();
      this.$router.push("/");
    },
    goWrite() {
      this.codeReader = null;
      this.$destroy();
      this.$router.push({
        name: "writeCode",
        query: { site: JSON.stringify(this.site) },
      });
    },
    goNum() {
      this.codeReader = null;
      this.$destroy();
      this.$router.push({
        name: "doNum",
        query: { site: JSON.stringify(this.site) },
      });
    },
  },
};
</script>

<style lang="less">
.title {
  display: flex;
  text-align: center;
  height: 90px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #fff;
  // background-color: #3f3f3f;
  background: transparent;
  line-height: 90px;
}
.center {
  width: 80%;
}
.r1 {
  width: 10%;
}
.l1 {
  width: 10%;
}
video {
  width: 100%;
  background-color: transparent;
  height: 70vh;
}
.scan-video {
  background-color: transparent;
  height: 70vh;
  margin-top: 10vh;
}
.scan-tip {
  // width: 100vw;
  text-align: center;
  // margin-bottom: 10vh;
  color: white;
  font-size: 5vw;
}
.page-scan {
  height: 100vh;
  overflow-y: hidden;
  background-color: #3f3f3f;
}
.btm {
  width: 100vw;
  color: white;
  display: flex;
}
.btnbox {
  font-size: 4vw;
  text-align: center;
  width: 25%;
}
</style>
