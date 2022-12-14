import React from 'react';
import { ImageBackground } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../../assets/imegs/contentblock.png')}
      />
      <ImageBackground
        style={styles.ellips}
        source={require('../../assets/imegs/ellipsenoactiv.png')}
      />
      <ImageBackground
        style={styles.vector}
        source={require('../../assets/imegs/vector.png')}
      />
      <ImageBackground
        style={styles.buttonnoactyv}
        source={require('../../assets/imegs/notactive.png')}
      />
      <Text style={styles.text}>Загрузите фото</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    left: 0,
    top: 32,
    width: 343,
    height: 240,
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // justifyContent: 'end',
  },
  vector: {
    left: 0,
    top: -280,
    width: 20,
    height: 18,
    flex: 1,
    resizeMode: 'cover',
  },
  ellips: {
    left: 0,
    top: -97,
    width: 60,
    height: 60,
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    right: 90,
    bottom: 375,
    opacity: 0.2,
  },
  buttonnoactyv: {
    // left: 0,
    bottom: 120,
    width: 343,
    height: 51,
    // flex: 1,
  },
});
export default CreatePostsScreen;
