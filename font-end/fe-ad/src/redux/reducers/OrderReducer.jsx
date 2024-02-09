import {
  ORDERSDETAIL_SET,
  ORDERS_DEL,
  ORDERS_SET,
} from "../actions/actiontypes";

const initialState = {
  order: [],
  orderDetail: [],
};

const OrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDERS_SET:
      return { ...state, order: payload };
    case ORDERS_DEL:
      const updateOrder = state.order.filter((item) => item.id !== payload);

      return { ...state, order: updateOrder };

    case ORDERSDETAIL_SET:
      return { ...state, orderDetail: payload };

    default:
      return state;
  }
};

export default OrderReducer;
