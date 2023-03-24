import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "../../router";
import { onAuthStateChangedUser } from "../../src/redux/auth/authOperations";

const auth = getAuth();

export const Main = () => {
  const [user, setUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);
  console.log("stateChange:", stateChange);

  const routing = useRoute(stateChange);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onAuthStateChangedUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
