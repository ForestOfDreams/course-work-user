import React, { useCallback, useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import * as profileActions from "../../store/actions/profile";
import Colors from "../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";

const ReviewItem = (props) => {
  const user = useSelector((state) => state.profile.user.username);
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
                <Text>Оценка: </Text>
                <Text style={styles.rating}>{props.score}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Комментарий: </Text>
                <Text style={styles.rating}>{props.textcomment}</Text>
              </View>
            </View>
            {props.author === user && (
              <View style={styles.actions}>
                <View style={styles.actions}>
                  <Button
                    color={Colors.accent}
                    title={"Удалить"}
                    onPress={props.onDeleteReview}
                  />
                  <Button
                    color={Colors.accent}
                    title={"Изменить"}
                    onPress={props.onEdit}
                  />
                </View>
              </View>
            )}
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

export default ReviewItem;
