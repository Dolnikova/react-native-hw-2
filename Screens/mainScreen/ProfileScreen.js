import { AntDesign, EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from '@rneui/themed/dist/Image';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { logOut } from '../../redux/auth/authOperations';
import { getUser } from '../../redux/auth/authSelectors';
import { updateUserProfile } from '../../redux/auth/authSlice';

const PofileScreen = ({ navigation }) => {
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
    <ImageBackground
      style={styles.image}
      source={require('../../assets/imegs/flag.jpg')}
    >
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'white',
            top: 147,
            alignItems: 'center',
            height: '80%',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          }}
        >
          <Text style={styles.text}>{user.name}</Text>
          <Pressable
            onPress={() => {
              dispatch(logOut());
            }}
            style={{ marginTop: 22, left: '42%' }}
          >
            <AntDesign name="logout" size={24} style={{ opacity: 0.3 }} />
          </Pressable>
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
                    // onPress={() => {
                    //   navigation.navigate('Comments', {
                    //     photo: item.photo,
                    //     postId: item.id,
                    //   });
                    // }}
                    style={{ flexDirection: 'row' }}
                  >
                    <EvilIcons name="comment" size={25} color="#BDBDBD" />
                    {/* <Text style={{ left: 9 }}>0</Text> */}
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: -10,
    flex: 1,
  },
  containerSoce: {
    top: 18,
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  text: { top: 50, fontSize: 20 },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});
export default PofileScreen;
