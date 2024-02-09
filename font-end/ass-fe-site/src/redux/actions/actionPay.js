import PayService from "../../services/PayService";
import { PAY_SET } from "./actionType";

const service = new PayService();
export const loadDataPay = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await service.loadData(data);
    console.log(res);

    if (res.status === 200) {
      dispatch({
        type: PAY_SET,
        payload: res.data,
      });
    }
  } catch (error) {
    console.error(error);
  }
  
};

export const createPay = async (data)=>{
 return await service.creatpay(data);
}
