import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import db from "../../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./authReducer";

const auth = getAuth(db);

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user:", user);
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: login,
      });

      const { uid, displayName } = userCredential.user;
      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch) => {
  await signOut(auth);
  console.log("authSignOutUser:", auth);

  dispatch(authSignOut());
};

export const onAuthStateChangedUser = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
    console.log("user:", user);
    console.log("auth:", auth);
    if (user) {
      console.log("user:", user);
      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } else {
      console.log("user: not found");
    }
  });
};
