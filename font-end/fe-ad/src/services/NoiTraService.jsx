import axios from "axios";
import { API_NOITRA } from "./constant";

export default class NoiTraService {
  insertNoiTra = async (NoiTra) => {
    return await axios.post(API_NOITRA, NoiTra);
  };

  getNoiTra = async () => {
    return await axios.get(API_NOITRA);
  };

  deleteNoiTra = async (id) => {
    return await axios.delete(API_NOITRA + "/" + id);
  };

  getItem = async (id) => {
    return await axios.get(API_NOITRA + "/" + id);
  };

  updateNoiTra = async (id, NoiTra) => {
    return await axios.patch(API_NOITRA + "/" + id, NoiTra);
  };
}
