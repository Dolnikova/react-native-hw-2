import { SimpleLineIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed/dist/Button';
import { Image } from '@rneui/themed/dist/Image';
import { Input } from '@rneui/themed/dist/Input';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable } from 'react-native';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/auth/authSelectors';

const CreatePostsScreen = ({ navigation }) => {
  const [cameraPermission, setCameraUsePermission] = useState(null);
  const [cameraLocation, setLoactionPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState({});
  const [locationName, setLocationName] = useState('');

  const user = useSelector(getUser);

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
    } catch (error) {
      console.log(error, 'ERROR <<<<<<<<<<<<<');
    }
  };
  const sendPhoto = async () => {
    await addDoc(collection(db, 'posts'), {
      photo,
      name,
      location,
      locationName,
      userName: user.name,
    });
    navigation.navigate('Posts', {
      screen: 'MainPosts',
    });
  };
  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      let { statusLocation } =
        await Location.requestForegroundPermissionsAsync();

      if (statusLocation !== 'granted') {
        console.log('Permission to access location was denied', statusLocation);
      }

      setCameraUsePermission(status === 'granted');
      setLoactionPermission(statusLocation === 'granted');
      let location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(location);
      let backPerm = await Location.requestBackgroundPermissionsAsync();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        ref={ref => setCamera(ref)}
        style={{
          height: '35%',
          alignItems: 'center',
          marginBottom: 100,
          width: '85%',
          borderRadius: 8,
          top: 32,
          backgroundColor: '#F6F6F6',
        }}
      >
        {photo && (
          <View style={{ position: 'absolute' }}>
            <Image
              source={{ uri: photo }}
              style={{ height: 240, width: 343 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto}>
          <ImageBackground
            style={styles.ellips}
            source={require('../../assets/imegs/ellipsenoactiv.png')}
          >
            <ImageBackground
              style={styles.vector}
              source={require('../../assets/imegs/vector.png')}
            />
          </ImageBackground>
        </TouchableOpacity>
        <Text style={styles.text}>Load photo</Text>
      </Camera>
      <Input
        placeholder="Name..."
        placeholderTextColor="#BDBDBD"
        onChangeText={setName}
      />
      <SimpleLineIcons
        name="location-pin"
        size={16}
        style={{ left: -180, top: 28 }}
        color="#BDBDBD"
      />
      <Input
        placeholder="Location..."
        placeholderTextColor="#BDBDBD"
        onChangeText={setLocationName}
        style={{ left: 20 }}
      />
      <Button
        buttonStyle={{
          backgroundColor: '#F6F6F6',
          borderRadius: 100,
          width: 343,
          height: 51,
          marginTop: 32,
          marginBottom: 111,
        }}
        onPress={sendPhoto}
        title="Publish"
        titleStyle={{ color: '#BDBDBD' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    left: 0,
    top: 32,
    width: 343,
    height: 240,
    flex: 1,
    resizeMode: 'cover',
  },
  vector: {
    left: 20,
    top: 20,
    width: 20,
    height: 18,
    flex: 1,
    resizeMode: 'cover',
  },
  ellips: {
    top: 90,
    width: 60,
    height: 60,
    flex: 1,
    resizeMode: 'cover',
  },
  text: {
    right: 120,
    bottom: -25,
    opacity: 0.2,
    fontSize: 16,
  },
  buttonNoActive: {
    bottom: 120,
    width: 343,
    height: 51,
  },
});
export default CreatePostsScreen;
