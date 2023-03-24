import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import db from "../../../firebase/config";

import { updateUserProfile } from "./authReducer";

const auth = getAuth();

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

      const { uid, displayName } = await auth.currentUser;
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
export const authSignOutUser = () => async (dispatch, getState) => {};

export const onAuthStateChangedUser = (dispatch, getState) => {};
