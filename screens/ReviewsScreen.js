import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import ReviewItem from "../components/course/ReviewItem";
import * as reviewsActions from "../store/actions/reviews";

import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";

const ReviewsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  // Извлекаем курсы из state. state передается в функцию автоматически.

  const reviews = useSelector((state) => state.reviews.reviews);

  const dispatch = useDispatch();

  const loadReviews = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(reviewsActions.fetchMyReviews());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscibe = props.navigation.addListener("focus", loadReviews);
    return () => {
      unsubscibe();
    };
  }, [loadReviews]);

  useEffect(
    () => {
      setIsLoading(true);
      loadReviews().then(() => {
        setIsLoading(false);
      });
    },
    [dispatch],
    loadReviews
  );

  // const selectItemHandler = (id, title) => {
  //   props.navigation.navigate("CourseDetail", {
  //     courseId: id,
  //     courseTitle: title,
  //   });
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>При загрузке возникла ошибка!</Text>
        <Button
          title="Try again"
          onPress={loadReviews}
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

  if (!isLoading && reviews.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Отзывов пока нет!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadReviews}
      refreshing={isRefreshing}
      data={reviews}
      keyExtractor={(item) => item.review_id.toString()}
      renderItem={(itemData) => {
        return (
          <ReviewItem
            author={itemData.item.author.username}
            score={itemData.item.score}
            textcomment={itemData.item.textcomment}
            onViewDetail={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
            onDeleteFavorite={() => {
              dispatch(reviewsActions.removeFromFavorite(itemData.item.name));
            }}
          />
        );
      }}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Мои отзывы",
  };
};

const styles = StyleSheet.create({});

export default ReviewsScreen;
