import {
  LOAIXES_DELETE,
  LOAIXES_SET,
  LOAIXES_STATE_CLEAR,
  LOAIXE_SET,
} from "../actions/actiontypes";

const initialState = {
  LoaiXe: {},
  LoaiXes: [],
};

const LoaiXeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAIXE_SET:
      return { ...state, LoaiXe: payload };

    case LOAIXES_SET:
      return { ...state, LoaiXes: payload };

    case LOAIXES_DELETE:
      const updatedLoaiXes = state.LoaiXes.filter(
        (item) => item.id !== payload
      );

      return {
        ...state,
        LoaiXes: updatedLoaiXes,
      };

    case LOAIXES_STATE_CLEAR:
      return { LoaiXe: {}, LoaiXes: [] };
    default:
      return state;
  }
};

export default LoaiXeReducer;
