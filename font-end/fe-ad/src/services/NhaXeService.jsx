import axios from "axios";
import { API_NHAXE } from "./constant";

export default class NhaXeService {
  insertNhaXe = async (NhaXe) => {
    return await axios.post(API_NHAXE, NhaXe);
  };

  getNhaXe = async () => {
    return await axios.get(API_NHAXE);
  };

  deleteNhaXe = async (id) => {
    return await axios.delete(API_NHAXE + "/" + id);
  };

  getItem = async (id) => {
    return await axios.get(API_NHAXE + "/" + id);
  };

  updateNhaXe = async (id, NhaXe) => {
    return await axios.patch(API_NHAXE + "/" + id, NhaXe);
  };
}
