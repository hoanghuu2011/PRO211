import { toast } from "react-toastify";

import {
  ACCOUNTS_DEL,
  ACCOUNTS_SET,
  ACCOUNT_SET,
  ACCOUNT_STATE_CLEAR,
  COMMON_LOADING_SET,
} from "./actiontypes";
import AccountService from "../../services/AccountService";

const service = new AccountService();

export const insterAccount = (account, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.insertAccount(account);

    if (res.status === 201) {
      dispatch({
        type: ACCOUNT_SET,
        payload: res.data,
      });
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Save Done");
      navigate("/account/list");
    }
  } catch (error) {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: false,
    });
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
};

export const updateAccount = (id, account, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.updateAccount(id, account);

    if (res.status === 201) {
      dispatch({
        type: ACCOUNT_SET,
        payload: res.data,
      });
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Update Done");
      navigate("/account/acc");
    }
  } catch (error) {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: false,
    });
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
};

export const getListAccount = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getAccount();

    if (res.status === 200) {
      dispatch({
        type: ACCOUNTS_SET,
        payload: res.data,
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
    }
  } catch (error) {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: false,
    });
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
};

export const clearList = () => async (dispatch) => {
  dispatch({ type: ACCOUNT_STATE_CLEAR });
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteAccount(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: ACCOUNTS_DEL,
        payload: id,
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success(res.data);
    }
  } catch (error) {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: false,
    });
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
};
