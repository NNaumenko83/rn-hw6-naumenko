import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import db from "../../../firebase/config";

import { updateUserProfile, authStateChange } from "./authReducer";

const auth = getAuth(db);

// Вхід
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user:", user);
    } catch (error) {
      console.log("error", error.message);
    }
  };
// Реєстрація
export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const { uid, displayName } = auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };
// Вихід
export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
};

export const onAuthStateChangedUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user:", user);
      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickName: user.displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
      // setUser(user);
    } else {
      console.log("user: not found");
    }
  });
};
