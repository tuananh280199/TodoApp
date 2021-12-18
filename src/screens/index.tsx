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
import {getTodoLists, deleteTask} from '../services';
import {TodoItem} from '../components/molecules/TodoItem';
import {deviceHeight} from '../utils/dimensions';
import IconPlus from 'react-native-vector-icons/Entypo';
import {filterData, deleteTodoTask} from '../utils/functions';
import {ModalComponent} from '../components/molecules/ModalCommon';

export const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listTasks, setListTasks] = useState<Array<ITodoTask>>([]);
  const [listTasksFilter, setListTaskFilter] = useState<Array<ITodoTask>>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [visibleModalAdd, setVisibleModalAdd] = useState<boolean>(false);

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

  const handleAddTask = () => {};

  const handleEditTask = (id: string) => {};

  const handleRemoveTask = async (id: string) => {
    try {
      await deleteTask(id);
      setListTasks(deleteTodoTask(listTasks, id));
      setListTaskFilter(deleteTodoTask(listTasksFilter, id));
    } catch (e) {
      throw e;
    }
  };

  const renderItem = ({item}: {item: ITodoTask}) => {
    return (
      <TodoItem
        id={item.id}
        name={item.name}
        handleEditTask={handleEditTask}
        handleRemoveTask={handleRemoveTask}
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
