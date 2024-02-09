import { COMMON_LOADING_SET } from "./actiontypes";

export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: COMMON_LOADING_SET,
    payload: loading,
  });
};
