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

// const createFormData = (photo, body) => {
//   (photo);
//   const data = new FormData();
//   data.append("file", {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
//   });

//   Object.keys(body).forEach((key) => {
//     data.append(key, body[key]);
//   });

//   return data;
// };

const createFormData = (image, body) => {
  const data = new FormData();

  data.append("file", {
    uri:
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export const uploadImage = (image) => {
  return async (dispatch, getState) => {
    var photo = {
      uri: image.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    };
    var form = new FormData();
    form.append("file", photo);
    const token = getState().auth.token;
    let response = await fetch(
      `https://internships-hse.herokuapp.com/api/students/${
        getState().profile.user.user_id
      }/image`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        body: form,
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }
  };
};
