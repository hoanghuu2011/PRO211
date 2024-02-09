import { toast } from "react-toastify";

import {
  NOITRA_SET,
  COMMON_LOADING_SET,
  NOITRAES_SET,
  NOITRAES_STATE_CLEAR,
  NOITRAES_DELETE,
  NOITRA_APPEND,
  NOITRA_UPDATE,
} from "./actiontypes";
import NoiTraService from "../../services/NoiTraService";

const service = new NoiTraService();

export const insterNoiTra = (manufacturer) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.insertNoiTra(manufacturer);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: NOITRA_SET,
        payload: res.data,
      });

      dispatch({
        type: NOITRA_APPEND,
        payload: res.data,
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Save Done");
    }
  } catch (error) {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: false,
    });
    console.log(error.message);
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
};

export const updateNoiTra =
  (id, manufacturer, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: COMMON_LOADING_SET,
        payload: true,
      });
      const res = await service.updateNoiTra(id, manufacturer);
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: NOITRA_UPDATE,
          payload: id,
        });
        dispatch({
          type: NOITRA_APPEND,
          payload: res.data,
        });
        dispatch({
          type: COMMON_LOADING_SET,
          payload: false,
        });
        toast.success("Update Done");
        navigate("/tuyen/noitra");
      }
    } catch (error) {
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      // toast.error(
      //   error.response.data ? error.response.data.message : error.message
      // );
      console.log(error);
    }
  };

export const getListNoiTra = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getNoiTra();
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: NOITRAES_SET,
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

export const clearList = () => (dispatch) => {
  dispatch({ type: NOITRAES_STATE_CLEAR });
};

export const deleteNoiTra = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteNoiTra(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: NOITRAES_DELETE,
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

export const getNoiTra = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getItem(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: NOITRA_SET,
        payload: res.data,
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

export const clearNoiTra = () => async (dispatch) => {
  dispatch({
    type: NOITRA_SET,
    payload: { id: "", noiTra: "" },
  });
};
