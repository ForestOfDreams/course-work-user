import React, { useState } from "react";
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
      })
    );
    props.navigation.goBack();
  };

  const clearHandler = () => {
    dispatch(FiltersActions.clearFilters());
    props.navigation.goBack();
  };

  const onChange = (min, max) => {
    console.log("Max: ", max);
    console.log("Min: ", min);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card style={styles.pickers}>
        <ScrollView>
          <FilterItem
            label={"Выберите направление"}
            data={params.subjects}
            value={selectedSubject}
            setValue={setSelectedSubject}
          />
          <FilterItem
            label={"Выберите язык обученияяя"}
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
          <FilterItem
            label={"Выберите стоимость"}
            data={params.prices}
            value={selectedPrice}
            setValue={setSelectedPrice}
          />
          <TextInput {...props} style={styles.input} />

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
