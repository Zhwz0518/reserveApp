import Vue from "vue";

//时间
Vue.filter("changeTime", (value) => {
  return value.slice(0, value.length - 3);
});
Vue.filter("collectType", (value) => {
  let action = {
    1: "圣经",
    2: "音乐",
    3: "视频",
    4: "赞美诗",
    5: "代祷本",
    6: "每日福音",
    null: "未知",
  };
  return action[value];
});
