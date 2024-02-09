import {
  CHUYENS_DELETE,
  CHUYENS_SET,
  CHUYENS_STATE_CLEAR,
  CHUYEN_APPEND,
  CHUYEN_SET,
  CHUYEN_UPDATE,
} from "../actions/actiontypes";

const initialState = {
  chuyen: {},
  chuyens: [],
};

const ChuyenReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHUYEN_SET:
      return { ...state, chuyen: payload };
    case CHUYEN_APPEND:
      return { ...state, chuyens: [payload, ...state.chuyens] };

    case CHUYENS_SET:
      return { ...state, chuyens: payload };

    case CHUYENS_DELETE:
      const newmanu = state.chuyens.filter((item) => item.maChuyen !== payload);

      return {
        ...state,
        chuyens: newmanu,
      };

    case CHUYEN_UPDATE:
      return {
        ...state,
        chuyens: state.chuyens.filter((item) => item.maChuyen !== payload),
      };

    case CHUYENS_STATE_CLEAR:
      return { chuyen: {}, chuyens: [] };
    default:
      return state;
  }
};

export default ChuyenReducer;
