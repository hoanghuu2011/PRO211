import axios from "axios";
import { API_CHUYEN } from "./constant";

export default class ChuyenXeService {
  insertChuyen = async (Chuyen) => {
    return await axios.post(API_CHUYEN, Chuyen);
  };

  getChuyen = async () => {
    return await axios.get(API_CHUYEN);
  };

  deleteChuyen = async (id) => {
    return await axios.delete(API_CHUYEN + "/" + id);
  };

  getItem = async (id) => {
    return await axios.get(API_CHUYEN + "/" + id);
  };

  updateChuyen = async (id, Chuyen) => {
    return await axios.patch(API_CHUYEN + "/" + id, Chuyen);
  };

  listDisabled = async () => {
    return await axios.get(API_CHUYEN + "/nhanvien");
  };
}
