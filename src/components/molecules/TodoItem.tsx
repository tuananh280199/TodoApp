import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {TextComponent} from '../atoms/Text';
import {deviceWidth} from '../../utils/dimensions';

interface ITodoItem {
  id: string;
  name: string;
  handleEditTask: (id: string) => void;
  handleRemoveTask: (id: string) => void;
}

export const TodoItem = (props: ITodoItem) => {
  const {id, name, handleEditTask, handleRemoveTask} = props;
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <TextComponent text={name} numberOfLines={2} ellipsizeMode={'tail'} />
      </View>
      <View style={styles.wrapIcon}>
        <TouchableOpacity onPress={() => handleEditTask(id)}>
          <AntDesign name={'edit'} size={20} color={'blue'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveTask(id)}>
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
    justifyContent: 'center',
    width: (deviceWidth - 32) * 0.8,
    paddingLeft: 8,
  },
  wrapIcon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: (deviceWidth - 32) * 0.2,
  },
});
