import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";
import * as paramsActions from "../store/actions/params";
import * as profileActions from "../store/actions/profile";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getParams = async () => {
      dispatch(paramsActions.fetchParams());
    };
    getParams();
  }, [dispatch]);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await SecureStore.getItemAsync("userData");

      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, username, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !username) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(username, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
