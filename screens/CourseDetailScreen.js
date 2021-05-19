import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ViewMoreText from "react-native-view-more-text";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import * as favoriteActions from "../store/actions/favorite";

const renderViewMore = (onPress) => {
  return (
    <Text
      style={{ color: Colors.accent, ...styles.description }}
      onPress={onPress}
    >
      Раскрыть описание
    </Text>
  );
};

const renderViewLess = (onPress) => {
  return (
    <Text
      style={{ color: Colors.accent, ...styles.description }}
      onPress={onPress}
    >
      Скрыть описание
    </Text>
  );
};

const CourseDetailScreen = (props) => {
  const courseId = props.route.params.courseId;
  const selectedCourse = useSelector((state) =>
    state.courses.availableCourses.find((course) => course.id === courseId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: `https://internships-hse.herokuapp.com/internships/${courseId}/image`,
        }}
      />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Сохранить в избранное"
          onPress={() => {
            dispatch(favoriteActions.addToFavorite(selectedCourse));
          }}
        />
        <Button
          color={Colors.primary}
          title="Просмотреть отзывы"
          onPress={() => {
            props.navigation.navigate("CoursesReviews", {
              reviews: selectedCourse.reviews,
            });
          }}
        />
      </View>
      <View style={styles.rowDetails}>
        <View style={styles.descriptionContainer}>
          <Ionicons name="ios-star" color="#777777" size={20} />
          <Text style={styles.rating}>{selectedCourse.rating}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Ionicons name="ios-location" color="#777777" size={20} />
          <Text style={styles.rating}>{selectedCourse.country}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Ionicons name="ios-pricetag" color="#777777" size={20} />
          <Text style={styles.rating}>{selectedCourse.price}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Ionicons name="ios-language" color="#777777" size={20} />
          <Text style={styles.rating}>{selectedCourse.language}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 15, ...styles.rowDetails }}>
        <View style={styles.descriptionContainer}>
          <Ionicons name="ios-calendar" color="#777777" size={20} />
          <Text style={styles.rating}>{selectedCourse.startDate}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Ionicons name="ios-calendar" color="#777777" size={20} />
          <Text style={styles.rating}>{selectedCourse.finishDate}</Text>
        </View>
      </View>
      <ViewMoreText
        style={{ marginTop: 30 }}
        numberOfLines={3}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
        textStyle={styles.description}
      >
        <Text>{selectedCourse.description}</Text>
      </ViewMoreText>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.courseTitle,
  };
};

const styles = StyleSheet.create({
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowDetails: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: 300,
  },
  details: {
    alignItems: "center",
    padding: 10,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  rating: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
  },
});

export default CourseDetailScreen;
