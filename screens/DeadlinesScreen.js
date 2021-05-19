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

import DeadlineItem from "../components/course/DeadlineItem";
import * as deadlinesActions from "../store/actions/deadlines";

import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import deadlines from "../store/reducers/deadlines";

const DeadlineScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  // Извлекаем курсы из state. state передается в функцию автоматически.
  const deadlines = useSelector((state) => state.deadlines.deadlines);
  const dispatch = useDispatch();

  const loadDeadlines = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(deadlinesActions.fetchMyDeadlines());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscibe = props.navigation.addListener("focus", loadDeadlines);
    return () => {
      unsubscibe();
    };
  }, [loadDeadlines]);

  useEffect(
    () => {
      setIsLoading(true);
      loadDeadlines().then(() => {
        setIsLoading(false);
      });
    },
    [dispatch],
    loadDeadlines
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
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadDeadlines}
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

  if (!isLoading && deadlines.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Дедлайнов пока нет, добавьте в разделе избранного</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadDeadlines}
      refreshing={isRefreshing}
      data={deadlines}
      keyExtractor={(item) => item.deadline_id.toString()}
      renderItem={(itemData) => {
        return (
          <DeadlineItem
            description={itemData.item.description}
            completed={itemData.item.completed}
            internship={itemData.item.internship}
            start={itemData.item.start}
            finish={itemData.item.finish}
            onDelete={() => {
              dispatch(
                deadlinesActions.deleteDeadline(itemData.item.deadline_id)
              );
            }}
          />
        );
      }}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Дедлайны",
  };
};

const styles = StyleSheet.create({});

export default DeadlineScreen;
