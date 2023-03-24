import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import { store } from "./src/redux/store";
import { useRoute } from "./router";
import db from "./firebase/config";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// import MapScreen from "./src/Screens/MapScreen/MapScreen";
// import CommentsScreen from "./src/Screens/CommentsScreen/CommentsScreen";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Inter-VariableFont": require("./assets/fonts/Inter-VariableFont.ttf"),
  });

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("user:", user);

          setUser(user);
          // ...
        } else {
          console.log("user: not found");
        }
      }),
    []
  );

  // useEffect(
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("auth:", auth);

  //       setUser(user);
  //       return;
  //     }
  //     console.log("userState:", user);
  //   }),
  //   []
  // );

  const routing = useRoute(user);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
