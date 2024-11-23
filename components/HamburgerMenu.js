import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HamburgerMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="bars" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.menuText}>Главная</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                // Navigate to Settings (You need to add SettingsScreen to your StackNavigator)
              }}
            >
              <Text style={styles.menuText}>Настройки</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                // Handle logout logic here
              }}
            >
              <Text style={styles.menuText}>Выйти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Profile');
              }}
            >
              <Text style={styles.menuText}>Профиль</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#1E1E1E',
    width: 250,
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default HamburgerMenu;