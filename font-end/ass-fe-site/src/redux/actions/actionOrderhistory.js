import { toast } from "react-toastify";
import OrderService from "../../services/OrderhistoryService";
import { ORDER_DEL, ORDER_SET } from "./actionType";
const service = new OrderService();

export const orderhistory = (id, data) => async (dispatch) => {
  try {
    const res = await service.ListByAccount(id, data);
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: ORDER_SET,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const gethistory = (id, navigate) => async (dispatch) => {
  try {
    const res = await service.ByMaThanhToan(id);
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: ORDER_SET,
        payload: res.data,
      });
      toast.success("Tra cứu thành công", {
        position: "top-right",
        reverseOrder: false,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/thongtinve/" + id);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      const errorMessage = error.response.data || "";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        backgroundColor: "#ff0000",
      });
    } else {
      toast.error("Không có dữ liệu trả về từ máy chủ!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        backgroundColor: "#ff0000",
      });
    }
  }
};
export const deleteOrder = (id, navigate) => async (dispatch) => {
  try {
    const res = await service.HuyVe(id);
    console.log(res);
    if (res.status === 200) {
      
      dispatch({
        type: ORDER_DEL,
        payload: id,
      });

      toast.success(res.data, {
        position: "top-right",
        reverseOrder: false,
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
     
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data || "";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        backgroundColor: "#ff0000",
      });
    }
  }
};
