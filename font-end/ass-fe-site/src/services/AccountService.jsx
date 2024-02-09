import axios from "axios";
import { API_ACC, API_ACCREG, API_CHANGE } from "./constant";

export default class AccountService {
  RegAccount = async (account) => {
    return axios.post(API_ACCREG, account);
  };
  Login = async (account) => {
    return axios.post(API_ACC, account);
  };

  ChangePassword = async (id, account) => {
    return await axios.post( API_CHANGE+ "/" + id, account);
};


}
