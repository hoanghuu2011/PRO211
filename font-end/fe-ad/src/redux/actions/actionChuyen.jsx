import { toast } from "react-toastify";
import ChuyenXeService from "../../services/ChuyenXeService";
import {
  CHUYENS_DELETE,
  CHUYENS_SET,
  CHUYENS_STATE_CLEAR,
  CHUYEN_SET,
  COMMON_LOADING_SET,
} from "./actiontypes";

const service = new ChuyenXeService();

export const insterChuyen = (Chuyen, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const res = await service.insertChuyen(Chuyen);
    if (res.data && res.status === 201) {
      dispatch({
        type: CHUYEN_SET,
        payload: res.data,
      });
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Save Done");
      navigate("/chuyen/danhsach");
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

export const updateChuyen = (id, Chuyen, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.updateChuyen(id, Chuyen);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: CHUYEN_SET,
        payload: res.data,
      });
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Update Done");
      navigate("/chuyen/danhsach");
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

export const getListChuyen = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getChuyen();
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: CHUYENS_SET,
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
  dispatch({ type: CHUYENS_STATE_CLEAR });
};

export const deleteChuyen = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteChuyen(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: CHUYENS_DELETE,
        payload: id,
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success(res.id);
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

export const getChuyen = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getItem(id);

    if (res.status === 200) {
      dispatch({
        type: CHUYEN_SET,
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

export const ChuyenEditData = (chuyen, navigate) => (dispatch) => {
  dispatch({
    type: CHUYEN_SET,
    payload: chuyen,
  });
  navigate("/chuyen/capnhat/" + chuyen.maChuyen);
};

export const clearChuyen = () => async (dispatch) => {
  dispatch({
    type: CHUYEN_SET,
    payload: {},
  });
};
