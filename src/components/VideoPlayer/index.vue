<template>
  <div :id="id"></div>
</template>

<script>
import Player from "xgplayer";
export default {
  name: "VideoPlayer",
  props: {
    id: {
      type: String,
      default: "",
      required: true,
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      player: null,
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initVideoPlayer();
    });
  },
  methods: {
    initVideoPlayer() {
      this.player = new Player({
        download: false, //设置download控件显示
        id: this.id, // 挂载元素id
        fluid: false, // 流式布局
        videoInit: false, // 初始化加载视频第一帧
        playbackRate: [0.5, 0.75, 1, 1.5, 2], // 倍速播放
        pip: false, // 画中画
        keyShortcut: "on", // 键盘控制
        lang: "zh-cn", // 中文显示
        fitVideoSize: "auto",
        ...this.config,
      });
    },
    // 销毁
    destroy() {
      this.player.destroy();
    },
    getCssFull() {
      this.player.getCssFullscreen();
    },
  },
};
</script>
<style lang="less" scoped>
.videoDownload .tab_mode {
  display: none !important;
}
</style>
