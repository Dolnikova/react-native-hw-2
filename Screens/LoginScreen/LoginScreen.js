import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { styles } from './LoginScreen.styled';
import { Button } from '@rneui/themed/dist/Button';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { Pressable } from 'react-native-web-hover';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { ImageBackground } from 'react-native';

export const LoginScreen = ({ navigation }) => {
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const emailHandler = text => setEmail(text);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const onLogin = () => {
    navigation.navigate('MainPosts');
    setEmail('');
    setPassword('');
    Keyboard.dismiss();
    // setKeyboardActive(false);
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
                  <Text style={styles.p}>Войти</Text>
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
            title={'Login'}
            buttonStyle={{
              backgroundColor: '#FF6C00',
              width: '100%',
              height: 44,
              padding: 10,
              borderRadius: 20,
              marginTop: 27,
            }}
            onPress={onLogin}
          />
          <TouchableHighlight onPress={() => navigation.navigate('Register')}>
            <Text style={styles.title}>Нет аккаунта? Зарегистрироваться</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
};
