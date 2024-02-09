import { toast } from "react-toastify";
import OrderService from "../../services/OrderService";
import {
  COMMON_LOADING_SET,
  ORDERSDETAIL_SET,
  ORDERS_SET,
} from "./actiontypes";

const service = new OrderService();
export const getListOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getListOrder();

    if (res.status === 200) {
      dispatch({
        type: ORDERS_SET,
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

export const getListOrderDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMON_LOADING_SET,
      payload: true,
    });
    const res = await service.getListOrderDetail(id);
    if (res.status === 200) {
      dispatch({
        type: ORDERSDETAIL_SET,
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
