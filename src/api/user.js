/**
 * 用户相关请求模块
 */
import request from "@/utils/request";
// import store from '@/store'

export const login = (data) => {
  return request({
    method: "POST",
    url: "/front/login",
    data,
  });
};

export const register = (data) => {
  return request({
    method: "POST",
    url: "/front/registerPassword",
    data,
  });
};

export const sendCode = (data) => {
  return request({
    method: "POST",
    url: "/front/getCodes",
    data,
  });
};

export const loginPhone = (data) => {
  return request({
    method: "POST",
    url: "/front/phoneInfoLogin",
    data,
  });
};
export async function EditInfo(data) {
  return request({
    url: "/front/member",
    method: "patch",
    data,
  });
}

/**
 * 发送验证码
 * 注意：每手机号每分钟1次
 */
export const sendSms = (mobile) => {
  return request({
    method: "GET",
    url: `/app/v1_0/sms/codes/${mobile}`,
  });
};

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/front/member/info",
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/app/v1_0/user/channels",
  });
};
export const getAdmin = () => {
  return request({
    method: "GET",
    url: "/front/member/info",
  });
};
export const getNum = () => {
  return request({
    method: "GET",
    url: "/front/member/center/info",
  });
};
