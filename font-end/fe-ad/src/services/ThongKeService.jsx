import axios from "axios";
import { API_THONGKE } from "./constant";

export default class ThongKeService {
  getDoanhThu = async () => {
    return await axios.get(API_THONGKE + "/doanhthu/nam");
  };
  getDoanhThuQuy = async () => {
    return await axios.get(API_THONGKE + "/doanhthu/quy");
  };
  getSoVe = async () => {
    return await axios.get(API_THONGKE + "/ve/nam");
  };
  getSoVeQuy = async () => {
    return await axios.get(API_THONGKE + "/ve/quy");
  };
}
