import { ACCOUNT_SET, ACCOUNT_STATE_CLEAR } from "../actions/actionType";
const initialState = {
  account: {},
};

const AccountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCOUNT_SET:
      return { ...state, account: payload };
    case ACCOUNT_STATE_CLEAR:
      return { account: {} };
    default:
      return state;
  }
};
export default AccountReducer;
