import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from "react-native";

import { useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { db } from "../../../firebase/config";

export default CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { nickName } = useSelector((state) => state.auth);
  const { postId } = route.params;
  console.log("postId:", postId);
  const handleCommentChange = (text) => {
    setComment(text);
  };

  const createPost = async () => {
    const commentsRef = doc(db, "posts", postId, "comments");
    await setDoc(commentsRef, { comment, nickName }, { merge: true });
    setComment("");
  };

  const handleCommentSubmit = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.image}
          />
        </View>
        <View style={styles.commentContainer}>
          {comments.map((c, index) => (
            <View key={index} style={styles.comment}>
              <Text>{c}</Text>
            </View>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Комментировать..."
            placeholderTextColor="#BDBDBD"
            onChangeText={handleCommentChange}
            value={comment}
          />
          <TouchableOpacity style={styles.button} onPress={createPost}>
            <View>
              <Feather name="arrow-up" style={styles.arrow} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 32,
    alignItems: "center",
    height: 240,
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  commentContainer: {
    flex: 2,
    padding: 10,
  },
  comment: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderColor: "#E8E8E8",
    borderRadius: 25,
    marginRight: 10,
    paddingLeft: 16,
    paddingRight: 50,
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    width: 34,
    height: 34,
    right: 30,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
  },
  arrow: {
    color: "white",
    fontSize: 30,
  },
});
