<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="simple"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="simple"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ImageElement } from "./model";
import { deleteImg } from "@/api/module/editor";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p></p>");

const toolbarConfig = {};
const uploadImglist = ref<string[]>([]); //已上传的图片
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    insertImage: {
      onInsertedImage(imageNode: ImageElement | null) {
        if (imageNode == null) return;
        const { src, alt, url, href } = imageNode;
        console.log("inserted image", imageNode);
        uploadImglist.value.push(imageNode.src);
      },
    },
    uploadImage: {
      fieldName: "file",
      maxFileSize: 10 * 1024 * 1024, // 10M
      server: "/api/editor/uploadImg",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  },
};

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

/**
 * 获取编辑器的html
 */
function getEditorHtml() {
  let editor = editorRef.value;
  let res = editor.getHtml();
  // 获取所有图片  对比删除
  deleteOtherImg();
  if (!editor.getText()) {
    return "";
  } else {
    return res;
  }
}
const setEditorHtml = (res: string) => {
  let editor = editorRef.value;
  editor.setHtml(res);
};
/**
 *
 */
function deleteOtherImg() {
  let editor = editorRef.value;
  let nowImageList = editor.getElemsByType("image");
  let list = uploadImglist.value.filter((item) => {
    let flag = nowImageList.find((item2: { src: string }) => item == item2.src);
    return !flag;
  });
  console.log("需要删除的图片", list);
  deleteImg({ urls: list })
    .then((res: any) => {
      if (res.code == 200) {
        console.log("删除成功");
      }
    })
    .catch(() => {
      console.log("删除失败");
    });
}

/**
 * 暴露方法给父组件使用
 */
defineExpose({
  getEditorHtml,
  setEditorHtml,
});
</script>

<style lang="scss" scoped></style>
