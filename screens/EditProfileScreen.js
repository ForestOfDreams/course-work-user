import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import * as profileActions from "../store/actions/profile";
import Input from "../components/UI/Input";
import Colors from "../constants/Colors";

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

const EditProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.profile.user);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      email: user.email,
      phone: user.phone,
      dayOfBirth: user.dayOfBirth,
    },
    inputValidities: {
      name: true,
      surname: true,
      patronymic: true,
      email: true,
      phone: true,
      dayOfBirth: true,
    },
    formIsValid: true,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Возникла ошибка!", error, [{ text: "Ок" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Ошибка!", "Проверьте введеные значения", [{ text: "Ок" }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        profileActions.updateUser(
          formState.inputValues.name,
          formState.inputValues.surname,
          formState.inputValues.patronymic,
          formState.inputValues.email,
          formState.inputValues.phone,
          formState.inputValues.dayOfBirth
        )
      );
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="name"
            label="Имя"
            keyboardType="default"
            required
            minLength={2}
            autoCapitalize="none"
            errorText="Пожалуйста введите корректное имя."
            onInputChange={inputChangeHandler}
            initialValue={user.name}
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
            initialValue={user.surname}
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
            initialValue={user.patronymic}
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
            initialValue={user.email}
          />
          <Input
            id="phone"
            label="Телефон"
            keyboardType="phone-pad"
            required
            autoCapitalize="none"
            errorText="Пожалуйста введите корректный телефон."
            onInputChange={inputChangeHandler}
            initialValue={user.phone}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Редактирование",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProfileScreen;
