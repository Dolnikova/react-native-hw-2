import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from '@rneui/themed/dist/Image';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/auth/authSelectors';
import { CommentsScreen } from './CommentsScreen';
import MapScreen from './MapScreen';

const PostsStack = createStackNavigator();
const Main = ({ navigation, route }) => {
  const user = useSelector(getUser);
  return (
    <View style={styles.container}>
      <Text>{user.userMail}</Text>
      {route.params && (
        <Image
          source={{ uri: route.params.photo }}
          style={{ width: 343, height: 200, borderRadius: 15 }}
        />
      )}
      <Text style={{ right: 136, top: 10 }}>
        {route.params ? route.params.name : 'name'}
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Map', { location: route.params.location });
        }}
        style={{ top: 10, alignItems: 'flex-start' }}
      >
        <SimpleLineIcons
          name="location-pin"
          size={16}
          style={{ left: 90, top: 18 }}
          color="#BDBDBD"
        />
        <Text style={{ right: -120 }}>
          {route.params?.location ? route.params.locationName : 'location'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Comments');
        }}
      >
        <EvilIcons
          name="comment"
          size={16}
          style={{ left: -150, top: -3 }}
          color="#BDBDBD"
        />
        <Text style={{ left: -125, top: -17 }}>0</Text>
      </TouchableOpacity>
    </View>
  );
};
const PostsScreen = () => {
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        options={{
          headerShown: false,
        }}
        name="Main"
        component={Main}
      />
      <PostsStack.Screen
        options={{
          headerShown: false,
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <PostsStack.Screen
        options={{
          headerShown: false,
        }}
        name="Map"
        component={MapScreen}
      />
    </PostsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: -100,
  },
});
export default PostsScreen;
