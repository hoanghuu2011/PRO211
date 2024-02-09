import { toast } from "react-toastify";
import CustomService from "../../services/CustomService";
import { CUSTOM_SET , FIELD_ACCOUNT } from "./actionType";
const service = new CustomService();
export const quenMK = (account, navigate) => async (dispatch) => {
  try {
    const res = await service.quenMK(account);

    if (res.status === 200) {
      dispatch({
        type: CUSTOM_SET,
        payload: res.data,
      });

      toast.success('Vui lòng check email', {
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
  
      navigate("/");
    } 
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage =
        error.response.data || '';

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
      toast.error('Không có dữ liệu trả về từ máy chủ!', {
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
  }
export const updateCustom = (id ,account,image, navigate) => async (dispatch) => {
 
  try {
    const newCustom = {...account, anhDaLuu: image};
    console.log(newCustom);
    const res = await service.updateAccount(id, newCustom);
    console.log(res.data);
    if (res.status === 200) {
      if (res.data) {
        dispatch({
          type: CUSTOM_SET,
          payload: res.data,
        });
        toast.success('Update thành công', {
          position:"top-right",
         reverseOrder: false,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          navigate("/");
      }   
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage =
        error.response.data || '';
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
      toast.error('Không có dữ liệu trả về từ máy chủ!', {
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
export const fillAccount = (id ,account, navigate) => async (dispatch) => {
  try {
    const res = await service.fillAccount(id,account);
    console.log(res.data);

    if (res.status === 200) {
      dispatch({
        type: CUSTOM_SET,
        payload: res.data,
      });
      localStorage.setItem("hoTen", res.data.hoTen);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("soDT", res.data.soDT);
      localStorage.setItem("anh", res.data.anhDaLuu.tenTep);
    }
  } catch (error) {
    console.log(error);
  }
};
