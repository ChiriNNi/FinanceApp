import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import TabBar from './components/TabBar';
import FirstMenu from './components/FirstMenu';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstMenu">
      <Stack.Screen name="FirstMenu" component={FirstMenu} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      {/* Custom TabBar Component */}
      <TabBar />
    </NavigationContainer>
  );
};

export default App;
