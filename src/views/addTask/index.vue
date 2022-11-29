<template>
  <div class="viewport">
    <baseHead title="新增任务" />
    <div class="content">
      <a-form
        :model="formState"
        name="basic"
        ref="formRef"
        :rules="rules"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
      >
        <a-form-item label="任务名" name="title">
          <a-input
            v-model:value="formState.title"
            placeholder="用于分类任务，不填默认取任务描述前8个字符"
          />
        </a-form-item>
        <a-form-item label="任务描述" name="description">
          <a-input
            v-model:value="formState.description"
            placeholder="描述一下任务情况"
          />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <!-- <a-input v-model:value="formState.title" placeholder="有额外内容可在此处填写" /> -->
          <editorView ref="editorDom" />
        </a-form-item>
      </a-form>

      <div class="submit">
        <base-button @click="handleSubmit"> 提交</base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import baseHead from "@/components/baseHead/index.vue";
import { reactive, ref } from "vue";
import { FormInstance, message } from "ant-design-vue";
import editorView from "@/components/editor/index.vue";
import baseButton from "@/components/baseButton/index.vue";
import { taskAdd } from "@/api/module/task";
import { taskCreateModel } from "@/api/model/task";
import { useRouter } from "vue-router";

const router = useRouter();
const formRef = ref<FormInstance>(); //表单实例
const formState = reactive({
  title: "",
  description: "",
  remark: "",
});
const rules = {
  title: [
    {
      required: true,
      message: "用于分类任务，不填默认取任务描述前8个字符",
    },
  ],
  description: [{ required: true, message: "请说明任务内容" }],
  remark: [{ required: false, message: "有额外内容可在此处填写" }],
};

const editorDom = ref<any>(null);
/**
 * @description 获取编辑器内容
 */
function getEditorContent() {
  return editorDom.value.getEditorHtml();
}

const handleReset = () => {
  formRef.value?.resetFields();
};

const handleSubmit = async () => {
  formState.remark = await getEditorContent();
  formRef.value
    ?.validateFields()
    .then((res) => {
      taskAdd(res as taskCreateModel).then((res2: any) => {
        if (res2.code == 200) {
          message.success("新增成功");
          router.back();
        } else {
          message.warning(res.message);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("存在未填写项");
    });
};
</script>

<style lang="scss" scoped>
.viewport {
  .content {
    position: relative;
    padding: 30px 120px;
  }
  .submit {
    padding-left: 12%;
  }
}
</style>
