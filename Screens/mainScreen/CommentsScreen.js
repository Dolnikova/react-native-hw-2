import { Image } from '@rneui/themed/dist/Image';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const CommentsScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.photo }}
        style={{ width: 343, height: 200, borderRadius: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    top: 32,
    alignItems: 'center',
    // top: -100,
  },
});
