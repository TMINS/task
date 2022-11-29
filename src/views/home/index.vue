<template>
  <div class="viewport">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="任务板"
      sub-title=" "
    />
    <div class="content">
      <div class="handle">
        <base-button @click="handleRoute('/addTask')">新增任务</base-button>
        <base-button @click="handleRoute('/setting')">设置</base-button>
      </div>

      <div class="list">
        <div class="item list-head">
          <i class="item-number">序号</i>
          <h4>标题</h4>
          <p>任务描述</p>
          <span class="status">状态</span>
          <span class="time">更新时间</span>
        </div>
        <div
          class="item"
          v-for="(item, index) in list"
          :ket="item.task_id"
          @click="handleDetail(item.task_id)"
        >
          <i class="item-number">{{ index + 1 }}</i>
          <h4>{{ item.title }}</h4>
          <p>
            {{ item.description }}
          </p>
          <span :class="['status', `status${item.status}`]">未开始</span>
          <span class="time">{{ item.updateTime }}</span>
        </div>
      </div>
      <div class="pagination">
        <a-pagination
          v-model:current="pagination.current"
          v-model:pageSize="pagination.size"
          :total="pagination.total"
          @change="getList"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRouteStore } from "@/store/module/route";
import baseButton from "@/components/baseButton/index.vue";
import { taskList } from "@/api/module/task";
import { taskInfoResModel } from "@/api/model/task";

const routeStore = useRouteStore();
const router = useRouter();
const list = ref<taskInfoResModel[]>([]);
const pagination = ref({
  current: 1,
  size: 10,
  total: 0,
});

onMounted(() => {
  getList();
});

function handleDetail(id: string = "") {
  router.push({
    name: "detail",
    params: {
      id,
    },
  });
}
function handleRoute(path: string) {
  router.push({
    path,
  });
}
const getList = () => {
  taskList({
    current: pagination.value.current,
    pageSize: pagination.value.size,
  }).then((res: any) => {
    console.log(res);
    if (res.code == 200) {
      pagination.value.total = res.data.total;
      list.value = res.data.records;
    }
  });
};
</script>

<style lang="scss" scoped>
.viewport {
  .content {
    padding: 30px 120px;
    .handle {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .base-button {
        margin-left: 24px;
      }
    }
    .list {
      .item {
        display: flex;
        align-items: center;
        border: 1px solid #eee;
        padding: 12px 24px;
        font-size: 16px;
        margin-bottom: 12px;
        cursor: pointer;
        .item-number {
          display: inline-block;
          width: 80px;
          text-align: center;
          padding: 0 20px;
        }
        h4 {
          flex-shrink: 0;
          width: 180px;
          margin: 0;
          text-overflow: ellipisis;
          white-space: nowrap;
          overflow: hidden;
        }
        p {
          // width: calc(100% - 180px - 100px);
          // width: 50%;
          flex: 1;
          margin: 0;
          padding: 0 40px;
          color: #999999;
        }
        .status {
          flex-shrink: 0;
          display: inline-block;
          text-align: center;
          width: 108px;
          padding: 0 24px;
        }
        .status0 {
          color: #faad14;
        }
        .status1 {
          color: #52c41a;
        }
        .status2 {
          color: #1890ff;
        }
        .time {
          width: 200px;
          flex-shrink: 0;
          padding: 0 24px;
        }
      }
      .list-head {
        border: none;
        cursor: default;
        p {
          color: #000000;
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
}
</style>
