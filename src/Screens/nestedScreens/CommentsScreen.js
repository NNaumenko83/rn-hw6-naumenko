import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import { doc, collection, addDoc, getDocs } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { db } from "../../../firebase/config";

export default CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [sendedComment, setSendedComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickName, photo } = useSelector((state) => state.auth);
  const { postId, imageUrl } = route.params;
  const dispatch = useDispatch();

  const handleCommentChange = (text) => {
    setComment(text);
  };

  useEffect(() => {
    getAllPosts();
  }, [sendedComment]);

  const createPost = async () => {
    // const commentsRef = db.collection("posts").document(postId);

    const docRef = await doc(db, `posts/${postId}`);

    const colRef = await collection(docRef, "comments");
    addDoc(colRef, {
      comment,
      nickName,
      userPhoto: photo,
    });
    setSendedComment(comment);
    setComment("");
    Keyboard.dismiss();
  };

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    const allCommentsArray = [];

    querySnapshot.forEach((doc) => {
      allCommentsArray.push({ ...doc.data(), id: doc.id });
    });
    setAllComments(allCommentsArray);

    console.log("allCommentsArray:", allCommentsArray);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>

        <SafeAreaView style={styles.containerListComments}>
          <FlatList
            data={allComments}
            renderItem={({ item }) =>
              nickName === item.nickName ? (
                <View style={styles.containerComment}>
                  <View style={styles.textContainerCommentOwn}>
                    <Text style={styles.textComment}>{item.comment}</Text>
                  </View>

                  <Image
                    source={{ uri: item.userPhoto }}
                    style={styles.imageCommentOwn}
                  />
                </View>
              ) : (
                <View style={styles.containerComment}>
                  <Image
                    source={{ uri: item.userPhoto }}
                    style={styles.imageCommentOther}
                  />
                  <View style={styles.textContainerCommentOther}>
                    <Text style={styles.textComment}>{item.comment}</Text>
                  </View>
                </View>
              )
            }
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
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

  containerComment: {
    borderRadius: 5,
    flexDirection: "row",

    marginHorizontal: 16,
    marginBottom: 24,
  },
  textContainerCommentOwn: {
    flex: 1,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  textContainerCommentOther: {
    flex: 1,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  imageCommentOwn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 16,
  },
  imageCommentOther: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
  },
  textComment: {
    fontSize: 13,
    lineHeight: 18,
  },
  containerListComments: {
    marginTop: 34,
    flex: 1,
  },
});
