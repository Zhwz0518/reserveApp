import request from "@/utils/request";
export const login = (data) => {
  return request({
    method: "POST",
    url: "/front/login",
    data,
  });
};

export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/user",
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};

/**
 * 获取轮播图列表
 */
export const getCarousel = () => {
  return request({
    method: "GET",
    url: "front/advertisement",
  });
};

export const getFilm = () => {
  return request({
    method: "GET",
    url: "/front/video",
  });
};
export const getMusic = () => {
  return request({
    method: "GET",
    url: "/front/music",
  });
};
export const getAnthems = () => {
  return request({
    method: "GET",
    url: "/front/anthem",
  });
};
export const getIntercession = () => {
  return request({
    method: "GET",
    url: "/front/intercession",
  });
};
export const getnewsDetail = (id) => {
  return request({
    method: "GET",
    url: `/front/train/all/${id}`,
  });
};
export const addCollect = (data) => {
  return request({
    method: "POST",
    url: "/front/collection",
    data,
  });
};

export const deleteCollect = (data) => {
  return request({
    url: "/front/collection/del",
    method: "post",
    data,
  });
};

export const downMusic = (data) => {
  return request({
    url: "/front/music/download",
    method: "post",
    data,
  });
};
