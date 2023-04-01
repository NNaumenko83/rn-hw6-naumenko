import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// icons import
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import LoginScreen from "./src/Screens/auth/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/Screens/auth/RegistrationScreen/RegistrationScreen";

import PostsScreen from "./src/Screens/Home/PostsScreen";
import ProfileScreen from "./src/Screens/Home/ProfileScreen";
import CreatePostsScreen from "./src/Screens/Home/CreatePostsScreen";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth)
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
          headerShown: false,
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.addButton}>
              <Fontisto name="plus-a" size={13} color={"#FFFFFF"} />
            </View>

            // </TouchableOpacity>
          ),
          title: "Создать публикацию",
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="md-person-outline" size={24} color={color} />
          ),
          headerShown: false,
        }}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
