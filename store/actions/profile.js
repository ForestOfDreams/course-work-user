export const FETCH_USER = "FETCH_USER";
export const UPDATE_USER = "UPDATE_USER";

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let response = await fetch(
      "https://internships-hse.herokuapp.com/api/students",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message =
        "Во время получения информации о пользователе произошла ошибка";
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: FETCH_USER, userData: resData });
  };
};

//написать
export const updateUser = (
  name,
  surname,
  patronymic,
  email,
  phone,
  dayOfBirth
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let response = await fetch(
      `https://internships-hse.herokuapp.com/api/students/${
        getState().profile.user.user_id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
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
      let message = "Something went wrong!";
      throw new Error(message);
    }
  };
};
