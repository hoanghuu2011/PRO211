import axios from "axios";
import { API_CUSTOM,API_QUENMK } from "./constant";

export default class CustomService {
   
    updateAccount = async (id, account) => {
      return await axios.patch( API_CUSTOM+ "/" + id, account);
  };
     fillAccount = async (id, account) => {
    return await axios.get( API_CUSTOM + "/" + id, account);
  };
  quenMK = async (account) => {
    return await axios.patch( API_QUENMK, account);
  };
  }
  