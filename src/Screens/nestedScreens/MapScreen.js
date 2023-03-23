// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   Platform,
//   KeyboardAvoidingView,
//   ImageBackground,
//   Keyboard,
// } from "react-native";

// import MapView, { Marker } from "react-native-maps";

// export default MapScreen = () => {
//   // return (
//   //   <View style={styles.mainContainer}>
//   //     <Text>Comments</Text>
//   //   </View>
//   // );
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
// initialRegion={{
//   latitude: 50.416642,
//   longitude: 30.6552704,
//   latitudeDelta: 0.001,
//   longitudeDelta: 0.006,
// }}
//       >
// <Marker
//   coordinate={{ latitude: 50.416642, longitude: 30.6552704 }}
//   title="travel photo"
// />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });

import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.416642,
          longitude: 30.6552704,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{ latitude: 50.416642, longitude: 30.6552704 }}
          title="Travel photo"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
