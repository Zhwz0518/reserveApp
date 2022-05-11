<template>
  <div class="layout-container">
    <!-- 标签导航栏 -->
    <!--
      route: 开启路由模式
     -->

    <!-- /标签导航栏 -->
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
  }
  .text {
    font-size: 28px;
  }
  .iconfont {
    font-size: 28px !important;
  }
}
</style>
