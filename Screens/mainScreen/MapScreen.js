import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { coords } = route.params.location;
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        // style={styles.mapStyle}
        region={{
          longitude: coords.longitude,
          latitude: coords.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {route.params && (
          <Marker
            title="I am here"
            coordinate={{
              longitude: coords.longitude,
              latitude: coords.latitude,
            }}
            description="Hello"
          />
        )}
      </MapView>
    </View>
  );
};
// const styles = StyleSheet.create({
//   mapStyle: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });
export default MapScreen;
