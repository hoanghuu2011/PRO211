import axios from "axios";
import {
  API_SEARCH,
  API_SEARCH_LOCATION,
  API_SEARCH_MOTCHIEU,
} from "./constant";
export default class SearchService {
  loadDataField = async () => {
    return await axios.get(API_SEARCH);
  };
  loadDataTuyen = async () => {
    return await axios.get(API_SEARCH_LOCATION);
  };
  loadListChuyen = async (data) => {
    console.log(data);
    return await axios.post(API_SEARCH+"/one-way", data);
  };


  loadListChuyenByTuyen = async (data) => {
    return await axios.post(API_SEARCH + "/findbuses", data);
  };

  loadListChuyenReturn = async (tc) => {
   
    return await axios.post(API_SEARCH + "/return", tc);
  };

  loadGhe = async (data) => {
    return await axios.post(API_SEARCH + "/cho", data);
  };

  loadGhe2 = async (data) => {
    return await axios.post(API_SEARCH + "/cho2", data);
  };

  loadSoGhe = async (id) => {
    return await axios.get(API_SEARCH + "/soghe/" + id);
  };
}
