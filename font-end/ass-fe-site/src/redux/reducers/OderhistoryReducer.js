import { ORDER_DEL, ORDER_SET } from "../actions/actionType";

const initialState = {
  listData: [],
};
const Oderhistory = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_SET:
      return { ...state, listData: payload };
    case ORDER_DEL:
      const newData = state.listData.filter((item) => item.maVe !== payload);
      return { ...state, listData: newData };
    default:
      return state;
  }
};
export default Oderhistory;
