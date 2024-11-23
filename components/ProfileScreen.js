import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="user-circle" size={100} color="#ffffff" style={styles.icon} />
      <Text style={styles.title}>Профиль пользователя</Text>
      <Text style={styles.infoText}>Имя пользователя: Иван Иванов</Text>
      <Text style={styles.infoText}>Email: example@mail.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
});

export default ProfileScreen;