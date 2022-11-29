<template>
  <div class="viewport" :style="style">
    <div class="block">
      <h2>TASK</h2>
      <p class="gap"></p>
      <div class="account">
        <input type="text" v-model="account" placeholder="账号" />
      </div>
      <p class="gap"></p>
      <div class="password">
        <input type="password" v-model="password" placeholder="密码" />
      </div>
      <p class="gap"></p>
      <div class="login" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>

    <div
      class="color-name"
      @mouseenter="showLink = true"
      @mouseleave="showLink = false"
    >
      <img src="@/assets/icon3-fill.png" alt="" />
      <span>{{ nowColor?.name }}</span>

      <p v-show="showLink">色调参考来源<span @click="openLink">中国色</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import colorList, { color } from "@/data/color";
import {
  ref,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
// import * as _ from "lodash";

import config from "@/config/index";
import { login } from "@/api/module/user";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";

const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const { $xss, $md5 } = appContext.config.globalProperties;

const router = useRouter();
const store = useStore();

const showLink = ref<Boolean>();
const account = ref<string>("admin");
const password = ref<string>("123456");
const len = ref(colorList.length);
const style = ref({});
const nowColor = ref<color>();
onMounted(() => {
  randomColor();
  setInterval(() => {
    randomColor();
  }, 5000);

  document.onkeyup = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      // console.log("登录");
      // console.log(_);
      // _.debounce(handleLogin, 500);
      handleLogin();
    }
  };
});

const randomColor = () => {
  let random: number = Math.round(Math.random() * len.value - 1);
  let data: color = colorList[random];
  nowColor.value = data;
  style.value = {
    background: `rgb(${data?.RGB.toString()},.5) `,
  };
};

const openLink = () => {
  window.open("http://zhongguose.com/");
};

const handleLogin = () => {
  if (!account.value || !password.value) {
    message.warning("请输入账号和密码");
    return;
  }
  let act = $xss(account.value, config.xssOptions);
  let psd = $md5($xss(password.value, config.xssOptions));

  login({
    account: act,
    password: psd,
  }).then(async (res: any) => {
    if (res.code == 200) {
      message.success("登录成功");
      console.log(res.data);
      await store.updateUserInfo(res.data);
      router.push("/");
    } else {
      message.warning(res.data);
    }
  });
};
</script>

<style lang="scss" scoped>
.viewport {
  height: 100vh;
  transition: 2s all;
  position: relative;
  .block {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    h4 {
      font-size: 18px;
    }
    .account,
    .password {
      position: relative;
    }
    .account input,
    .password input {
      border: none;
      background: none;
      outline: none;
      text-align: center;
      height: 32px;
      line-height: 32px;
    }
    .account::after,
    .password::after {
      content: "";
      position: absolute;
      display: block;
      width: 0%;
      height: 2px;
      background: #eee;
      bottom: 0;
      left: 0;
      transition: all 0.3s;
    }
    .account:hover::after,
    .password:hover::after {
      width: 100%;
    }
    .login {
      position: relative;
      cursor: pointer;
    }
  }
  .gap {
    height: 20px;
  }
  .color-name {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 4px;
    left: 4px;
    font-size: 12px;
    color: #ffffff;
    img {
      width: 16px;
      flex-shrink: 0;
    }
    span {
      padding-left: 4px;
    }
    p {
      margin: 0;
      transition: all 0.3s;
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
