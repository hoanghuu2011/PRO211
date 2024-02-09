import axios from "axios";
import { API_TUYEN } from "./constant";

export default class TuyenXeService {
  insertTuyenXe = async (tuyen) => {
    return await axios.post(API_TUYEN, tuyen);
  };

  getTuyen = async () => {
    return await axios.get(API_TUYEN);
  };

  deleteTuyenXe = async (id) => {
    return await axios.delete(API_TUYEN + "/" + id);
  };

  getItem = async (id) => {
    return await axios.get(API_TUYEN + "/" + id);
  };

  updateTuyenXe = async (id, tuyen) => {
    return await axios.patch(API_TUYEN + "/" + id, tuyen);
  };

  getListNoiTra = async () => {
    return await axios.get(API_TUYEN + "/noitra");
  };
}
