import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";

const DeadlineItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.course}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={() => {}} useForeground>
          <View>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={styles.title}>{props.author}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Описание: </Text>
                <Text style={styles.rating}>{props.description}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Начало: </Text>
                <Text style={styles.rating}>{props.start}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Окончание: </Text>
                <Text style={styles.rating}>{props.finish}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Выполнен: </Text>
                <Text style={styles.rating}>
                  {props.completed ? "Да" : "Нет"}
                </Text>
              </View>
            </View>
            <View style={styles.actions}>
              <View style={styles.actions}>
                <Button
                  color={Colors.accent}
                  title={"Удалить"}
                  onPress={props.onDelete}
                />
              </View>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 15,
    paddingTop: 15,
  },
  rowDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  course: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  rating: {
    fontSize: 14,
    color: "#888",
  },
  title: {
    fontSize: 20,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

export default DeadlineItem;
