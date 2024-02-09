import { toast } from "react-toastify";

import {
  COMMON_LOADING_SET,
  NHAXES_DELETE,
  NHAXES_SET,
  NHAXES_STATE_CLEAR,
  NHAXE_APPEND,
  NHAXE_SET,
  NHAXE_UPDATE,
} from "./actiontypes";

import NhaXeService from "../../services/NhaXeService";

const service = new NhaXeService();

export const insterNhaXe = (manufacturer) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.insertNhaXe(manufacturer);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: NHAXE_SET,
        payload: res.data,
      });

      dispatch({
        type: NHAXE_APPEND,
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

export const updateNhaXe = (id, manufacturer, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.updateNhaXe(id, manufacturer);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: NHAXE_UPDATE,
        payload: id,
      });
      dispatch({
        type: NHAXE_APPEND,
        payload: res.data,
      });
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Update Done");
      navigate("/xe/nhaxe");
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

export const getListNhaXe = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getNhaXe();
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: NHAXES_SET,
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
  dispatch({ type: NHAXES_STATE_CLEAR });
};

export const deleteNhaXe = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteNhaXe(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: NHAXES_DELETE,
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

export const getNhaXe = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getItem(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: NHAXE_SET,
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

export const clearNhaXe = () => async (dispatch) => {
  dispatch({
    type: NHAXE_SET,
    payload: { id: "", noiTra: "" },
  });
};
