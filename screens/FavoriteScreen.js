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

import FavoriteItem from "../components/course/FavoriteItem";
import * as favoriteActions from "../store/actions/favorite";

import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";

const FavoriteScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  // Извлекаем курсы из state. state передается в функцию автоматически.
  const favorites = useSelector((state) => state.favorite.favoriteCourses);
  const dispatch = useDispatch();

  const loadFavorites = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(favoriteActions.fetchFavorites());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscibe = props.navigation.addListener("focus", loadFavorites);
    return () => {
      unsubscibe();
    };
  }, [loadFavorites]);

  useEffect(
    () => {
      setIsLoading(true);
      loadFavorites().then(() => {
        setIsLoading(false);
      });
    },
    [dispatch],
    loadFavorites
  );

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("CourseDetail", {
      courseId: id,
      courseTitle: title,
    });
  };

  const addReviewHandler = (id) => {
    props.navigation.navigate("AddReview", {
      internship_id: id,
    });
  };

  const addDeadlineHandler = (id) => {
    props.navigation.navigate("AddDeadline", {
      internship_id: id,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadFavorites}
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

  if (!isLoading && favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Здесь пока ничего нет. Добавьте сюда курсы!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadFavorites}
      refreshing={isRefreshing}
      keyExtractor={(item) => item.name}
      data={favorites}
      renderItem={(itemData) => {
        return (
          <FavoriteItem
            image={itemData.item.imageUrl}
            title={itemData.item.name}
            rating={itemData.item.rating}
            country={itemData.item.country}
            price={itemData.item.price}
            language={itemData.item.language}
            id={itemData.item.internship_id}
            onViewDetail={() =>
              selectItemHandler(
                itemData.item.internship_id,
                itemData.item.title
              )
            }
            onDeleteFavorite={() => {
              dispatch(favoriteActions.removeFromFavorite(itemData.item.name));
            }}
            onAddReview={() => {
              addReviewHandler(itemData.item.internship_id);
            }}
            onAddDeadline={() => {
              addDeadlineHandler(itemData.item.internship_id);
            }}
          />
        );
      }}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Избранные курсы",
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoriteScreen;
