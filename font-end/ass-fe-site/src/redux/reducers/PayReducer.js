import { PAY_SET } from "../actions/actionType";

const initialState = {
  loadData:{}

};

const PayReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PAY_SET:
      return { ...state, loadData: payload };
   
    default:
      return state;
  }
};
export default PayReducer;
