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
              v-model="form.pointName"
              name="pointId"
              label="检测点"
            />

            <van-field
              readonly
              name="date"
              :value="form.date"
              label="预约日期"
            />

            <van-field
              readonly
              v-model="form.times"
              name="times"
              label="预约时段"
              placeholder="请选择预约时段"
            />

            <div class="nonebox"></div>
            <div class="forms"></div>
            <van-field
              v-model="form.telephone"
              name="telephone"
              readonly
              label="手机号码"
              center
            />
            <van-field name="personNum" label="预约人数">
              <template #input>
                <van-stepper
                  v-model="form.personNum"
                  disable-input
                  min="1"
                  disable-plus
                  disable-minus
                  step="1"
                  integer
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
              :placeholder="'请输入身份证号码' + (index + 1)"
              :rules="[
                { required: true, message: '请输入身份证号码' + (index + 1) },
              ]"
              @touchstart.native.stop="openInput(index)"
            >
            </van-field>
            <van-number-keyboard
              v-model="cardList[nowIndex].idCard"
              :show="showKeyboard"
              extra-key="X"
              close-button-text="完成"
              @input="onInput"
              @delete="onDelete"
              @blur="showKeyboard = false"
            />
          </van-cell-group>

          <div style="padding: 32px 20px; background: #f4f4f4">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
          <div v-show="showKeyboard" class="whitenbox"></div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
import { toReserve } from "@/api/cityMnagement.js";
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
      },
      cardList: [],
      nowIndex: 0,
      showKeyboard: false,
    };
  },
  created() {
    this.form = JSON.parse(this.$route.query.form);
    for (let i = 0; i < this.form.personNum; i++) {
      this.cardList.push({
        idCard: undefined,
      });
    }
  },
  methods: {
    goback() {
      this.$router.push({
        name: "doReserve",
        query: { form: JSON.stringify(this.form) },
      });
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
    onInput(value) {},
    onDelete() {},
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
