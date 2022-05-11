<template>
  <div id="allmap"></div>
</template>

<script>
import { MP } from "@/map.js";
export default {
  data() {
    return {
      al: "ZWa3NTy9IBaIqTsoOZc223GH3WtYe2Ho",
      center: { lng: 116.40387397, lat: 39.91488908 },
      zoom: 15,
    };
  },
  mounted() {
    this.$nextTick(() => {
      var _this = this;
      MP(_this.ak).then((BMap) => {
        // this.locationbtn();
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(118.800607, 32.067538);
        map.centerAndZoom(point, 16);

        var marker = new BMap.Marker(point);
        var mapPoints = [
          {
            x: 32.067538,
            y: 118.800607,
            title: "A",
            con: "我是A",
            branch: "古鸡鸣寺",
          },
          {
            x: 32.065761,
            y: 118.803129,
            title: "B",
            con: "我是B",
            branch: "市政府",
          },
          {
            x: 31.115246,
            y: 121.768545,
            title: "B",
            con: "我是B",
            branch: "cool",
          },
        ];
        var i = 0;
        map.addOverlay(marker);
        map.enableScrollWheelZoom(true);
        // 函数 创建多个标注
        function markerFun(points, label, infoWindows) {
          var markers = new BMap.Marker(points);
          map.addOverlay(markers);
          markers.setLabel(label);
          markers.addEventListener("click", function (event) {
            map.openInfoWindow(infoWindows, points); //参数：窗口、点  根据点击的点出现对应的窗口
          });
        }
        for (; i < mapPoints.length; i++) {
          var points = new BMap.Point(mapPoints[i].y, mapPoints[i].x); //创建坐标点
          var opts = {
            width: 250,
            height: 100,
            title: mapPoints[i].title,
          };
          var label = new BMap.Label(mapPoints[i].branch, {
            offset: new BMap.Size(25, 5),
          });
          var infoWindows = new BMap.InfoWindow(mapPoints[i].con, opts);
          markerFun(points, label, infoWindows);
        }
      });
    });
  },
  methods: {
    locationbtn() {
      let map = new BMap.Map("allmap");
      let point = new BMap.Point(this.center.lng, this.center.lat);
      map.centerAndZoom(point, 15);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition((r) => {
        if (r.point) {
          this.center.lng = r.longitude;
          this.center.lat = r.latitude;

          alert("您当前经纬度：" + this.center.lng + "," + this.center.lat);
          var point = new BMap.Point(this.center.lng, this.center.lat); //用当前定位的经纬度查找省市区街道等信息

          var gc = new BMap.Geocoder();
          gc.getLocation(point, function (rs) {
            var addComp = rs.addressComponents;
            console.log(rs.address); //地址信息
            console.log(rs.address); //弹出当前所在地址
          });
          let markers = new BMap.Marker(r.point);
          map.addOverlay(markers);
          map.panTo(r.point);
          map.centerAndZoom(r.point, 16);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#allmap {
  width: 100%;
  height: calc(100vh - 90px);
}
</style>
