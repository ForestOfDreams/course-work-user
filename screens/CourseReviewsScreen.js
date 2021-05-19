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

  const reviews = props.route.params.reviews;

  return (
    <FlatList
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
    headerTitle: "Отзывы",
  };
};

const styles = StyleSheet.create({});

export default ReviewsScreen;
