import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CourseItem from "../components/course/CourseItem";
import * as favoriteActions from "../store/actions/favorite";
import * as coursesActions from "../store/actions/courses";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";

const CoursesOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  // Извлекаем курсы из state. state передается в функцию автоматически.
  const courses = useSelector((state) => state.courses.availableCourses);

  const dispatch = useDispatch();

  const loadCourses = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(coursesActions.fetchCourses());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscibe = props.navigation.addListener("focus", loadCourses);
    return () => {
      unsubscibe();
    };
  }, [loadCourses]);

  useEffect(
    () => {
      setIsLoading(true);
      loadCourses().then(() => {
        setIsLoading(false);
      });
    },
    [dispatch],
    loadCourses
  );

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("CourseDetail", {
      courseId: id,
      courseTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadCourses}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && courses.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Ничего не найдено!</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        onRefresh={loadCourses}
        refreshing={isRefreshing}
        data={courses}
        keyExtractor={(item) => item.name}
        renderItem={(itemData) => {
          return (
            <CourseItem
              image={itemData.item.image}
              title={itemData.item.name}
              rating={itemData.item.rating}
              country={itemData.item.country}
              language={itemData.item.language}
              price={itemData.item.price}
              id={itemData.item.id}
              onViewDetail={() =>
                selectItemHandler(itemData.item.id, itemData.item.name)
              }
              onAddToFavorite={() => {
                dispatch(favoriteActions.addToFavorite(itemData.item.name));
              }}
            />
          );
        }}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Все курсы",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-filter" : "ios-filter"}
          onPress={() => {
            navData.navigation.navigate("Filters");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default CoursesOverviewScreen;
