import axios from "axios";
import { API_MANUFACTURER } from "./constant";

export default class ManufacturerService {
  insertManufacturer = async (Manufacturer) => {
    return await axios.post(API_MANUFACTURER, Manufacturer);
  };

  getManufacturer = async () => {
    return await axios.get(API_MANUFACTURER);
  };

  deleteManufacturer = async (id) => {
    return await axios.delete(API_MANUFACTURER + "/" + id);
  };

  getItem = async (id) => {
    return await axios.get(API_MANUFACTURER + "/" + id);
  };

  updateManufacturer = async (id, Manufacturer) => {
    return await axios.patch(API_MANUFACTURER + "/" + id, Manufacturer);
  };


}
