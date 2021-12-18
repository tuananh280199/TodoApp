import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {TextComponent} from '../atoms/Text';
import {deviceHeight, deviceWidth} from '../../utils/dimensions';

interface Props {
  visible: boolean;
  title: string;
  handleClickOK: () => void;
  handleClickCancel: () => void;
}

export const ModalComponent = (props: Props) => {
  const {title, visible, handleClickOK, handleClickCancel} = props;

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.wrapContent}>
              <View style={styles.wrapTitle}>
                <TextComponent text={title} style={styles.title} />
              </View>
              <View>
                <TextComponent text={'Name'} style={styles.name} />
                <TextInput
                  style={styles.textInput}
                  placeholder={'Enter name task'}
                />
              </View>
              <View style={styles.footer}>
                <TouchableOpacity onPress={handleClickOK} style={styles.btnOK}>
                  <TextComponent text={'OK'} style={styles.txtBtn} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClickCancel}
                  style={styles.btnCancel}>
                  <TextComponent text={'Cancel'} style={styles.txtBtn} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: (deviceHeight - 250) / 2 - 40,
    backgroundColor: '#000',
    opacity: 0.8,
  },
  modalView: {
    height: 250,
    width: deviceWidth * 0.9,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapContent: {
    flex: 1,
    width: deviceWidth * 0.9,
    alignItems: 'center',
  },
  wrapTitle: {
    margin: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  textInput: {
    borderRadius: 4,
    marginVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    width: deviceWidth * 0.8,
  },
  name: {
    fontSize: 16,
    color: '#000',
  },
  footer: {
    width: deviceWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  btnOK: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33cc33',
    width: deviceWidth * 0.5 - 8,
    height: 48,
    borderRadius: 4,
  },
  btnCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: deviceWidth * 0.3 - 8,
    marginLeft: 16,
    height: 48,
    borderRadius: 4,
  },
  txtBtn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
