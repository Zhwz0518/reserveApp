import request from "@/utils/request";
export async function getCityList(params) {
  return request({
    url: "/api/city/all",
    method: "get",
    params,
  });
}

export async function getSites(params) {
  return request({
    url: "/front/site/all",
    method: "get",
    params,
  });
}

export async function getTimes(params) {
  return request({
    url: "/front/times/all",
    method: "get",
    params,
  });
}

export async function toReserve(data) {
  return request({
    url: "/front/appointment",
    method: "post",
    data,
  });
}
export async function getCode(params) {
  return request({
    url: "/front/appointment/query",
    method: "get",
    params,
  });
}
export async function doCancel(params) {
  return request({
    url: "/front/appointment/cancel",
    method: "get",
    params,
  });
}
export async function checkCode(data) {
  return request({
    url: "/front/check",
    method: "post",
    data,
  });
}
