import { COMMON_LOADING_SET } from "../actions/actionType";
const initialState = {
  isLoading: false,
};

const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMON_LOADING_SET:
      return { ...state, isLoading: payload };
     
    default:
      return state;
  }
};

export default commonReducer;
