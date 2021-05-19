import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/AuthScreen";
import CoursesOverviewScreen, {
  screenOptions as CoursesOverviewScreenOptions,
} from "../screens/CoursesOverviewScreen";
import CourseDetailScreen, {
  screenOptions as CourseDetailScreenOptions,
} from "../screens/CourseDetailScreen";
import FavoriteScreen, {
  screenOptions as FavoriteScreenOptions,
} from "../screens/FavoriteScreen";
import ProfileScreen, {
  screenOptions as ProfileScreenOptions,
} from "../screens/ProfileScreen";
import Colors from "../constants/Colors";
import FiltersScreen, {
  screenOptions as FiltersScreenOptions,
} from "../screens/FiltersScreen";
import EditProfileScreen, {
  screenOptions as EditProfileScreenOptions,
} from "../screens/EditProfileScreen";
import ReviewsScreen, {
  screenOptions as ReviewScreenOptions,
} from "../screens/ReviewsScreen";
import CourseReviewsScreen, {
  screenOptions as CourseReviewsScreenOptions,
} from "../screens/CourseReviewsScreen";
import AddReviewScreen, {
  screenOptions as AddReviewScreenOptions,
} from "../screens/AddReviewScreen";
import DeadlineScreen, {
  screenOptions as DeadlineScreenOptions,
} from "../screens/DeadlinesScreen";
import AddDeadlineScreen, {
  screenOptions as AddDeadlineScreenOptions,
} from "../screens/AddDeadlineScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const CoursesStackNavigator = createStackNavigator();

export const CoursesNavigator = () => {
  return (
    <CoursesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CoursesStackNavigator.Screen
        name="CoursesOverview"
        component={CoursesOverviewScreen}
        options={CoursesOverviewScreenOptions}
      />
      <CoursesStackNavigator.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={CourseDetailScreenOptions}
      />
      <CoursesStackNavigator.Screen
        name="Filters"
        component={FiltersScreen}
        options={FiltersScreenOptions}
      />
      <CoursesStackNavigator.Screen
        name="CoursesReviews"
        component={CourseReviewsScreen}
        options={CourseReviewsScreenOptions}
      />
    </CoursesStackNavigator.Navigator>
  );
};

export const FavoritesStackNavigator = createStackNavigator();

export const FavoritesNavigator = () => {
  return (
    <FavoritesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <FavoritesStackNavigator.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={FavoriteScreenOptions}
      />
      <FavoritesStackNavigator.Screen
        name="AddReview"
        component={AddReviewScreen}
        options={AddReviewScreenOptions}
      />
      <FavoritesStackNavigator.Screen
        name="AddDeadline"
        component={AddDeadlineScreen}
        options={AddDeadlineScreenOptions}
      />
    </FavoritesStackNavigator.Navigator>
  );
};

export const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={ProfileScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name="editProfile"
        component={EditProfileScreen}
        options={EditProfileScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name="reviews"
        component={ReviewsScreen}
        options={ReviewScreenOptions}
      />
      <ProfileStackNavigator.Screen
        name="deadlines"
        component={DeadlineScreen}
        options={DeadlineScreenOptions}
      />
    </ProfileStackNavigator.Navigator>
  );
};

const ScreensBottomNavigator = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <ScreensBottomNavigator.Navigator
      tabBarOptions={{ activeTintColor: Colors.primary }}
      contentOptions={{ activeTintColor: Colors.primary }}
    >
      <ScreensBottomNavigator.Screen
        name="Courses"
        component={CoursesNavigator}
        options={{
          tabBarLabel: "Курсы",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-search" : "ios-search"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <ScreensBottomNavigator.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarLabel: "Избранные",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-star" : "ios-star"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <ScreensBottomNavigator.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-person" : "ios-person"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </ScreensBottomNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
