import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {TextComponent} from '../components/atoms/Text';
import {ITodoTask} from '../interfaces';
import {getTodoLists, deleteTask, addTask, editTask} from '../services';
import {TodoItem} from '../components/molecules/TodoItem';
import {deviceHeight} from '../utils/dimensions';
import IconPlus from 'react-native-vector-icons/Entypo';
import {filterData, deleteTodoTask, editTodoTask} from '../utils/functions';
import {ModalComponent} from '../components/molecules/ModalCommon';

export const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listTasks, setListTasks] = useState<Array<ITodoTask>>([]);
  const [listTasksFilter, setListTaskFilter] = useState<Array<ITodoTask>>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [taskEdit, setTaskEdit] = useState<ITodoTask>({
    id: '',
    name: '',
    status: false,
  });
  const [visibleModalAdd, setVisibleModalAdd] = useState<boolean>(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);

  useEffect(() => {
    getListTodoTasks();
  }, []);

  const getListTodoTasks = async () => {
    try {
      setLoading(true);
      const response = await getTodoLists();
      if (response) {
        setListTasks(response.data);
        setListTaskFilter(response.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleChangeTextFilter = (text: string) => {
    setKeyword(text);
    const dataAfterFilter = filterData(listTasks, text);
    setListTaskFilter(dataAfterFilter);
  };

  const handleCancelAddTask = () => {
    setVisibleModalAdd(false);
  };

  const handleCancelEditTask = () => {
    setVisibleModalEdit(false);
  };

  const handleEditTask = (item: ITodoTask) => {
    setTaskEdit(item);
    setVisibleModalEdit(true);
  };

  const handleAddTask = async (nameTask: string) => {
    try {
      const response = await addTask(nameTask);
      if (response) {
        handleCancelAddTask();
        setListTasks(listTasks.concat([response.data]));
        setListTaskFilter(listTasksFilter.concat([response.data]));
      }
    } catch (e) {
      handleCancelAddTask();
      throw e;
    }
  };

  const handleClickOkEditTask = async (nameTask: string) => {
    try {
      const params = {
        ...taskEdit,
        name: nameTask,
      };
      const response = await editTask(params);
      if (response) {
        setListTasks([...editTodoTask(listTasks, params, true)]);
        setListTaskFilter([...editTodoTask(listTasksFilter, params, true)]);
        handleCancelEditTask();
      }
    } catch (e) {
      handleCancelEditTask();
      throw e;
    }
  };

  const handleRemoveTask = async (id: string) => {
    try {
      await deleteTask(id);
      setListTasks(deleteTodoTask(listTasks, id));
      setListTaskFilter(deleteTodoTask(listTasksFilter, id));
    } catch (e) {
      throw e;
    }
  };

  const handleChangeStatusTask = async (item: ITodoTask) => {
    try {
      const params = {
        ...item,
        status: !item.status,
      };
      const response = await editTask(params);
      if (response) {
        setListTasks([...editTodoTask(listTasks, params, false)]);
        setListTaskFilter([...editTodoTask(listTasksFilter, params, false)]);
      }
    } catch (e) {
      throw e;
    }
  };

  const renderItem = ({item}: {item: ITodoTask}) => {
    return (
      <TodoItem
        item={item}
        handleEditTask={handleEditTask}
        handleRemoveTask={handleRemoveTask}
        handleChangeStatusTask={handleChangeStatusTask}
      />
    );
  };

  const keyExtractor = (item: ITodoTask) => item.id.toString();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.wrapHeader}>
          <TextComponent text={'Todo Tasks'} style={styles.title} />
          <TouchableOpacity
            style={styles.wrapIconAdd}
            onPress={() => setVisibleModalAdd(true)}>
            <IconPlus name={'plus'} size={20} color={'#33cc33'} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapInput}>
          <TextInput
            style={styles.textInput}
            placeholder={'Enter name task to filter'}
            value={keyword}
            onChangeText={handleChangeTextFilter}
          />
        </View>
        <FlatList
          data={listTasksFilter}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.noData}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'#33cc33'} />
              ) : (
                <TextComponent text={'No Todo Task'} />
              )}
            </View>
          )}
        />
        <ModalComponent
          visible={visibleModalAdd}
          title={'Add Task'}
          handleClickOK={handleAddTask}
          handleClickCancel={handleCancelAddTask}
        />
        <ModalComponent
          task={taskEdit}
          visible={visibleModalEdit}
          title={'Edit Task'}
          handleClickOK={handleClickOkEditTask}
          handleClickCancel={handleCancelEditTask}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  noData: {
    height: deviceHeight - 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    color: '#33cc33',
    fontWeight: 'bold',
  },
  wrapInput: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 40,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderColor: '#33cc33',
  },
  wrapIconAdd: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#33cc33',
  },
});
