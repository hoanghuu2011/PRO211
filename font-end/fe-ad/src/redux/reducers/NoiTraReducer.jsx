import {
  NOITRAES_DELETE,
  NOITRAES_SET,
  NOITRAES_STATE_CLEAR,
  NOITRA_APPEND,
  NOITRA_SET,
  NOITRA_UPDATE,
} from "../actions/actiontypes";

const initialState = {
  noiTra: {},
  noiTras: [],
};

const NoiTraReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOITRA_SET:
      return { ...state, noiTra: payload };
    case NOITRA_APPEND:
      return { ...state, noiTras: [payload, ...state.noiTras] };

    case NOITRAES_SET:
      return { ...state, noiTras: payload };

    case NOITRAES_DELETE:
      const newmanu = state.noiTras.filter((item) => item.id !== payload);

      return {
        ...state,
        noiTras: newmanu,
      };

    case NOITRA_UPDATE:
      return {
        ...state,
        noiTras: state.noiTras.filter((item) => item.id !== payload),
      };

    case NOITRAES_STATE_CLEAR:
      return { noiTra: {}, noiTras: [] };
    default:
      return state;
  }
};

export default NoiTraReducer;
