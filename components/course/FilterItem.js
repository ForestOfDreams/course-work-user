import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";

const FilterItem = (props) => {
  return (
    <View
      style={{
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginHorizontal: 15,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <Picker
        itemStyle={styles.pickerItems}
        selectedValue={props.value}
        onValueChange={props.setValue}
        mode={"dialog"}
        style={{
          height: Platform.OS === "android" ? 50 : 120,
        }}
      >
        <Picker.Item label={"Все значения"} value={"-1"} />
        {props.data !== "" ? (
          props.data.map((subject) => {
            if (typeof subject === "number") {
              return (
                <Picker.Item
                  label={subject.toString(10)}
                  value={subject.toString(10)}
                  key={subject.toString(10)}
                />
              );
            } else {
              return (
                <Picker.Item label={subject} value={subject} key={subject} />
              );
            }
          })
        ) : (
          <Picker.Item label="Загрузка..." value="0" />
        )}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
    marginVertical: 10,
  },
  pickerItems: {
    height: 120,
    color: Colors.accent,
  },
});

export default FilterItem;
