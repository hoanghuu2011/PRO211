import axios from "axios";
import { API_PAY} from "./constant";
export default class PayService {

    loadPay = async (data) => {
        return await axios.get(API_PAY + "/create_pay/" + data);
      };
 
      creatpay = async (data) => {
       return await axios.post(API_PAY, data);
      }
      
}
