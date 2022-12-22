import { Button } from '@rneui/themed/dist/Button';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './RegistrationScreen.styled';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { Pressable } from 'react-native-web-hover';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PostsScreen from '../mainScreen/PostsScreen';
import { ImageBackground } from 'react-native';

export const RegistrationScreen = ({ navigation }) => {
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  const onRegister = () => {
    navigation.navigate('MainPosts');
    setEmail('');
    setPassword('');
    setName('');
    Keyboard.dismiss();
    // setKeyboardActive(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/imegs/flag.jpg')}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <Pressable onPress={handlePasswordVisibility}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
                setKeyboardActive(false);
              }}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isKeyboardActive ? 20 : 100,
                }}
              >
                <View>
                  <Text style={styles.p}>Регистрация</Text>
                  <TextInput
                    value={name}
                    onChangeText={value => setName(value)}
                    placeholder="Login"
                    onFocus={() => {
                      setFocusName(true);
                      setKeyboardActive(true);
                    }}
                    style={focusName ? styles.inputFocus : styles.input}
                    onBlur={() => {
                      setFocusName(false);
                    }}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <TextInput
                    value={email}
                    onChangeText={value => setEmail(value)}
                    placeholder="Email"
                    onFocus={() => {
                      setFocusEmail(true);
                      setKeyboardActive(true);
                    }}
                    style={focusEmail ? styles.inputFocus : styles.input}
                    onBlur={() => {
                      setFocusEmail(false);
                    }}
                  />
                </View>
                <View style={{ position: 'relative', marginTop: 20 }}>
                  <TextInput
                    value={password}
                    onChangeText={value => setPassword(value)}
                    placeholder="Password"
                    secureTextEntry={passwordVisibility}
                    onFocus={() => {
                      setFocusPassword(true);
                      setKeyboardActive(true);
                    }}
                    style={focusPassword ? styles.inputFocus : styles.input}
                    onBlur={() => {
                      setFocusPassword(false);
                    }}
                  />
                  <MaterialCommunityIcons
                    style={{ position: 'absolute', left: '90%', top: '20%' }}
                    name={rightIcon}
                    size={22}
                    color="#232323"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </KeyboardAvoidingView>
        <View style={{ bottom: '10%' }}>
          <Button
            title={'Register'}
            buttonStyle={{
              backgroundColor: '#FF6C00',
              width: '100%',
              height: 44,
              padding: 10,
              borderRadius: 20,
              marginTop: 27,
            }}
            onPress={onRegister}
          />
          <TouchableHighlight onPress={() => navigation.navigate('Login')}>
            <Text style={styles.title}>Уже есть аккаунт? Войти</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
};
