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
  FlatList,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { StatusBar } from "expo-status-bar";

import { db } from "../../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";

const backgroundImage = require("../../../assets/images/bg_new.png");

export default ProfileScreen = ({ navigation }) => {
  const { userId, photo: image, nickName } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const getUserPosts = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      console.log("Current posts: ", posts);
      setPosts(posts);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={backgroundImage} style={styles.image}>
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
                  onPress={null}
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
                  onPress={null}
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
          <MaterialIcons
            name="logout"
            size={24}
            color="#BDBDBD"
            style={{ position: "absolute", top: 24, right: 16 }}
            onPress={() => dispatch(authSignOutUser())}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{nickName}</Text>
          </View>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: item.photo }}
                  style={{ marginHorizontal: 16, height: 200, borderRadius: 8 }}
                />
                <Text
                  style={{
                    marginHorizontal: 16,
                    marginTop: 8,
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#212121",
                    fontWeight: 500,
                  }}
                >
                  {item.photoName}
                </Text>
                <View
                  style={{
                    marginTop: 11,
                    marginHorizontal: 16,
                    marginBottom: 34,
                    height: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome5
                      name="comment"
                      size={18}
                      color="#BDBDBD"
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          postId: item.id,
                        });
                      }}
                    />
                    {/* <Text
                      style={{
                        marginLeft: 9,
                        fontSize: 16,
                        lineHeight: 19,
                        color: "#BDBDBD",
                      }}
                    >
                      0
                    </Text> */}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <SimpleLineIcons
                      name="location-pin"
                      size={18}
                      color="#BDBDBD"
                    />
                    <Text
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          location: item.location,
                        });
                      }}
                      style={{
                        marginLeft: 9,
                        fontSize: 16,
                        lineHeight: 19,
                        color: "#212121",
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.photoLocationName}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
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
    height: 650,
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
