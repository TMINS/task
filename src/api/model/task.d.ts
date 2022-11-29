interface taskCreateModel {
  title: string;
  description: string;
  remark?: string;
}
interface taskSelectModel {
  task_id: string;
}

interface taskUpdateModel extends taskCreateModel, taskSelectModel {
  status: string | number;
}

interface taskPageModel {
  current: number;
  pageSize: number;
  title?: string;
}
interface taskInfoResModel {
  id: number;
  title: string;
  description: string;
  remark: string;
  status: number | string;
  createTime: string | Date;
  updateTime: string | Date;
  task_id: string;
}

export {
  taskCreateModel,
  taskSelectModel,
  taskPageModel,
  taskInfoResModel,
  taskUpdateModel,
};
