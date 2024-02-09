import {
  ACCOUNTS_DEL,
  ACCOUNTS_SET,
  ACCOUNT_SET,
  ACCOUNT_STATE_CLEAR,
} from "../actions/actiontypes";

const initialState = {
  account: {},
  accounts: [],
};

const AccountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCOUNT_SET:
      return { ...state, account: payload };

    case ACCOUNTS_SET:
      return { ...state, accounts: payload };

    case ACCOUNTS_DEL:
      const updatedAcc = state.accounts.filter(
        (item) => item.username !== payload
      );

      return {
        ...state,
        accounts: updatedAcc,
      };

    case ACCOUNT_STATE_CLEAR:
      return { account: {}, accounts: [] };
    default:
      return state;
  }
};

export default AccountReducer;
