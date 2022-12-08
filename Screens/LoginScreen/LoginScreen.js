import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { styles } from "./LoginScreen.styled";
import { Button } from "@rneui/themed/dist/Button";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { Pressable } from "react-native-web-hover";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Keyboard } from "react-native";

export const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const onLogin = () => {
    console.log({ email, password });
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  };
  return (
    <>
      <Text style={styles.p}>Войти</Text>
      <TextInput
        value={email}
        onChangeText={emailHandler}
        placeholder="Email"
        onFocus={() => setFocusEmail(true)}
        style={focusEmail ? styles.inputFocus : styles.input}
        onBlur={() => setFocusEmail(false)}
      />
      <View>
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder="Password"
          secureTextEntry={passwordVisibility}
          onFocus={() => setFocusPassword(true)}
          style={focusPassword ? styles.inputFocus : styles.input}
          onBlur={() => {
            setFocusPassword(false);
          }}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            style={{ position: "relative", left: "85%", top: "-230%" }}
            name={rightIcon}
            size={22}
            color="#232323"
          />
        </Pressable>
      </View>
      <Button
        title={"Login"}
        buttonStyle={{
          backgroundColor: "#FF6C00",
          width: "100%",
          height: 44,
          padding: 10,
          borderRadius: 20,
          marginTop: 27,
        }}
        onPress={onLogin}
      />
      <Text style={styles.title}>Нет аккаунта? Зарегистрироваться</Text>
    </>
  );
};
