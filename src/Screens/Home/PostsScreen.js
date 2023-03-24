import { React } from "react";
import { moduleName } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createNativeStackNavigator();

export default PostScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color="black"
              onPress={() => signOut(auth)}
            />
          ),
          title: "Публикации",
        }}
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Геолокация",
        }}
      />
    </NestedScreen.Navigator>
  );
};
