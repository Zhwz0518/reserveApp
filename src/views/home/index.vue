<template>
  <div class="container">
    <!-- <div class="title">
      <div class="l1"></div>
      <div class="center">核酸预约</div>
      <div class="r1" @click="toMore"><van-icon name="ellipsis" /></div>
    </div>-->
    <div class="imgbox">
      <van-swipe class="my-swipe" :show-indicators="false">
        <!-- <img src="@/assets/home.png" />-->
        <van-swipe-item
          v-for="(image, index) in 2"
          :key="index"
          @click="toMore(index)"
        >
          <img src="@/assets/home.png" /></van-swipe-item
      ></van-swipe>
    </div>
    <div class="tabbox">
      <div class="flex">
        <div class="tabs" @click="toReserve">
          <img src="@/assets/tab1.png" />
          <span>预约</span>
        </div>
      </div>
      <div class="flex" @click="toMy">
        <div class="tabs"><img src="@/assets/tab2.png" /><span>亮码</span></div>
      </div>
    </div>
    <div class="bgbox"></div>
    <div class="pointTitle">
      <div>检测点列表</div>
      <div @click="toMap"><van-icon name="location-o" /></div>
    </div>
    <div class="choosebox">
      <van-form>
        <van-field
          v-model="areaName"
          is-link
          readonly
          right-icon="arrow-down"
          name="areaName"
          label=""
          placeholder="全市区"
          @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" position="bottom">
          <van-picker
            show-toolbar
            value-key="name"
            :columns="columns1"
            @confirm="onConfirm1"
            @cancel="showPicker1 = false"
          />
        </van-popup>
      </van-form>
      <van-form style="margin: 0 5%">
        <van-field
          v-model="streetName"
          is-link
          readonly
          right-icon="arrow-down"
          name="streetName"
          label=""
          placeholder="全部街道"
          @click="showPicker2 = true"
        />
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            show-toolbar
            value-key="name"
            :columns="columns2"
            @confirm="onConfirm2"
            @cancel="showPicker2 = false"
          />
        </van-popup>
      </van-form>
      <van-form>
        <van-field
          v-model="communityName"
          is-link
          readonly
          right-icon="arrow-down"
          name="communityName"
          label=""
          placeholder="全部社区"
          @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" position="bottom">
          <van-picker
            show-toolbar
            value-key="name"
            :columns="columns3"
            @confirm="onConfirm3"
            @cancel="showPicker3 = false"
          />
        </van-popup>
      </van-form>
    </div>
    <div class="listbox">
      <div v-show="pointList.length == 0" class="nolist">暂无数据</div>
      <div
        v-show="pointList.length > 0"
        v-for="(item, index) in pointList"
        :key="index"
        class="itembox"
        @click="toReserveIt(item)"
      >
        <div class="itemtitle">
          <van-tag
            round
            :color="
              item.status == 0
                ? '#999'
                : item.status == 1
                ? item.nowStatus == 1
                  ? '#64B299'
                  : item.nowStatus == 2
                  ? '#E6A23C'
                  : item.nowStatus == 3
                  ? '#E87063'
                  : '#999999'
                : '#999999'
            "
            >{{
              item.status == 0
                ? "关闭"
                : item.status == 1
                ? item.nowStatus == 1
                  ? "畅通"
                  : item.nowStatus == 2
                  ? "排队"
                  : item.nowStatus == 3
                  ? "拥挤"
                  : "关闭"
                : "关闭"
            }}</van-tag
          >
          {{ item.name }}
        </div>
        <div class="itemcontent">
          <span class="spantitle"> 服务地址 </span>
          <span class="spancontent">
            {{ item.address }}
          </span>
        </div>
        <div class="itemcontent">
          <span class="spantitle"> 服务时间 </span>
          <span class="spancontent">
            {{ item.time }}
          </span>
        </div>
        <div class="itemcontent">
          <span class="spantitle"> 工作台数 </span>
          <span class="spancontent">
            {{ item.tableNum }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCityList, getSites } from "@/api/cityMnagement";
export default {
  data() {
    return {
      pointList: [],
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      areaName: undefined,
      streetName: undefined,
      communityName: undefined,
      areaId: null,
      streetId: null,
      communityId: null,
      status: undefined,
      columns1: [],
      columns2: [],
      columns3: [],
      queryForm: {
        areaId: undefined,
        streetId: undefined,
        communityId: undefined,
        status: undefined,
      },
    };
  },
  created() {
    this.getCitys();
    this.getStreet();
    this.getcommunity();
    this.getAllSite();
  },
  methods: {
    async getAllSite() {
      const { data } = await getSites(this.queryForm);
      this.pointList = data.data;
      if (this.pointList.length) {
        this.pointList.forEach((item) => {
          const a = item.areaName ? item.areaName : "";
          const b = item.streetName ? item.streetName : "";
          const c = item.communityName ? item.communityName : "";
          const d = item.startTime + "-" + item.endTime;
          const m = item.nowNum / item.maxNum;
          if (m < 0.2) {
            item.workstatus = 3;
          } else if (m < 0.5) {
            item.workstatus = 2;
          } else {
            item.workstatus = 1;
          }
          item.address = a + b + c;
          item.time = d;
        });
      }
    },
    async getCitys() {
      const data1 = await getCityList({ level: 1 });
      this.columns1 = [
        {
          name: "全部",
          id: null,
        },
      ];
      this.columns1 = this.columns1.concat(data1.data.data);
    },
    async getStreet() {
      this.streetName = undefined;
      this.streetId = null;
      this.queryForm.streetId = null;
      this.getAllSite();
      const data2 = await getCityList({ level: 2, parentId: this.areaId });
      this.columns2 = [
        {
          name: "全部",
          id: null,
        },
      ];
      this.columns2 = this.columns2.concat(data2.data.data);
    },
    async getcommunity() {
      this.communityName = undefined;
      this.communityId = null;
      this.queryForm.communityId = null;
      this.getAllSite();
      const data3 = await getCityList({ level: 3, parentId: this.streetId });
      this.columns3 = [
        {
          name: "全部",
          id: null,
        },
      ];
      this.columns3 = this.columns3.concat(data3.data.data);
    },
    onConfirm1(value) {
      this.areaName = value.name;
      this.areaId = value.id;
      this.queryForm.areaId = this.areaId;
      this.getStreet();
      this.getAllSite();
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.streetName = value.name;
      this.streetId = value.id;
      this.queryForm.streetId = this.streetId;
      this.getcommunity();
      this.getAllSite();
      this.showPicker2 = false;
    },
    onConfirm3(value) {
      this.communityName = value.name;
      this.communityId = value.id;
      this.queryForm.communityId = this.communityId;
      this.getAllSite();
      this.showPicker3 = false;
    },
    toMore(index) {
      if (index == 1) {
        this.$router.push("/chooseSite");
      }

      // this.$router.push("/scanCode");
    },
    toMap() {
      this.$router.push("/map");
    },
    toReserve() {
      // this.$router.push("/doReserve");
      this.$router.push("/chooseReservePoint");
    },
    toMy() {
      this.$router.push("/myCodes");
    },
    toReserveIt(item) {
      if (item.status == 1) {
        this.$router.push({
          name: "doReserve",
          query: { site: JSON.stringify(item) },
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
}
.title {
  display: flex;
  text-align: center;
  height: 90px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  line-height: 90px;
}
.center {
  width: 70%;
}
.r1,
.l1 {
  width: 15%;
}
.imgbox {
  height: 25vh;
  padding: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
.tabbox {
  height: 10vh;
  display: flex;
  padding: 10px;
  .flex {
    width: 50%;
    padding: 0 10px;
    .tabs {
      width: 100%;
      line-height: 7.5vh;
      height: 100%;
      border-radius: 10px;
      background: #e6eeff;
      text-align: center;
      img {
        width: 25%;
        vertical-align: middle;
      }
      span {
        font-size: 36px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #333333;
        letter-spacing: 5px;
        padding-left: 20px;
      }
    }
  }
}
.bgbox {
  width: 100%;
  height: 20px;
  background: #f4f4f4;
}
.pointTitle {
  height: 5vh;
  padding: 0 20px;
  line-height: 5vh;
  font-size: 36px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #333333;
  letter-spacing: 5px;
  display: flex;
  justify-content: space-between;
}
.choosebox {
  height: 6vh;
  padding: 0 20px;
  display: flex;
}
.listbox {
  height: calc(54vh - 20px);
  overflow: auto;
}
.itembox {
  // height: 19vh;
  padding: 20px;
  border-top: 2px solid #eeeeee;
  .itemtitle {
    // height: 5vh;
    line-height: 5vh;
    font-size: 34px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    .van-tag {
      font-size: 30px;
      padding: 8px 20px;
    }
  }
  .itemcontent {
    height: 4vh;
    line-height: 4vh;
    font-size: 30px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    .spantitle {
      color: #767676;
    }
  }
}
.nolist {
  text-align: center;
  font-size: 0.48rem;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #767676;
  letter-spacing: 0.06667rem;
  padding-top: 50px;
}
::v-deep {
  .van-field {
    border: 2px solid #aaaaaa;
    border-radius: 50px;
    padding: 10px 16px;
  }
  .van-form {
    width: 30%;
  }
  .van-cell__right-icon {
    display: none;
  }
}
</style>
