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
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../../redux/auth/authOperations";

import { StatusBar } from "expo-status-bar";

import { useState, useEffect } from "react";

const initialState = {
  email: "",
  password: "",
};

const backgroundImage = require("../../../../assets/images/bg_new.png");

export default LoginScreen = ({ navigation }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [state, setState] = useState(initialState);
  const [isSequre, setIsSequre] = useState(true);
  const [emailInputIsFocused, setEmailInputIsFocused] = useState(false);
  const [passwordInputIsFocused, setPasswordInputIsFocused] = useState(false);

  const setShowKeyboard = () => {
    setKeyboardStatus(true);
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

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(authSignInUser(state));
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
              <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>Войти</Text>
              </View>

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
                    <Text style={styles.btnTitle}>Войти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={{
                      marginBottom: 78,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.toggleButton}>
                      Нет аккаунта? Зарегистрироваться
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
    marginTop: "65%",
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
