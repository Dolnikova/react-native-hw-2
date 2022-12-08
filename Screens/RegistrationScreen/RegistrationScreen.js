import { Button } from "@rneui/themed/dist/Button";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./RegistrationScreen.styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { Pressable } from "react-native-web-hover";
import { Keyboard } from "react-native";

export const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState("");
  const onRegister = () => {
    console.log({ name, email, password });
    setEmail("");
    setPassword("");
    setName("");
    Keyboard.dismiss();
  };

  return (
    <>
      <Text style={styles.p}>Регистрация</Text>
      <TextInput
        value={name}
        onChangeText={(value) => setName(value)}
        placeholder="Login"
        onFocus={() => setFocusName(true)}
        style={focusName ? styles.inputFocus : styles.input}
        onBlur={() => {
          setFocusName(false);
        }}
      />
      <TextInput
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder="Email"
        onFocus={() => setFocusEmail(true)}
        style={focusEmail ? styles.inputFocus : styles.input}
        onBlur={() => {
          setFocusEmail(false);
        }}
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
        title={"Register"}
        buttonStyle={{
          backgroundColor: "#FF6C00",
          width: "100%",
          height: 44,
          padding: 10,
          borderRadius: 20,
          marginTop: 27,
        }}
        onPress={onRegister}
      />
      <Text style={styles.title}>Уже есть аккаунт? Войти</Text>
    </>
  );
};
