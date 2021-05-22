import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import RangeSlider from "rn-range-slider";

import * as FiltersActions from "../store/actions/filters";
import Colors from "../constants/Colors";
import Card from "../components/UI/Card";
import FilterItem from "../components/course/FilterItem";
import Input from "../components/UI/Input";

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

const FiltersScreen = (props) => {
  const params = useSelector((state) => state.params.params);

  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedCountry, setSelectedCountries] = useState();
  const [selectedPrice, setSelectedPrice] = useState();

  const dispatch = useDispatch();

  const sumbitHandler = () => {
    dispatch(
      FiltersActions.setFilters({
        subject: selectedSubject === "-1" ? undefined : selectedSubject,
        language: selectedLanguage === "-1" ? undefined : selectedLanguage,
        country: selectedCountry === "-1" ? undefined : selectedCountry,
        price: selectedPrice === "-1" ? undefined : selectedPrice,
        minCost:
          formState.inputValues.minCost === ""
            ? undefined
            : formState.inputValues.minCost,
        maxCost:
          formState.inputValues.maxCost === ""
            ? undefined
            : formState.inputValues.maxCost,
      })
    );
    props.navigation.goBack();
  };

  const clearHandler = () => {
    dispatch(FiltersActions.clearFilters());
    props.navigation.goBack();
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      minCost: "",
      maxCost: "",
    },
    inputValidities: {
      description: false,
      isCompleted: false,
    },
    formIsValid: false,
  });

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card style={styles.pickers}>
        <ScrollView>
          <View style={styles.form}>
            <Input
              id="minCost"
              label="Минимальная стоимость($)"
              placeholder="Укажите минимальное значение"
              errorText="Проверьте комментарий!"
              keyboardType="number-pad"
              onInputChange={inputChangeHandler}
              initialValue={""}
              initiallyValid={false}
              styles={{ marginBottom: 15 }}
            />
          </View>
          <View style={styles.form}>
            <Input
              id="maxCost"
              label="Максимальная стоимость($)"
              placeholder="Укажите максимальное значения"
              errorText="Проверьте значение!"
              keyboardType="number-pad"
              onInputChange={inputChangeHandler}
              initialValue={""}
              initiallyValid={false}
              styles={{ marginBottom: 15, marginTop: -30 }}
            />
          </View>
          <FilterItem
            label={"Выберите направление"}
            data={params.subjects}
            value={selectedSubject}
            setValue={setSelectedSubject}
          />
          <FilterItem
            label={"Выберите язык обучения"}
            data={params.languages}
            value={selectedLanguage}
            setValue={setSelectedLanguage}
          />
          <FilterItem
            label={"Выберите страну обучения"}
            data={params.countries}
            value={selectedCountry}
            setValue={setSelectedCountries}
          />

          <View style={styles.buttonContainer}>
            <View style={{ width: "80%", paddingBottom: 15 }}>
              <Button
                title={"Применить фильтрацию"}
                color={Colors.accent}
                onPress={sumbitHandler}
              />
            </View>
            <View style={{ width: "80%" }}>
              <Button
                width="80%"
                title={"Сбросить параметры"}
                color={Colors.primary}
                onPress={clearHandler}
              />
            </View>
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    marginVertical: 10,
  },
  pickers: {
    width: 330,
    height: 600,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  pickerItems: {
    height: 120,
    color: Colors.accent,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Фильтрация",
  };
};

export default FiltersScreen;
