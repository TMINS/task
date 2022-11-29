<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    :title="title"
    :sub-title="subTitle"
    @back="handleBack"
  />
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const route = useRouter();
defineProps({
  title: {
    type: String,
    default: "标题",
  },
  subTitle: {
    type: String,
    defalut: "",
  },
});
function handleBack() {
  route.go(-1);
}
</script>

<style lang="scss" scoped></style>
