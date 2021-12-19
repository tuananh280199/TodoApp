import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {TextComponent} from '../atoms/Text';
import {deviceWidth} from '../../utils/dimensions';
import {ITodoTask} from '../../interfaces';

interface ITodoItem {
  item: ITodoTask;
  handleEditTask: (item: ITodoTask) => void;
  handleRemoveTask: (id: string) => void;
  handleChangeStatusTask: (item: ITodoTask) => void;
}

export const TodoItem = (props: ITodoItem) => {
  const {item, handleEditTask, handleRemoveTask, handleChangeStatusTask} =
    props;

  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <TouchableOpacity onPress={() => handleChangeStatusTask(item)}>
          <Fontisto
            name={item.status ? 'checkbox-active' : 'checkbox-passive'}
            size={18}
            color={item.status ? '#33cc33' : '#8c8c8c'}
          />
        </TouchableOpacity>
        <TextComponent
          text={item.name}
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={[styles.nameTask, item.status && styles.taskDone]}
        />
      </View>
      <View style={styles.wrapIcon}>
        {!item.status ? (
          <TouchableOpacity onPress={() => handleEditTask(item)}>
            <AntDesign name={'edit'} size={20} color={'blue'} />
          </TouchableOpacity>
        ) : (
          <View style={styles.noIcon} />
        )}
        <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
          <AntDesign name={'delete'} size={20} color={'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth - 32,
    height: 56,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 1,
  },
  wrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (deviceWidth - 32) * 0.8,
    paddingLeft: 8,
  },
  wrapIcon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: (deviceWidth - 32) * 0.2,
  },
  nameTask: {
    marginLeft: 8,
  },
  taskDone: {
    textDecorationLine: 'line-through',
  },
  noIcon: {
    width: 20,
  },
});
