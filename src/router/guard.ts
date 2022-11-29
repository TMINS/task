import router from "./index";
import { useRouteStore } from "../store/module/route";
router.beforeEach(async (to, from, next) => {
  // console.log(to)
  // console.log(from)
  //阻止跳转  return false
  // next() 形参

  let token = localStorage.getItem("token");
  let isLogin = false;
  const routeStore = useRouteStore();
  // 判断登录
  // 已经登录  判断路由表是否加载
  // 路由表不存在 请求获取  加载组件  跳转
  if (token) {
    // 已登录 跳转登录 拦截 重定向到首页
    if (to.fullPath == "/login") {
      next({ path: "/" });
    }
    // 是否加载路由表
    if (!routeStore.isAddRoutes) {
      // 重新请求路由信息
      // await ...
      // 加载完成后跳转
      /**eg：start  动态加载test路由 变更 store 状态 */
      // routeStore.isAddRoutes = true;
      // routeStore.asyncLoadComponent("/test/index.vue");
      /** eg：end */
    }
    next();
  } else {
    console.log("未登录");
    // 是否需要鉴权
    if (!to.meta.auth) {
      return next();
    }

    // 将目标路由暂存
    routeStore.catcheAddress(to);
    return next({ path: "/login" });
  }
});
