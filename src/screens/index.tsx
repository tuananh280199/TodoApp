//import modules
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextComponent} from '../components/atoms/Text';
import {todoTask} from '../interfaces';
import {getTodoLists} from '../services';

export const HomeScreen = () => {
  const [listTasks, setListTasks] = useState<Array<todoTask>>();

  useEffect(() => {
    getListTodoTasks();
  }, []);

  const getListTodoTasks = async () => {
    try {
      const response = await getTodoLists();
      console.log('data: ', response);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <View>
      <TextComponent text={'Todo Tasks'} />
    </View>
  );
};
