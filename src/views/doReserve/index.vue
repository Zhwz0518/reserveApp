<template>
  <div class="container">
    <div class="title">
      <div class="l1" @click="goback"><van-icon name="arrow-left" /></div>
      <div class="center">预约检测</div>
      <div class="r1"></div>
    </div>
    <div class="mainbox">
      <div class="pointbox">
        <van-form ref="form" @submit="onSubmit"
          ><van-cell-group inset>
            <van-field
              readonly
              clickable
              v-model="form.pointName"
              name="pointId"
              label="检测点"
              placeholder="请选择检测点"
              :rules="[{ required: true, message: '请选择检测点' }]"
              @click="choosePoint"
            />
            <van-popup v-model="showChoosePoint" position="bottom">
              <van-picker
                show-toolbar
                value-key="name"
                :columns="pointColumns"
                @confirm="onConfirmPoint"
                @cancel="showChoosePoint = false"
              />
            </van-popup>
            <van-field
              readonly
              clickable
              name="date"
              :value="form.date"
              label="预约日期"
              placeholder="点击选择预约日期"
              :rules="[{ required: true, message: '点击选择预约日期' }]"
              @click="showCalendar = true"
            />
            <van-calendar
              v-model="showCalendar"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirmDate"
            />
            <van-field
              readonly
              clickable
              v-model="form.times"
              name="times"
              label="预约时段"
              placeholder="请选择预约时段"
              :rules="[{ required: true, message: '请选择预约时段' }]"
              @click="chooseTimes"
            />
            <p v-show="form.times" class="canNum">
              {{ "当前检测点可预约人数：" + form.nowCanNum }}
            </p>
            <div class="nonebox"></div>
            <van-popup v-model="showChooseTimes" position="bottom">
              <van-picker
                show-toolbar
                value-key="times"
                :columns="timesColumns"
                @confirm="onConfirmTimes"
                @cancel="showChooseTimes = false"
              />
            </van-popup>
            <!--  </van-cell-group>
        </van-form>
      </div>
      <div class="numbox">
        <van-form @submit="onSubmit"
          ><van-cell-group inset>-->
            <van-field
              v-model="form.telephone"
              name="telephone"
              center
              clearable
              label="手机号码"
              placeholder="请输入手机号码"
              :rules="[
                { required: true, message: '请输入手机号码' },
                { validator: verifyPhone, message: '请输入正确的手机号码' },
              ]"
            />
            <van-field name="personNum" label="预约人数">
              <template #input>
                <van-stepper
                  v-model="form.personNum"
                  min="1"
                  :max="form.nowCanNum"
                  step="1"
                  integer
                  disable-input
                  @plus="doPlus"
                  @minus="doMinus"
                />
              </template>
            </van-field>
            <van-field
              v-for="(item, index) in form.personNum"
              :key="index"
              v-model="cardList[index].idCard"
              :name="'idCard' + index"
              center
              clearable
              readonly
              :label="'身份证号码' + (index + 1)"
              placeholder="请输入身份证号码"
              :rules="[
                {
                  validator: verifyCardId,
                  required: true,
                  message: '请输入正确的身份证号码',
                },
              ]"
              @touchstart.native.stop="openInput(index)"
            >
            </van-field>
            <van-number-keyboard
              v-model="cardList[nowIndex].idCard"
              :show="showKeyboard"
              extra-key="X"
              close-button-text="完成"
              @blur="showKeyboard = false"
            />
          </van-cell-group>
          <div style="padding: 32px 20px; background: #f4f4f4">
            <van-button
              :disabled="form.nowCanNum <= 0"
              round
              block
              type="primary"
              native-type="submit"
            >
              提交
            </van-button>
          </div>
        </van-form>
        <div v-show="showKeyboard" class="whitenbox"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSites, getTimes, toReserve } from "@/api/cityMnagement.js";
export default {
  data() {
    return {
      form: {
        pointName: undefined,
        pointId: null,
        date: undefined,
        times: undefined,
        telephone: undefined,
        personNum: 1,
        timesId: null,
        nowSite: {},
        timesId: null,
        nowCanNum: 0,
      },
      minDate: new Date(new Date().setDate(new Date().getDate())),
      maxDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      showChoosePoint: false,
      showChooseTimes: false,
      pointColumns: [],
      timesColumns: [],
      showCalendar: false,
      cardList: [
        {
          idCard: undefined,
        },
      ],
      nowIndex: 0,
      showKeyboard: false,
    };
  },
  created() {
    this.getList();

    if (this.$route.query.form) {
      this.form = JSON.parse(this.$route.query.form);
    }
    if (this.$route.query.site) {
      this.form.nowSite = JSON.parse(this.$route.query.site);
      this.form.pointName = this.form.nowSite.name;
      this.form.pointId = this.form.nowSite.id;
      this.getTimeList();
    }
    if (localStorage.getItem("reservetelephone")) {
      this.form.telephone = localStorage.getItem("reservetelephone");
    }
  },
  methods: {
    goback() {
      this.$router.push("/");
    },
    onSubmit(value) {
      const a = {
        areaId: this.form.nowSite.areaId,
        areaName: this.form.nowSite.areaName,
        communityId: this.form.nowSite.communityId,
        communityName: this.form.nowSite.communityName,
        day: this.form.date,
        idCards: [],
        siteId: this.form.pointId,
        siteName: this.form.pointName,
        streetId: this.form.nowSite.streetId,
        streetName: this.form.nowSite.streetName,
        telephone: this.form.telephone,
        timesId: this.form.timesId,
        timesName: this.form.times,
      };
      this.cardList.forEach((item) => {
        a.idCards.push(item.idCard);
      });
      toReserve(a).then((res) => {
        if (res.data.code == 0) {
          this.$router.push({
            name: "success",
            query: {
              form: JSON.stringify(a),
              info: JSON.stringify(res.data.data),
            },
          });
        } else {
          this.$toast(res.data.message);
        }
      });
    },
    verifyCardId(val) {
      return /^[a-zA-Z0-9]{18}$/.test(val); // 返回true或false
    },
    choosePoint() {
      this.showChoosePoint = true;
    },
    doMinus() {
      if (this.form.personNum > 1) {
        this.cardList.splice(this.form.personNum - 1, 1);
        console.log(this.cardList);
        this.nowIndex = 0;
      }
    },
    doPlus() {
      const that = this;
      that.cardList.push({ idCard: undefined });
    },
    onConfirmPoint(value) {
      this.form.pointName = value.name;
      this.form.pointId = value.id;
      this.form.nowSite = value;
      this.form.date = undefined;
      this.form.times = undefined;
      this.form.timesId = undefined;
      this.form.nowCanNum = undefined;
      this.form.personNum = 1;
      this.getTimeList();
      this.showChoosePoint = false;
    },
    openInput(index) {
      if (this.showKeyboard) {
        this.showKeyboard = false;
      } else {
        this.showKeyboard = true;
        this.nowIndex = index;
        const a = "idCard" + this.nowIndex;
        this.$refs["form"].scrollToField(a, true);
      }
    },
    getNowFormatDay(nowDate) {
      var char = "-";
      if (nowDate == null) {
        nowDate = new Date();
      }
      var day = nowDate.getDate();
      var month = nowDate.getMonth() + 1; //注意月份需要+1
      var year = nowDate.getFullYear();
      //补全0，并拼接
      return (
        year + char + this.completeDate(month) + char + this.completeDate(day)
      );
    },
    completeDate(value) {
      return value < 10 ? "0" + value : value;
    },
    onConfirmDate(date) {
      this.form.date = this.getNowFormatDay(date);
      this.showCalendar = false;
    },
    chooseTimes() {
      this.showChooseTimes = true;
    },
    onConfirmTimes(value) {
      this.form.times = value.times;
      this.form.timesId = value.id;
      this.form.nowCanNum = value.nowCanNum;
      this.showChooseTimes = false;
    },
    verifyPhone(val) {
      return /^1\d{10}$/.test(val); // 返回true或false
    },
    async getList() {
      const { data } = await getSites({ status: 1 });
      this.pointColumns = data.data;
    },
    async getTimeList() {
      const { data } = await getTimes({ siteId: this.form.pointId });
      this.timesColumns = data.data;
      if (this.timesColumns.length) {
        this.timesColumns.forEach((item) => {
          item.times = item.startTime + "-" + item.endTime;
        });
      } else {
        this.timesColumns.push({ times: "无", id: null, disabled: true });
      }
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
  margin-bottom: 20px;
}
.center {
  width: 70%;
}
.r1,
.l1 {
  width: 15%;
}
.mainbox {
  height: calc(100vh - 110px);
}
.pointbox {
  background: #fff;
}
.nonebox {
  background: #f4f4f4;
  height: 40px;
}
.canNum {
  font-size: 30px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #0f5bff;
  padding: 0 0.42667rem;
}
.whitenbox {
  height: 400px;
  background: #f4f4f4;
}
</style>
