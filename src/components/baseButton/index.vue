<template>
  <div class="base-button">
    <span><slot>按钮</slot> </span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.base-button {
  display: inline-block;
  height: 36px;
  text-align: center;
  line-height: 36px;
  background: #1890ff;
  color: #eee;
  border-radius: 4px;
  padding: 0 24px;
  transition: all 0.3s;
  cursor: pointer;
}
.base-button:hover {
  opacity: 0.8;
}
</style>
