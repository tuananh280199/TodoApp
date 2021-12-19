import {ITodoTask} from '../interfaces';

export const filterData = (data: Array<ITodoTask>, keyword: string) => {
  return data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase()),
  );
};

export const editTodoTask = (
  data: Array<ITodoTask>,
  task: ITodoTask,
  editName: boolean,
) => {
  const idx = data.findIndex(item => item.id === task.id);
  if (editName) {
    data[idx].name = task.name;
  } else {
    data[idx].status = task.status;
  }
  return data;
};

export const deleteTodoTask = (data: Array<ITodoTask>, id: string) => {
  return data.filter(item => item.id !== id);
};
