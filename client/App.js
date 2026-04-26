import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import GalleryScreen from './screens/GalleryScreen';
import MainTab from './navigation/MainTab';
import LensScreen from './screens/LensScreen';
import MessagesScreen from './screens/MessagesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
        <Stack.Screen name="Lens" component={LensScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
