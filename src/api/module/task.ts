import request from "../index";
import {
  taskCreateModel,
  taskSelectModel,
  taskPageModel,
  taskUpdateModel,
} from "../model/task";
export const taskList = (params: taskPageModel) => {
  return request({
    url: "/task/taskList",
    method: "get",
    params,
  });
};

export const taskAdd = (data: taskCreateModel) => {
  return request({
    url: "/task/taskAdd",
    method: "post",
    data,
  });
};

export const taskDetail = (params: taskSelectModel) => {
  return request({
    url: "/task/taskDetail",
    method: "get",
    params,
  });
};

export const taskUpdate = (data: taskUpdateModel) => {
  return request({
    url: "/task/taskUpdate",
    method: "post",
    data,
  });
};

export const taskDelete = (params: taskSelectModel) => {
  return request({
    url: "/task/taskDelete",
    method: "get",
    params,
  });
};
