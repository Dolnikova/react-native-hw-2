import React, { useState } from 'react';
import {} from 'react-native';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// import CreateScreen from './Screens/mainScreen/CreateScreen';
// import ProfileScreen from './Screens/mainScreen/ProfileScreen';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from './Screens/mainScreen/PostsScreen';
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen';
import { AuthRoute, MainRoute } from './router';
const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });
};
const MainStack = createStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);
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
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Auth"
          component={AuthRoute}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
          }}
          name="Posts"
          component={MainRoute}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
