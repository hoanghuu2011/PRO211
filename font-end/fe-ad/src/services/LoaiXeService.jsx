import axios from "axios";
import { API_LoaiXe } from "./constant";

export default class LoaiXeService {
  insertLoaiXe = async (loaiXe) => {
    return await axios.post(API_LoaiXe, loaiXe);
  };

  getLoaiXe = async (token) => {
    return await axios.get(API_LoaiXe, {

    });
  };

  deleteLoaiXe = async (id) => {
    return await axios.delete(API_LoaiXe + "/" + id);
  };

  getItem = async (id) => {
    return await axios.get(API_LoaiXe + "/" + id);
  };

  updateLoaiXe = async (id, loaiXe) => {
    return await axios.patch(API_LoaiXe + "/ud/" + id, loaiXe);
  };
}
