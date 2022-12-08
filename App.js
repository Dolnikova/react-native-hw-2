import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { styles } from "./Screens/RegistrationScreen/RegistrationScreen.styled";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { ImageBackground } from "react-native";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
};
export default function App() {
  const [isReady, setIsReady] = useState(false);
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setIsReady(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/imegs/easy.jpg")}
        ></ImageBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <RegistrationScreen />
          <LoginScreen />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
