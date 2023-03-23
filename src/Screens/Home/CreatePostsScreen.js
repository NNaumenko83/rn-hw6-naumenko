import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard,
  Image,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

import { Camera, CameraType } from "expo-camera";

import * as Location from "expo-location";
import { Permissions } from "expo-permissions";
import { SimpleLineIcons } from "@expo/vector-icons";

export default CreatePostsScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [photoName, setPhotoName] = useState();
  const [photoLocationName, setPhotoLocationName] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultScreenPosts", {
      photo,
      photoName,
      photoLocationName,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={CameraType.back}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Fontisto name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {!photo ? (
        <Text
          style={{
            marginTop: 8,
            marginLeft: 16,
            fontSize: 16,
            lineHeight: 19,
            color: "#BDBDBD",
          }}
        >
          Загрузите фото
        </Text>
      ) : (
        <Text
          style={{
            marginTop: 8,
            marginLeft: 16,
            fontSize: 16,
            lineHeight: 19,
            color: "#BDBDBD",
          }}
        >
          Редактировать фото
        </Text>
      )}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          inputMode="text"
          placeholder={"Название..."}
          placeholderTextColor={"#BDBDBD"}
          value={photoName}
          onChangeText={(value) => setPhotoName(value)}
        />
        <View style={{ marginHorizontal: 16 }}>
          <TextInput
            style={[styles.input, { paddingLeft: 25, marginHorizontal: 0 }]}
            inputMode="text"
            placeholder={"Местность..."}
            placeholderTextColor={"#BDBDBD"}
            value={photoLocationName}
            onChangeText={(value) => setPhotoLocationName(value)}
          />
          <SimpleLineIcons
            name="location-pin"
            size={18}
            color="#BDBDBD"
            style={{ position: "absolute", top: "30%" }}
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.buttonSend}
        onPress={sendPhoto}
      >
        <Text style={styles.btnTitle}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  cameraContainer: {
    borderRadius: 10,
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    overflow: "hidden",
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSend: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 20,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#FFFFFF",
  },

  camera: {
    flex: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    height: 90,
    width: 150,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "pink",
  },

  form: { marginTop: 32 },
  input: {
    // justifyContent: "center",
    marginHorizontal: 16,
    // paddingLeft: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 6,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
