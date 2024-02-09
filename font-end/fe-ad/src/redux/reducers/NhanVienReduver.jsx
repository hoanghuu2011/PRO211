import {
  NHANVIENS_DEL,
  NHANVIENS_SET,
  NHANVIENS_STATE_CLEAR,
  NHANVIEN_ADDEND,
  NHANVIEN_SET,
} from "../actions/actiontypes";

const InitialState = {
  nhanVien: {},
  nhanViens: [],
};
const NhanVienReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case NHANVIEN_SET:
      return { ...state, nhanVien: payload };

    case NHANVIENS_SET:
      return { ...state, nhanViens: payload };

    case NHANVIENS_DEL:
      const updatedAcc = state.nhanViens.filter(
        (item) => item.soCCCD !== payload
      );

      return {
        ...state,
        nhanViens: updatedAcc,
      };

    case NHANVIEN_ADDEND:
      return { ...state, nhanViens: [payload, ...state.nhanViens] };

    case NHANVIENS_STATE_CLEAR:
      return { nhanVien: {}, nhanViens: [] };
    default:
      return state;
  }
};
export default NhanVienReducer;
