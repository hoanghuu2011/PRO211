import axios from "axios";
import { API_ORDER } from "./constant";

export default class OrderService {
  getListOrder = async () => {
    return await axios.get(API_ORDER);
  };
  getListOrderDetail = async (id) => {
    return await axios.get(API_ORDER + "/" + id);
  };
}
