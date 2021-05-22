import React, { useCallback, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";

const FavoriteItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.course}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={() => {}} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://internships-hse.herokuapp.com/internships/${props.id}/image`,
                }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <View style={styles.rowDetails}>
                <View style={styles.descriptionContainer}>
                  <Ionicons name="ios-star" color="#777777" size={20} />
                  {props.rating && (
                    <Text style={styles.rating}>{props.rating.toFixed(2)}</Text>
                  )}
                </View>
                <View style={styles.descriptionContainer}>
                  <Ionicons name="ios-location" color="#777777" size={20} />
                  <Text style={styles.rating}>{props.country}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Ionicons name="ios-pricetag" color="#777777" size={20} />
                  <Text style={styles.rating}>{props.price}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Ionicons name="ios-language" color="#777777" size={20} />
                  <Text style={styles.rating}>{props.language}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.accent}
                title={"Подробнее"}
                onPress={props.onViewDetail}
              />
              <Button
                color={Colors.accent}
                title={"Удалить"}
                onPress={props.onDeleteFavorite}
              />
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.accent}
                title={"Добавить дедлайн"}
                onPress={props.onAddDeadline}
              />
              <Button
                color={Colors.accent}
                title={"Оставить отзыв"}
                onPress={props.onAddReview}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 460,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "12%",
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
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
});

export default FavoriteItem;
