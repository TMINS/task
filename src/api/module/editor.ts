import request from "../index";
import { deleteImage } from "../model/editor";

export const deleteImg = (data: deleteImage) => {
  return request({
    url: "/editor/deleteImg",
    method: "post",
    data,
  });
};
