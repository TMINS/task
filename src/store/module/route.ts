import { defineStore } from "pinia";
import { loadComponent } from "../../router/load";
import router from "../../router/index";
export const useRouteStore = defineStore("custom-route", {
  state: () => {
    return {
      routes: [],
      isAddRoutes: false, //是否加载远程路由
    };
  },
  getters: {},
  actions: {
    asyncLoadComponent(path: string) {
      const component = loadComponent(path);
      console.log(component);
      /**eg:start */
      /**添加路由 需要配置 name  便与后续增加子路由 */
      router.addRoute({ name: "test", path: "/test", component });
      /**eg:end */
    },
    /**获取路由表 */
    async getRoutes() {
      let list = [];
      // async action
    },
    catcheAddress(route: any) {
      let { path, params, query } = route;
      let routeInfo = {
        path,
        params,
        query,
      };
      sessionStorage.setItem("targetRoute", JSON.stringify(routeInfo));
    },
    /**
     * @description   鉴权失败  保存当前路由并重新向401
     */
    authError(route: any) {
      localStorage.removeItem("token");
      router.push("/login");
      this.catcheAddress(route);
      // other
    },
  },
  persist: true,
});
