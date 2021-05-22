import Course from "../../models/course";

export const SET_COURSES = "SET_COURSES";

export const fetchCourses = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const params = getState().filters;
      var url =
        "https://internships-hse.herokuapp.com/internships/filter?search=";
      if (params.filters.country) {
        url = url.concat("country:", params.filters.country, ",");
      }
      if (params.filters.subject) {
        url = url.concat("subject:", params.filters.subject, ",");
      }
      if (params.filters.price) {
        url = url.concat("price:", params.filters.price, ",");
      }
      if (params.filters.language) {
        url = url.concat("language:", params.filters.language, ",");
      }
      if (params.filters.minCost) {
        url = url.concat("price>", params.filters.minCost, ",");
      }
      if (params.filters.maxCost) {
        url = url.concat("price<", params.filters.maxCost, ",");
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadCourses = [];

      for (const key in resData) {
        loadCourses.push(
          new Course(
            resData[key].checked,
            resData[key].country,
            resData[key].description,
            resData[key].finishDate,
            resData[key].internship_id,
            resData[key].language,
            resData[key].name,
            resData[key].price,
            resData[key].reviews,
            resData[key].startDate,
            "",
            resData[key].score,
            resData[key].subject
          )
        );
      }
      dispatch({ type: SET_COURSES, courses: loadCourses });
    } catch (err) {
      throw err;
    }
  };
};
