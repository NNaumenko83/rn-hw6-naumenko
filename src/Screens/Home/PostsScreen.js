import { React } from "react";
import { moduleName } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

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
            <MaterialIcons name="logout" size={24} color="black" />
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

// import {
//   View,
//   StyleSheet,
//   Text,
//   FlatList,
//   Image,
//   TouchableWithoutFeedback,
//   Platform,
//   KeyboardAvoidingView,
//   ImageBackground,
//   Keyboard,
// } from "react-native";

// import { useState, useEffect } from "react";

// // Icons
// import { FontAwesome5 } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";

// export default PostsScreen = ({ route, navigation }) => {
//   const [posts, setPosts] = useState([]);

//   console.log(route.params);

//   useEffect(() => {
//     if (route.params) {
//       setPosts((prevState) => [...prevState, route.params]);
//     }
//   }, [route.params]);

//   return (
//     <View style={styles.mainContainer}>
//       {posts.length > 0 && (
//         <View
//           style={{
//             marginHorizontal: 16,
//             marginTop: 32,
//             flexDirection: "row",
//             marginBottom: 32,
//           }}
//         >
//           <View
//             style={{
//               width: 60,
//               height: 60,
//               backgroundColor: "#E8E8E8",
//               borderRadius: 16,
//             }}
//           ></View>
//           <View style={{ marginLeft: 8, justifyContent: "center" }}>
//             <Text
//               style={{
//                 fontSize: 13,
//                 lineHeight: 15,
//                 fontWeight: 700,
//                 color: "#212121",
//               }}
//             >
//               User Name
//             </Text>

//             <Text
//               style={{
//                 fontSize: 11,
//                 lineHeight: 13,
//                 fontWeight: 400,
//                 color: "rgba(33, 33, 33, 0.8)",
//               }}
//             >
//               email@example.com
//             </Text>
//           </View>
//         </View>
//       )}

//       <FlatList
//         data={posts}
//         renderItem={({ item }) => (
//           <View>
//             <Image
//               source={{ uri: item.photo }}
//               style={{ marginHorizontal: 16, height: 200, borderRadius: 8 }}
//             />
//             <Text
//               style={{
//                 marginHorizontal: 16,
//                 marginTop: 8,
//                 fontSize: 16,
//                 lineHeight: 19,
//                 color: "#212121",
//                 fontWeight: 500,
//               }}
//             >
//               {item.photoName}
//             </Text>
//             <View
//               style={{
//                 marginTop: 11,
//                 marginHorizontal: 16,
//                 height: 20,
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <FontAwesome5 name="comment" size={18} color="#BDBDBD" />
//                 <Text
//                   style={{
//                     marginLeft: 9,
//                     fontSize: 16,
//                     lineHeight: 19,
//                     color: "#BDBDBD",
//                   }}
//                 >
//                   0
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "row", alignItems: "center" }}>
//                 <SimpleLineIcons
//                   name="location-pin"
//                   size={18}
//                   color="#BDBDBD"
//                 />
//                 <Text
//                   onPress={navigation.navigate("Posts")}
//                   style={{
//                     marginLeft: 9,
//                     fontSize: 16,
//                     lineHeight: 19,
//                     color: "#212121",
//                     textDecorationLine: "underline",
//                   }}
//                 >
//                   {item.photoLocationName}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { justifyContent: "flex-end" },
//   mainContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF",
//   },
//   image: {
//     flex: 1,
//     justifyContent: "flex-end",
//     width: "100%",
//   },
// });
