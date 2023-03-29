import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "../../router";
import { onAuthStateChangedUser } from "../../src/redux/auth/authOperations";

import db from "../../firebase/config";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  console.log("stateChange:", stateChange);

  const reduxState = useSelector((state) => state);
  console.log("reduxState:", reduxState);

  const routing = useRoute(stateChange);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
    dispatch(onAuthStateChangedUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
