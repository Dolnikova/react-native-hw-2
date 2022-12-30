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
import { login } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

export const LoginScreen = ({ navigation }) => {
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const emailHandler = text => setEmail(text);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
    Keyboard.dismiss();
    // setKeyboardActive(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        // source={require('../../assets/imegs/flag.jpg')}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
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
                {/* <Pressable onPress={handlePasswordVisibility}> */}
                {/* <View style={styles.commentButton}>
                  <Button buttonStyle={styles.button}>
                    <MaterialCommunityIcons
                      style={{ position: 'absolute', left: '100%' }}
                      name={rightIcon}
                      size={22}
                      color="#232323"
                    />
                  </Button>
                </View> */}
                {/* <MaterialCommunityIcons
                    style={{ position: 'absolute', left: '100%' }}
                    name={rightIcon}
                    size={22}
                    color="#232323"
                  /> */}
                {/* </Pressable> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.loginButton}>
            <Button
              buttonStyle={styles.button}
              onPress={handlePasswordVisibility}
            >
              <MaterialCommunityIcons
                style={{ position: 'absolute' }}
                name={rightIcon}
                size={22}
                color="#232323"
              />
            </Button>
          </View>
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
