import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen';
import PostsScreen from './Screens/mainScreen/PostsScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen';
import { RegistrationScreen } from './Screens/RegistrationScreen/RegistrationScreen';
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logOut } from './redux/auth/authOperations';
import { updateUserProfile } from './redux/auth/authSlice';
import { auth } from './firebase/config';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const AuthRoute = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Register"
        component={RegistrationScreen}
      />
    </MainStack.Navigator>
  );
};

const MainRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="appstore-o" size={24} />,
          tabBarLabel: '',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Posts', { screen: 'Posts' });
              }}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                style={{ left: 20 }}
                color="black"
              />
            </Pressable>
          ),
        }}
      />
      <MainTab.Screen
        name="Create a post"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign
              name="pluscircle"
              size={32}
              style={{
                top: 5,
              }}
              color={'orange'}
            />
          ),
          tabBarLabel: '',
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="user" size={24} />,
          tabBarLabel: '',
        }}
      />
    </MainTab.Navigator>
  );
};

export const useRoute = isAuth => {
  if (!isAuth) {
    return <AuthRoute />;
  }
  return <MainRoute />;
};
