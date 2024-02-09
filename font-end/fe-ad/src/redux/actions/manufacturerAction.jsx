import { toast } from "react-toastify";
import ManufacturerService from "../../services/ManufacturerService";
import {
  MANUFACTURER_SET,
  COMMON_LOADING_SET,
  MANUFACTURERES_SET,
  MANUFACTURERES_STATE_CLEAR,
  MANUFACTURERES_DELETE,
  MANUFACTURER_APPEND,
  MANUFACTURER_UPDATE,
} from "./actiontypes";

const service = new ManufacturerService();

export const insterManufacturer = (manufacturer) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.insertManufacturer(manufacturer);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: MANUFACTURER_SET,
        payload: res.data,
      });

      dispatch({
        type: MANUFACTURER_APPEND,
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

export const updateManufacturer = (id, manufacturer) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.updateManufacturer(id, manufacturer);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: MANUFACTURER_UPDATE,
        payload: id,
      });
      dispatch({
        type: MANUFACTURER_APPEND,
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
    toast.error(
      error.response.data ? error.response.data.message : error.message
    );
  }
};

export const getListManufacturer = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getManufacturer();
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: MANUFACTURERES_SET,
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
  dispatch({ type: MANUFACTURERES_STATE_CLEAR });
};

export const deleteManufacturer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.deleteManufacturer(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: MANUFACTURERES_DELETE,
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

export const getManufacturer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getItem(id);

    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: MANUFACTURER_SET,
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

export const clearManufacturer = () => async (dispatch) => {
  dispatch({
    type: MANUFACTURER_SET,
    payload: { id: "", name: "", status: "Visible" },
  });
};
