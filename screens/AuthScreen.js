import React, { useReducer, useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
      name: "",
      surname: "",
      patronymic: "",
      email: "",
      phone: "",
      dayOfBirth: "",
    },
    inputValidities: {
      username: false,
      password: false,
      name: isSignUp ? false : true,
      surname: isSignUp ? false : true,
      patronymic: isSignUp ? false : true,
      email: isSignUp ? false : true,
      phone: isSignUp ? false : true,
      dayOfBirth: isSignUp ? false : true,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Возникла ошибка!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    setError(null);
    if (isSignUp) {
      action = authActions.signup(
        formState.inputValues.username,
        formState.inputValues.password,
        formState.inputValues.name,
        formState.inputValues.surname,
        formState.inputValues.patronymic,
        formState.inputValues.email,
        formState.inputValues.phone,
        formState.inputValues.dayOfBirth
      );
    } else {
      action = authActions.login(
        formState.inputValues.username,
        formState.inputValues.password
      );
    }
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "android" ? -200 : 50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ddd6f3", "#faaca8"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            {isSignUp ? (
              <View>
                <Input
                  id="username"
                  label="Логин"
                  keyboardType="default"
                  required
                  minLength={6}
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректный логин."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="password"
                  label="Пароль"
                  keyboardType="default"
                  required
                  minLength={6}
                  secureTextEntry
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректный пароль."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="name"
                  label="Имя"
                  keyboardType="default"
                  required
                  minLength={2}
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректное имя."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="surname"
                  label="Фамилия"
                  keyboardType="default"
                  minLength={2}
                  required
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректную фамилию."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="patronymic"
                  label="Отчество"
                  keyboardType="default"
                  required
                  minLength={2}
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректное отчество."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="email"
                  label="E-Mail"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректную почту."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="phone"
                  label="Телефон"
                  keyboardType="phone-pad"
                  required
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректный телефон."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="dayOfBirth"
                  label="День Рождения"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  errorText="Пожалуйста введите корректную дату."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  date
                />
              </View>
            ) : (
              <View>
                <Input
                  id="username"
                  label="Логин"
                  placeholder="alligator-cat"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  errorText="Проверьте логин"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="password"
                  label="Пароль"
                  keyboardType="default"
                  placeholder="securepassord"
                  secureTextEntry
                  required
                  minLength={3}
                  autoCapitalize="none"
                  errorText="Please enter a valid password."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </View>
            )}
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  <Button
                    disabled={!formState.formIsValid}
                    title={isSignUp ? "Зарегистрироваться" : "Войти"}
                    color={Colors.accent}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Перейти к ${isSignUp ? "логину" : "регистрации"}`}
                  color={Colors.accent}
                  onPress={() => {
                    setIsSignUp((prevState) => !prevState);
                  }}
                />
              </View>
              {!isSignUp && (
                <View style={styles.buttonContainer}>
                  <Button
                    title={"Забыли пароль?"}
                    color={Colors.primary}
                    onPress={() => {
                      setIsSignUp((prevState) => !prevState);
                    }}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: "Авторизация",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 600,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: "90%",
  },
});

export default AuthScreen;
