import React, { useState } from 'react';
import {} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoute, MainRoute } from './router';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });
};
const MainStack = createStackNavigator();

export default function App() {
  // const [auth, setAuth] = useState(false);
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
    <Provider store={store}>
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
            name="MainPosts"
            component={MainRoute}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
