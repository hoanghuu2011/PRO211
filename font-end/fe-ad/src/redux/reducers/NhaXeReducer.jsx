import {
  NHAXES_DELETE,
  NHAXES_SET,
  NHAXES_STATE_CLEAR,
  NHAXE_APPEND,
  NHAXE_SET,
  NHAXE_UPDATE,
} from "../actions/actiontypes";

const initialState = {
  nhaXe: {},
  nhaXes: [],
};

const NoiTraReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NHAXE_SET:
      return { ...state, nhaXe: payload };
    case NHAXE_APPEND:
      return { ...state, nhaXes: [payload, ...state.nhaXes] };

    case NHAXES_SET:
      return { ...state, nhaXes: payload };

    case NHAXES_DELETE:
      const newmanu = state.nhaXes.filter((item) => item.id !== payload);

      return {
        ...state,
        nhaXes: newmanu,
      };

    case NHAXE_UPDATE:
      return {
        ...state,
        nhaXes: state.nhaXes.filter((item) => item.id !== payload),
      };

    case NHAXES_STATE_CLEAR:
      return { nhaXe: {}, nhaXes: [] };
    default:
      return state;
  }
};

export default NoiTraReducer;
