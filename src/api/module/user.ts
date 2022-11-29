import request from "../index";
import { loginModel, registerModel } from "../model/user";

export const login = (params: loginModel) => {
  return request({
    url: "/user/login",
    method: "get",
    params,
  });
};

export const register = (data: registerModel) => {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
};
