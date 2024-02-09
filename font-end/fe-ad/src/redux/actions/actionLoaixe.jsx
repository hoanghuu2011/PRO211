import { toast } from "react-toastify";
import loaiXeService from "../../services/LoaiXeService";
import {
  LOAIXES_DELETE,
  LOAIXES_SET,
  LOAIXES_STATE_CLEAR,
  LOAIXE_SET,
  COMMON_LOADING_SET,
} from "./actiontypes";

const service = new loaiXeService();

export const insterloaiXe = (loaiXe, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const res = await service.insertLoaiXe(loaiXe);
    console.log(res);
    if (res.data && res.status === 201) {
      dispatch({
        type: LOAIXE_SET,
        payload: res.data,
      });
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Save Done");
      navigate("/loaiXe/danhsach");
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

export const updateloaiXe = (id, loaiXe, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.updateloaiXe(id, loaiXe);

    if (res.status === 201) {
      dispatch({
        type: LOAIXE_SET,
        payload: res.data,
      });
      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Update Done");
      navigate("/loaiXe/list");
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

export const getListLoaiXe = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getLoaiXe();
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: LOAIXES_SET,
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
  dispatch({ type: LOAIXES_STATE_CLEAR });
};

export const deleteLoaiXe = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteloaiXe(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: LOAIXES_DELETE,
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
    //   toast.error(
    //     error.response.data ? error.response.data.message : error.message
    //   );
  }
};

export const getloaiXe = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getItem(id);

    if (res.status === 200) {
      dispatch({
        type: LOAIXE_SET,
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

export const clearloaiXe = () => async (dispatch) => {
  dispatch({
    type: LOAIXE_SET,
    payload: { id: "", name: "", status: "Visible" },
  });
};
