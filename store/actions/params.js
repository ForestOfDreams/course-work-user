export const SET_PARAMS = "SET_PARAMS";

export const fetchParams = () => {
  return async (dispatch) => {
    let response = await fetch(
      "https://internships-hse.herokuapp.com/internships/subjects",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const subjectsResData = await response.json();

    response = await fetch(
      "https://internships-hse.herokuapp.com/internships/languages",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const languagesResData = await response.json();

    response = await fetch(
      "https://internships-hse.herokuapp.com/internships/prices",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const pricesResData = await response.json();

    response = await fetch(
      "https://internships-hse.herokuapp.com/internships/countries",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      let message = "Something went wrong!";
      throw new Error(message);
    }

    const countriesResData = await response.json();

    const params = {
      subjects: subjectsResData,
      languages: languagesResData,
      prices: pricesResData,
      countries: countriesResData,
    };

    dispatch({ type: SET_PARAMS, params: params });
  };
};
