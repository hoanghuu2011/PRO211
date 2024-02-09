
import {
  FIELD_SET,
  LISTCHUYEN,
  LISTCHUYEN1,
  LISTCHUYEN2,
  LISTTUYEN_SET,
  NGAY_DI_SET,
  NGAY_VE_SET,
} from "../actions/actionType";

const initialState = {
  fieldData: [],
  listChuyen: [],
  listChuyenReturn1: [],
  listChuyenReturn2: [],
  listTuyen: [],
  ngayDi: {},
  ngayVe: {},
};

const SearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FIELD_SET:
      return { ...state, fieldData: payload };

    case LISTCHUYEN:
      return { ...state, listChuyen: payload };
    case LISTCHUYEN1:
      return { ...state, listChuyenReturn1: payload };
    case LISTCHUYEN2:
      return { ...state, listChuyenReturn2: payload };
    case LISTTUYEN_SET:
      return { ...state, listTuyen: payload };
    case NGAY_DI_SET:
      return { ...state, ngayDi: payload };
    case NGAY_VE_SET:
      return { ...state, ngayVe: payload };
    default:
      return state;
  }
};
export default SearchReducer;
