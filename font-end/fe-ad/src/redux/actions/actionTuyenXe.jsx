import { toast } from "react-toastify";
import TuyenXeService from "../../services/TuyenXeService";
import {
  COMMON_LOADING_SET,
  TUYENXES_DELETE,
  TUYENXES_SET,
  TUYENXES_STATE_CLEAR,
  TUYENXE_APPEND,
  TUYENXE_SET,
  TUYENXE_UPDATE,
} from "./actiontypes";

const service = new TuyenXeService();

export const insterTuyen = (tuyen , navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.insertTuyenXe(tuyen);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: TUYENXE_SET,
        payload: res.data,
      });

      dispatch({
        type: TUYENXE_APPEND,
        payload: res.data,
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Save Done");
      clearTuyen();
    }
    navigate("/tuyen")
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

export const updateTuyen = (id, tuyen, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.updateTuyenXe(id, tuyen);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Update Done");
      clearTuyen();
      navigate("/tuyen");
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

export const getListTuyen = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getTuyen();
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: TUYENXES_SET,
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
    console.log(error);
    // toast.error(
    //   error.response.data ? error.response.data.message : error.message
    // );
  }
};

export const clearList = () => (dispatch) => {
  dispatch({ type: TUYENXES_STATE_CLEAR });
};

export const deleteTuyen = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteTuyenXe(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: TUYENXES_DELETE,
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

export const getTuyen = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getItem(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: TUYENXE_SET,
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

export const clearTuyen = () => async (dispatch) => {
  dispatch({
    type: TUYENXE_SET,
    payload: {
      maTuyenXe: "",
      gia: 0,
      tgDen: "",
      tgDi: "",
      noiTra: "",
      noiDon: "",
      diemDen: "",
      diemDi: "",
    },
  });
};

export const TuyenEditData = (tuyen, navigate) => (dispatch) => {
  dispatch({
    type: TUYENXE_SET,
    payload: tuyen,
  });
  navigate("/tuyen/capnhat/" + tuyen.maTuyenXe);
};
