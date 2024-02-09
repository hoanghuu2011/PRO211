import {
  COMMON_LOADING_SET,
  NHANVIENS_DEL,
  NHANVIENS_SET,
  NHANVIEN_ADDEND,
  NHANVIEN_SET,
} from "./actiontypes";
import NhanVienService from "../../services/NhanVienService";
import { toast } from "react-toastify";

const service = new NhanVienService();

export const insterNhanVien = (nhanVien, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.insterNhanVien(nhanVien);

    if (res && res.status === 201) {
      dispatch({
        type: NHANVIEN_SET,
        payload: res.data,
      });

      dispatch({
        type: NHANVIEN_ADDEND,
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

    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: true,
  });

  clearNhanVien();
  navigate("/nhanvien/danhsach");
};

export const updateNhanVien = (id, nhanVien, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });

    const res = await service.updateNhanVien(id, nhanVien);
    console.log(res);
    if (res && res.status === 200) {
      dispatch({
        type: NHANVIEN_SET,
        payload: res.data,
      });

      dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
      });
      toast.success("Update Done");
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
  dispatch({
    type: COMMON_LOADING_SET,
    payload: true,
  });
  clearNhanVien();
  navigate("/nhanvien/danhsach");
};

export const getListNhanVien = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getNhanVien();

    if (res && res.status === 200) {
      dispatch({
        type: NHANVIENS_SET,
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
    console.log(error.message);
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: true,
  });
};

export const getListNhanVienNhaXe = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getNhanVien(id);

    if (res && res.status === 200) {
      dispatch({
        type: NHANVIENS_SET,
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
    console.log(error.message);
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
  dispatch({
    type: COMMON_LOADING_SET,
    payload: true,
  });
};

export const nhanVienEditData = (nhanVien, navigate) => (dispatch) => {
  dispatch({
    type: NHANVIEN_SET,
    payload: nhanVien,
  });
  navigate("/nhanvien/sua/" + nhanVien.soCCCD);
};

export const deleteNhanVien = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteNhanVien(id);

    if (res && res.status === 200) {
      dispatch({
        type: NHANVIENS_DEL,
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

export const clearNhanVien = () => (dispatch) => {
  dispatch({
    type: NHANVIEN_SET,
    payload: {},
  });
};
