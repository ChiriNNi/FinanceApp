import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MainScreen from './MainScreen';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;