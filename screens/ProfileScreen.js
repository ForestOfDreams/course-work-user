import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import * as profileActions from "../store/actions/profile";
import * as authActions from "../store/actions/auth";
import Card from "../components/UI/Card";

const ProfileScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.profile.user);

  const dispatch = useDispatch();

  const loadUser = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(profileActions.fetchUser());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscibe = props.navigation.addListener("focus", loadUser);
    return () => {
      unsubscibe();
    };
  }, [loadUser]);

  useEffect(
    () => {
      setIsLoading(true);
      loadUser().then(() => {
        setIsLoading(false);
      });
    },
    [dispatch],
    loadUser
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadUser} />
        }
      >
        <Card style={styles.user}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Image
                source={{
                  uri: "https://cdn5.vectorstock.com/i/1000x1000/38/44/student-graduate-avatar-icon-vector-11983844.jpg",
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text
                  style={[
                    styles.title,
                    {
                      marginTop: 5,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {user.surname} {user.name}
                </Text>
                <Text
                  style={[
                    styles.title,
                    {
                      marginBottom: 5,
                    },
                  ]}
                >
                  {user.patronymic}
                </Text>
                <Text style={styles.caption}>{user.dayOfBirth}</Text>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Ionicons name="ios-location" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                Moscow, Russia
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons
                name="ios-phone-portrait-outline"
                color="#777777"
                size={20}
              />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {user.phone}
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="ios-mail" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {user.email}
              </Text>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Favorites");
              }}
            >
              <View style={styles.menuItem}>
                <Ionicons name="heart-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Избранные</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("editProfile");
              }}
            >
              <View style={styles.menuItem}>
                <Ionicons
                  name={
                    Platform.OS === "android"
                      ? "md-create-outline"
                      : "ios-create-outline"
                  }
                  color="#FF6347"
                  size={25}
                />
                <Text style={styles.menuItemText}>Изменить информацию</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("reviews");
              }}
            >
              <View style={styles.menuItem}>
                <Ionicons
                  name={
                    Platform.OS === "android"
                      ? "md-reader-outline"
                      : "ios-reader-outline"
                  }
                  color="#FF6347"
                  size={25}
                />
                <Text style={styles.menuItemText}>Мои отзывы</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("deadlines");
              }}
            >
              <View style={styles.menuItem}>
                <Ionicons
                  name={
                    Platform.OS === "android"
                      ? "md-timer-outline"
                      : "ios-timer-outline"
                  }
                  color="#FF6347"
                  size={25}
                />
                <Text style={styles.menuItemText}>Мои дедлайны</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(authActions.logout());
              }}
            >
              <View style={styles.menuItem}>
                <Ionicons
                  name="ios-log-out-outline"
                  color="#FF6347"
                  size={25}
                />
                <Text style={styles.menuItemText}>Завершить сессию</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
                <Ionicons name="settings-outline" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Настройки</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Профиль",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("editProfile");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  user: {
    margin: 20,
  },
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 5,
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

export default ProfileScreen;
