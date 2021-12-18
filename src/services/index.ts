import axios from '../axios';

export const getTodoLists = () => {
  return axios.get('/todo_list');
};
