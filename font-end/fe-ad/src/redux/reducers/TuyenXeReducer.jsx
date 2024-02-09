import {
  TUYENXES_DELETE,
  TUYENXES_SET,
  TUYENXES_STATE_CLEAR,
  TUYENXE_APPEND,
  TUYENXE_SET,
  TUYENXE_UPDATE,
} from "../actions/actiontypes";

const initialState = {
  tuyenXe: {},
  tuyenXes: [],
};

const TuyenXeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TUYENXE_SET:
      return { ...state, tuyenXe: payload };
    case TUYENXE_APPEND:
      return { ...state, tuyenXes: [payload, ...state.tuyenXes] };

    case TUYENXES_SET:
      return { ...state, tuyenXes: payload };

    case TUYENXES_DELETE:
      const newmanu = state.tuyenXes.filter(
        (item) => item.maTuyenXe !== payload
      );

      return {
        ...state,
        tuyenXes: newmanu,
      };

    case TUYENXE_UPDATE:
      return {
        ...state,
        tuyenXes: state.tuyenXes.filter((item) => item.maTuyenXe !== payload),
      };

    case TUYENXES_STATE_CLEAR:
      return { tuyenXe: {}, tuyenXes: [] };
    default:
      return state;
  }
};

export default TuyenXeReducer;
