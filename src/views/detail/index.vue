<template>
  <div class="viewport">
    <baseHead title="任务详情" :subTitle="taskInfo.title || '--'" />
    <div class="content">
      <div class="description">
        <p>任务描述</p>
        <span>{{ taskInfo.description || "--" }}</span>
      </div>
      <div class="result">
        <h3>任务结果</h3>
        <ul>
          <li
            :class="taskInfo.status == '0' ? 'nostart' : ''"
            @click="handleStatus('0')"
          >
            <span>未开始</span>
          </li>
          <li
            :class="taskInfo.status == '2' ? 'pending' : ''"
            @click="handleStatus('2')"
          >
            <span>进行中</span>
          </li>
          <li
            :class="taskInfo.status == '1' ? 'complate' : ''"
            @click="handleStatus('1')"
          >
            <span>已完成</span>
          </li>
          <li
            :class="taskInfo.status == '3' ? 'incomplate' : ''"
            @click="handleStatus('3')"
          >
            <span>未完成</span>
          </li>
        </ul>
      </div>
      <div class="remark">
        <h3>备注</h3>
        <editor-view ref="editorDom" />
      </div>

      <div class="submit" @click="handleSubmit">
        <base-button>保存</base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Component } from "vue";
import { useRouter, useRoute } from "vue-router";
import editorView from "@/components/editor/index.vue";
import baseButton from "@/components/baseButton/index.vue";
import baseHead from "@/components/baseHead/index.vue";
import { taskDetail, taskUpdate } from "@/api/module/task";
import { taskInfoResModel } from "@/api/model/task";
import { message } from "ant-design-vue";
import { isObjectEqual } from "@/utils/utils";

const router = useRouter();
const route = useRoute();

const taskInfo = ref<taskInfoResModel | any>({});
let taskInfoBackups = {};

const editorDom = ref<any>(null);

function handleStatus(staus: string) {
  taskInfo.value.status = staus;
}

/**
 * @description 获取编辑器内容
 */
function getEditorContent() {
  return editorDom.value.getEditorHtml();
}
const setEditorContent = (res: string) => {
  editorDom.value.setEditorHtml(res);
};

defineProps({
  isBack: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  getDetail();
});

const getDetail = () => {
  taskDetail({
    task_id: route.params.id as string,
  }).then((res: any) => {
    if (res.code == 200) {
      taskInfo.value = res.data;
      taskInfoBackups = res.data;
      setEditorContent(res.data.remark);
    } else {
      message.warning("查询失败，请联系管理员");
    }
  });
};
const handleSubmit = async () => {
  let remark: string = await getEditorContent();
  let { title, description, id, status, task_id } = taskInfo.value;
  let info = {
    ...taskInfo.value,
    remark,
  };
  let flag: boolean = isObjectEqual(taskInfoBackups, info);
  // 数据相同就放弃提交 返回上一页
  if (flag) {
    console.log("内容相同直接返回");
    router.back();
    return false;
  }
  taskUpdate({
    title,
    description,
    remark,
    status,
    task_id,
  })
    .then((res) => {
      if (res.code == 200) {
        message.success("更新成功");
        router.back();
      } else {
        message.warning(res.message);
      }
    })
    .catch((err) => {
      message.error("服务器出现异常，请稍后再试或联系开发人员");
    });
};
</script>

<style lang="scss" scoped>
.viewport {
  .content {
    padding: 30px 120px;
    position: relative;
  }
  .description {
    padding: 24px 0;
    p {
      font-size: 18px;
    }
    span {
      font: 16px;
    }
  }
  .result {
    ul {
      padding: 12px 0;
      display: flex;
      align-items: center;
      li {
        width: 20%;
        padding: 8px;
        border: 1px solid #eee;
        margin-right: 12px;
        cursor: pointer;
        flex-shrink: 0;
        position: relative;
      }
      li:last-child {
        margin-right: 0;
      }
      .nostart::after {
        content: "";
        width: 4px;
        height: 4px;
        display: inline-block;
        background: #faad14;
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
      }
      .nostart::before {
        content: "";
        width: 4px;
        height: 4px;
        display: inline-block;
        background: #faad14;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }
      .pending::before {
        content: "";
        width: 14px;
        height: 14px;
        border-top: 1px solid #1890ff;
        border-left: 1px solid #1890ff;
        border-right: 1px solid transparent;
        border-bottom: 1px solid transparent;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        right: 8px;
        top: 48%;
        animation: ani-rotate infinite 2s;
      }

      .complate::after {
        content: "";
        width: 8px;
        height: 1px;
        display: inline-block;
        background: #52c41a;
        transform: rotate(45deg);
        position: absolute;
        top: 50%;
        right: 18px;
      }
      .complate::before {
        content: "";
        width: 14px;
        height: 1px;
        display: inline-block;
        background: #52c41a;
        transform: rotate(-45deg);
        position: absolute;
        top: 48%;
        right: 8px;
      }
      .incomplate::before {
        content: "";
        width: 14px;
        height: 1px;
        display: inline-block;
        background: #f5222d;
        position: absolute;
        top: 50%;
        right: 8px;
        transform: rotate(45deg);
      }
      .incomplate::after {
        content: "";
        width: 14px;
        height: 1px;
        display: inline-block;
        background: #f5222d;
        position: absolute;
        top: 50%;
        right: 8px;
        transform: rotate(-45deg);
      }
    }
  }
  .remark {
    padding: 24px 0;
  }
  .submit {
    position: absolute;
    top: 50px;
    right: 50px;
  }
}
@keyframes ani-rotate {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }
  100% {
    transform: translateY(-50%) rotate(360deg);
  }
} ;
</style>
