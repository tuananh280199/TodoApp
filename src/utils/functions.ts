import {ITodoTask} from '../interfaces';

export const filterData = (data: Array<ITodoTask>, keyword: string) => {
  return data.filter(item => item.name.includes(keyword));
};

export const deleteTodoTask = (data: Array<ITodoTask>, id: string) => {
  return data.filter(item => item.id !== id);
};
