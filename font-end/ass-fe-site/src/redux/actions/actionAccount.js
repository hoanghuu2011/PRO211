import AccountService from "../../services/AccountService";
import { ACCOUNT_SET , ACCOUNT_STATE_CLEAR  } from "./actionType";
import { toast } from "react-toastify";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Modal } from 'antd';
const service = new AccountService();
export const createAccount = (account, navigate) => async (dispatch) => {
  try {
    const res = await service.RegAccount(account);
    console.log(res.data);
    if (res.status === 201) {
      if (res.data) {
        dispatch({
          type: ACCOUNT_SET,
          payload: res.data,
        });
        toast.success('Đăng kí thành công', {
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

export const login = (account, navigate) => async (dispatch) => {
  try {
    const res = await service.Login(account);

    if (res.status === 202) {
      dispatch({
        type: ACCOUNT_SET,
        payload: res.data,
      });

      toast.success('Đăng nhập thành công', {
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

      localStorage.setItem("username", res.data.tenTaiKhoan);
    
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


 export const change = (id,account,navigate) => async (dispatch) => {
    try {
   

      const res = await service.ChangePassword(id, account);
  
      if (res.status === 200) {
        dispatch({
          type: ACCOUNT_SET,
          payload: res.data,
        });
  
        toast.success('Đổi mật khẩu thành công', {
          position: "top-right",
          reverseOrder: false,
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
  
        setTimeout(() => {
          dispatch(logoutchange());
          navigate("/login");
        }, 2000);
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

    export const logoutchange = (navigate) => async (dispatch) => {
      try {
    
       
        dispatch({
          type: ACCOUNT_SET,
          payload: null,
        });
        dispatch({
          type: ACCOUNT_STATE_CLEAR,
        });
        localStorage.clear();
       
        toast.success('Vui lòng đăng  nhập lại ', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            border: '1px solid black',
            padding: '16px',
            color: 'yellow',
            backgroundColor: "black",
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
    
    export const logout = (navigate) => async (dispatch) => {
      try {
        Modal.confirm({
          title: 'Xác nhận đăng xuất',
          content: 'Bạn có chắc chắn muốn đăng xuất?',
          onOk: () => {
            localStorage.clear();
             
            dispatch({
              type: ACCOUNT_SET,
              payload: null,
            });
            dispatch({
              type: ACCOUNT_STATE_CLEAR,
            });
    
            toast.success('Đăng xuất thành công', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                border: '1px solid black',
                padding: '16px',
                color: 'yellow',
                backgroundColor: "black",
              },
            });
            navigate('/');
          },
          onCancel: () => {
            // Hủy đăng xuất
          },
        });
      } catch (error) {
        console.error(error);
      }
    };