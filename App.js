import React from "react";
import { LogBox, StyleSheet } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import favoriteReducer from "./store/reducers/favorite";
import coursesReducer from "./store/reducers/courses";
import authReducer from "./store/reducers/auth";
import filtersReducer from "./store/reducers/filters";
import paramsReducer from "./store/reducers/params";
import profileReducer from "./store/reducers/profile";
import reviewsReducer from "./store/reducers/reviews";
import deadlinesReducer from "./store/reducers/deadlines";
import AppNavigator from "./navigation/AppNavigator";

const rootReducer = combineReducers({
  courses: coursesReducer,
  favorite: favoriteReducer,
  auth: authReducer,
  filters: filtersReducer,
  params: paramsReducer,
  profile: profileReducer,
  reviews: reviewsReducer,
  deadlines: deadlinesReducer,
});

const store = createStore(
  rootReducer,
  // composeWithDevTools(),
  applyMiddleware(ReduxThunk)
);

export default function App() {
  LogBox.ignoreAllLogs(true);
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
