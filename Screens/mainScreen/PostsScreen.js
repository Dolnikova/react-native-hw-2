import { AntDesign, EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from '@rneui/themed/dist/Image';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../firebase/config';
import { logOut } from '../../redux/auth/authOperations';
import { getUser } from '../../redux/auth/authSelectors';
import { updateUserProfile } from '../../redux/auth/authSlice';
import { CommentsScreen } from './CommentsScreen';
import MapScreen from './MapScreen';

const PostsStack = createStackNavigator();
const Main = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    user.name
      ? onSnapshot(
          query(collection(db, 'posts'), where('userName', '==', user.name)),
          snapshot => {
            const posts = [];
            snapshot.forEach(doc => {
              posts.push(doc.data());
            });
            setPosts(posts);
          }
        )
      : dispatch(updateUserProfile(auth.currentUser));
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 48 }}>
        <Text>{user.name}</Text>
        <Text>{user.userMail}</Text>
      </View>
      <FlatList
        style={{ marginTop: 48 }}
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SafeAreaView style={{ marginBottom: 34 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 343, height: 200, borderRadius: 15 }}
            />
            <Text style={{ top: 10 }}>{item.name}</Text>
            <View style={styles.containerSoce}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Map', { location: item.location });
                }}
                style={{ flexDirection: 'row' }}
              >
                <SimpleLineIcons
                  name="location-pin"
                  size={16}
                  style={{ right: 8 }}
                  color="#BDBDBD"
                />
                <Text>{item.locationName}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Comments', { photo: item.photo });
                }}
                style={{ flexDirection: 'row' }}
              >
                <EvilIcons name="comment" size={18} color="#BDBDBD" />
                <Text style={{ left: 9 }}>0</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      />
    </View>
  );
};
const PostsScreen = () => {
  const dispatch = useDispatch();
  return (
    <PostsStack.Navigator>
      <PostsStack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                dispatch(logOut());
              }}
              style={{ right: 20 }}
            >
              <AntDesign name="logout" size={20} style={{ opacity: 0.3 }} />
            </Pressable>
          ),
          // headerShown: false,
        }}
        name="MainPosts"
        component={Main}
      />
      <PostsStack.Screen
        options={
          {
            // headerShown: false,
          }
        }
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
    // top: -100,
  },
  containerSoce: {
    top: 18,
    // width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
});
export default PostsScreen;
