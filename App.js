import React, { useState } from 'react';
import {} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './redux/store';
import { useRoute } from './router';
import { auth } from './firebase/config';
import { Provider, useDispatch } from 'react-redux';
import { updateUserProfile } from './redux/auth/authSlice';

const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });
};

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  auth.onAuthStateChanged(user => {
    setUser(user);
  });

  const route = useRoute(user);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={error => console.log(error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>{route}</NavigationContainer>
    </Provider>
  );
}
