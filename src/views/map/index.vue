<template>
  <div class="container">
    <div class="title">
      <div class="l1" @click="goback"><van-icon name="arrow-left" /></div>
      <div class="center">地图</div>
      <div class="r1"></div>
    </div>
    <div class="mainbox">
      <div class="mapbox"><Map ref="map"></Map></div>
    </div>
  </div>
</template>
<script>
import Map from "@/components/Map";
export default {
  components: { Map },
  data() {
    return {};
  },
  created() {},
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
::v-deep {
  .van-cell-group--inset {
    margin: 0;
  }
  .van-button--danger,
  .van-button--primary {
    color: #fff;
    background-color: #0f5bff;
    border: 0.02667rem solid #0f5bff;
  }
  .van-calendar__selected-day {
    background-color: #0f5bff;
  }
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
  height: calc(100vh - 90px);
}
.mapbox {
  width: 100%;
  height: calc(100vh - 90px);
}
</style>
