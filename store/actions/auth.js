import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (username, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, username: username, token: token });
  };
};

export const signup = (
  username,
  password,
  name,
  surname,
  patronymic,
  email,
  phone,
  dayOfBirth
) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://internships-hse.herokuapp.com/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          name: name,
          surname: surname,
          patronymic: patronymic,
          email: email,
          phone: phone,
          dayOfBirth: dayOfBirth,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }

    dispatch(login(username, password));
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    let response = await fetch("https://internships-hse.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        // returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Во время авторизации произошла ошибка";
      if (errorId === "USER_NOT_FOUND") {
        message = "This user could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    let resData = response.headers;

    var decoded = jwt_decode(resData.map.authorization.replace("Bearer ", ""));

    dispatch(
      authenticate(
        1,
        resData.map.authorization,
        new Date(decoded.exp * 1000).getTime() - new Date().getTime()
      )
    );
    response = await fetch(
      "https://internships-hse.herokuapp.com/api/students",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: resData.map.authorization,
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message =
        "Во время получения информации о пользлвателе произошла ошибка";
      throw new Error(message);
    }

    const resUserData = await response.json();

    saveDataToStorage(
      resData.map.authorization,
      resUserData.username,
      new Date(decoded.exp * 1000)
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, username, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      username: username,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
