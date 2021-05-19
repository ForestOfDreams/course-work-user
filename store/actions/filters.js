export const SET_FILTERS = "SET_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export const setFilters = (filters) => {
  return { type: SET_FILTERS, filters: filters };
};

export const clearFilters = () => {
  return { type: CLEAR_FILTERS };
};
