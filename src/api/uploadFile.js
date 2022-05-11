import request from "@/utils/request";
// 上传文件
export function doUploadFile(data) {
  return request({
    url: "/api/uploadFile",
    method: "POST",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
