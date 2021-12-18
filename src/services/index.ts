import axios from '../axios';

export const getTodoLists = () => {
  return axios.get('/todo_list');
};

export const deleteTask = (id: string) => {
  return axios.delete(`/todo_list/${id}`);
};
