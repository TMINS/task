import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
// import  from 'qs'
import config from "@/config";
import { StatusMessage } from "./status";
import router from "@/router/index";
import { useRouteStore } from "@/store/module/route";
import { useStore } from "@/store/index";
const routeStore = useRouteStore();
const userStore = useStore();
axios.defaults.timeout = 2500;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: {
    Accept: "application/json",
  },
});
// 请求拦截
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    // 设置请求头token，加密操作
    if (token) {
      let userInfo = userStore.userInfo;
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      if (userInfo) {
        config.headers = {
          ...config.headers,
          userId: userInfo["user_id"],
        };
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// 响应拦截
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 设置token以及定义请求的token参数，本地化存储
    // if (response.headers.authorization) {
    //   localStorage.setItem("app_token", response.headers.authorization);
    // } else {
    //   if (response.data && response.data.token) {
    //     localStorage.setItem("app_token", response.data.token);
    //   }
    // }
    switch (response.status) {
      case 200:
        return response.data;
        break;
      default:
        StatusMessage(response.status);
        return response.data;
        break;
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    let status: number = response?.status as number;
    switch (status) {
      case 200:
        return response?.data;
        break;
      case 401:
        routeStore.authError(router.currentRoute);
        break;
      default:
        StatusMessage(status);
        break;
    }
    return Promise.reject(response?.data);
  }
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (config: AxiosRequestConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
