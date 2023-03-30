import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard,
  Image,
  Button,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { StatusBar } from "expo-status-bar";

import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { authSignUpUser } from "../../../redux/auth/authOperations";

const storage = getStorage();

const initialState = {
  login: "",
  email: "",
  password: "",
  photo: "",
};

const btnImgAdd = require("../../../../assets/images/add.png");
const btnImgDelete = require("../../../../assets/images/delete.png");

const backgroundImage = require("../../../../assets/images/bg_new.png");

export default RegistrationScreen = ({ navigation }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [state, setState] = useState(initialState);
  const [isSequre, setIsSequre] = useState(true);
  const [image, setImage] = useState(null);

  const [loginInputIsFocused, setLoginInputIsFocused] = useState(false);
  const [emailInputIsFocused, setEmailInputIsFocused] = useState(false);
  const [passwordInputIsFocused, setPasswordInputIsFocused] = useState(false);

  const dispatch = useDispatch();

  const setShowKeyboard = () => {
    setKeyboardStatus(true);
  };

  // Завантаження фото з бібліотеки
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log("result:", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  });

  const uploadUserPhotoToServer = async () => {
    try {
      const response = await fetch(image);

      const file = await response.blob();

      const metadata = {
        contentType: "image/jpeg",
      };

      const uniquePostId = Date.now().toString();

      const storageRef = ref(storage);

      const imagesRef = ref(storage, "usersPhoto");

      const imageRef = ref(storage, `usersPhoto/${uniquePostId}`);

      const result = await uploadBytes(imageRef, file, metadata);

      const processedPhoto = await getDownloadURL(
        ref(storage, `usersPhoto/${uniquePostId}`)
      );
      console.log("processedPhoto:", processedPhoto);
      setState((state) => ({ ...state, photo: processedPhoto }));

      return processedPhoto;
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const handleSubmit = async () => {
    const photo = await uploadUserPhotoToServer();
    console.log("photo:", photo);

    console.log("state:", state);

    // =================
    dispatch(authSignUpUser({ ...state, photo }));
    setState(initialState);
  };

  const toggleSequrePassword = () => {
    setIsSequre(!isSequre);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.mainContainer}>
        <ImageBackground source={backgroundImage} style={styles.image}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.form}>
              <View
                style={[
                  styles.photoConteiner,
                  {
                    transform: [{ translateX: -60 }],
                  },
                ]}
              >
                {!image ? (
                  <>
                    <Image
                      source={{ uri: image }}
                      style={{
                        borderRadius: 15,
                        width: "100%",
                        height: "100%",
                      }}
                    />

                    <TouchableOpacity
                      style={styles.addbutton}
                      activeOpacity={0.5}
                      onPress={pickImage}
                    >
                      <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Image
                      source={{ uri: image }}
                      style={{
                        borderRadius: 15,
                        width: "100%",
                        height: "100%",
                      }}
                    />

                    <TouchableOpacity
                      style={styles.addbutton}
                      activeOpacity={0.5}
                      onPress={deleteImage}
                    >
                      <AntDesign
                        name="closecircleo"
                        size={24}
                        color="#E8E8E8"
                        style={{ backgroundColor: "white", borderRadius: 12 }}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Регистрация</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: loginInputIsFocused
                      ? "#FF6C00"
                      : "transparent",
                  },
                  {
                    backgroundColor: loginInputIsFocused
                      ? "transparent"
                      : "#F6F6F6",
                  },
                ]}
                inputMode="text"
                placeholder={"Логин"}
                placeholderTextColor={"#BDBDBD"}
                value={state.login}
                onFocus={() => {
                  setShowKeyboard();
                  setLoginInputIsFocused(true);
                }}
                onBlur={() => {
                  setLoginInputIsFocused(false);
                }}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, login: value }));
                }}
              />
              <TextInput
                style={[
                  styles.input,
                  { marginTop: 16 },
                  {
                    borderColor: emailInputIsFocused
                      ? "#FF6C00"
                      : "transparent",
                  },
                  {
                    backgroundColor: emailInputIsFocused
                      ? "transparent"
                      : "#F6F6F6",
                  },
                ]}
                inputMode="email"
                placeholder={"Адрес электронной почты"}
                placeholderTextColor={"#BDBDBD"}
                value={state.email}
                onFocus={() => {
                  setShowKeyboard();
                  setEmailInputIsFocused(true);
                }}
                onBlur={() => {
                  setEmailInputIsFocused(false);
                }}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, email: value }));
                }}
              />
              <View
                style={{
                  marginTop: 16,
                  height: 50,
                  marginBottom: keyboardStatus ? 32 : 0,
                }}
              >
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: passwordInputIsFocused
                        ? "#FF6C00"
                        : "transparent",
                    },
                    {
                      backgroundColor: passwordInputIsFocused
                        ? "transparent"
                        : "#F6F6F6",
                    },
                  ]}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  value={state.password}
                  secureTextEntry={isSequre}
                  onFocus={() => {
                    setShowKeyboard();
                    setPasswordInputIsFocused(true);
                  }}
                  onBlur={() => {
                    setPasswordInputIsFocused(false);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                />
                <TouchableOpacity
                  style={styles.showPass}
                  onPress={toggleSequrePassword}
                >
                  <Text style={[styles.showPass]}>Показать</Text>
                </TouchableOpacity>
              </View>

              {!keyboardStatus && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={{
                      marginBottom: 78,
                      alignItems: "center",

                      marginHorizontal: 95,
                    }}
                  >
                    <Text style={styles.toggleButton}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  addbutton: {
    position: "absolute",
    top: 70,
    left: "90%",

    height: 25,
    width: 25,
    pointerEvents: "auto",
  },
  photoConteiner: {
    marginTop: -60,
    left: "50%",

    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  container: { justifyContent: "flex-end" },
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },

  input: {
    // justifyContent: "center",
    marginHorizontal: 16,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 6,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  form: {
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#FFFFFF",
  },
  title: {
    marginHorizontal: 40,
    color: "#212121",
    marginBottom: 33,
    marginTop: 32,
    fontFamily: "Roboto",
    fontSize: 30,
    // fontWeight: 500,
    justifyContent: "center",
  },
  button: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 20,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  showPass: {
    fontFamily: "Roboto",
    fontSize: 16,
    top: 8,
    right: 20,
    position: "absolute",
  },
  btnTitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#FFFFFF",
  },
  toggleButton: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#1B4371",
  },
});

// import * as firebase from 'firebase';

// const firebaseConfig = {
//   // конфигурация Firebase
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default function RegistrationScreen() {
//   const [imageUri, setImageUri] = useState(null);
//   const [login, setLogin] = useState('');
//   const [password, setPassword] = useState('');

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//

//   const register = async () => {
//     try {
//       const response = await fetch(imageUri);
//       const blob = await response.blob();
//       const storageRef = firebase.storage().ref().child(`userPhoto/${login}.jpg`);
//       await storageRef.put(blob);
//       const downloadUrl = await storageRef.getDownloadURL();
//       await firebase.auth().createUserWithEmailAndPassword(login, password);
//       await firebase.firestore().collection('users').doc(login).set({
//         photoUrl: downloadUrl,
//       });
//       Alert.alert('Success', 'User registered successfully!');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image" onPress={pickImage} />
//       {imageUri && (
//         <Image
//           source={{ uri: imageUri }}
//           style={{ width: 200, height: 200, marginVertical: 20 }}
//         />
//       )}
//       <TextInput
//         style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
//         onChangeText={text => setLogin(text)}
//         value={login}
//         placeholder="Enter login"
//       />
//       <TextInput
//         style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
//         onChangeText={text => setPassword(text)}
//         value={password}
//         placeholder="Enter password"
//         secureTextEntry={true}
//       />
//       <Button title="Register" onPress={register} />
//     </View>
//   );
// }
