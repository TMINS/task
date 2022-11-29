import { createApp } from "vue";
import { nextTick } from "@vue/runtime-core";
import Antd from "ant-design-vue";

import App from "./App.vue";
import { createPinia } from "pinia";
// import { plugins } from "./store/plugins";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "ant-design-vue/dist/antd.css";
// router
import router from "./router/index";
import "./router/guard.ts";

import xss from "xss";
import md5 from "js-md5";

const APP = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
APP.use(pinia);
APP.use(router);
APP.use(Antd);
APP.mount("#app");

nextTick(() => {
  APP.config.globalProperties.$xss = xss;
  APP.config.globalProperties.$md5 = md5;
});
