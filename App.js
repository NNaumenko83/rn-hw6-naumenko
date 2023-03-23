// import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";

import { useRoute } from "./router";

// import MapScreen from "./src/Screens/MapScreen/MapScreen";
// import CommentsScreen from "./src/Screens/CommentsScreen/CommentsScreen";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Inter-VariableFont": require("./assets/fonts/Inter-VariableFont.ttf"),
  });

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

  const routing = useRoute({});

  return <NavigationContainer>{routing}</NavigationContainer>;
}
