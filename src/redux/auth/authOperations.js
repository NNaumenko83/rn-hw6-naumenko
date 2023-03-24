import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import db from "../../../firebase/config";

import { updateUserProfile } from "./authReducer";

const auth = getAuth();

// Вхід
export const authSignInUser =
  ({ login, email, password }) =>
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
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user:", user);

      console.log("updateUserProfile:", updateUserProfile);
      dispatch(updateUserProfile(user.uid));
    } catch (error) {
      console.log("error", error.message);
    }
  };
// Вихід
export const authSignOutUser = () => async (dispatch, getState) => {};
