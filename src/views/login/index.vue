<template>
  <div class="login-container">
    <div class="imgbox">
      <img src="@/assets/login.png" />
    </div>
    <div class="choosebox">
      <div class="title">请选择检测点</div>
      <div class="choose">
        <van-form @submit="onSubmit">
          <van-field
            v-model="point"
            is-link
            readonly
            name="point"
            label=""
            placeholder="点击选择"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <div style="margin-top: 5vh">
            <van-button round block type="primary" native-type="submit">
              进 入
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      showPicker: false,
      point: undefined,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onConfirm(value) {
      console.log(value);
      this.point = value;
      this.showPicker = false;
    },
    onSubmit() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.login-container {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.imgbox {
  height: 40%;
  width: 100%;
  text-align: center;
  padding-top: 5vh;
  img {
    width: 80%;
  }
}
.choosebox {
  width: 100%;
  height: 60%;
  padding: 20px;
  .title {
    height: 5vh;
    letter-spacing: 5px;
    font-size: 32px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
  }
  .choose {
    height: 15vh;
  }
}
::v-deep {
  .van-field {
    border: 1px solid #0f5bff;
    border-radius: 50px;
  }
  .van-button--primary {
    color: #fff;
    background-color: #0f5bff;
    border-color: #0f5bff;
  }
}
</style>
