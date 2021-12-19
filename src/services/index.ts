import axios from '../axios';
import {ITodoTask} from '../interfaces';

export const getTodoLists = () => {
  return axios.get('/todo_list');
};

export const addTask = (nameTask: string) => {
  return axios.post('/todo_list', {
    name: nameTask,
    status: false,
  });
};

export const editTask = (task: ITodoTask) => {
  return axios.put(`/todo_list/${task.id}`, {
    name: task.name,
    status: task.status,
  });
};

export const deleteTask = (id: string) => {
  return axios.delete(`/todo_list/${id}`);
};
