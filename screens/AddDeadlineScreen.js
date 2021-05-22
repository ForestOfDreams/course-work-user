import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  CheckBox,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import * as deadlinesActions from "../store/actions/deadlines";
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

const AddDeadlineScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [error, setError] = useState();

  const internship_id = props.route.params.internship_id;

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      description: "",
      isCompleted: false,
      start: "",
      finish: "",
    },
    inputValidities: {
      description: false,
      isCompleted: true,
      start: false,
      finish: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Возникла ошибка!", error, [{ text: "Ок" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Ошибка!", "Проверьте поля формы.", [{ text: "Ок" }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        deadlinesActions.uploadDeadline(
          formState.inputValues.description,
          formState.inputValues.isCompleted,
          formState.inputValues.start,
          formState.inputValues.finish,
          internship_id
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
            id="description"
            label="Комментарий"
            placeholder="Опишите дедлайн"
            errorText="Описание не может быть пустым!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={false}
            required
          />

          <Input
            id="start"
            label="Начало"
            errorText="Проверьте значение!"
            keyboardType="number-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={false}
            required
            date
          />
          <Input
            id="finish"
            label="Окончание"
            errorText="Проверьте значение!"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={false}
            required
            date
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Добавление дедлайна",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddDeadlineScreen;
