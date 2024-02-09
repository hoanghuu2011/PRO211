import axios from "axios";
import { API_CAR } from "./constant";

export default class CarService {
  insterCar = async (Car) => {
    return await axios.post(API_CAR, Car);
  };

  getCar = async () => {
    return await axios.get(API_CAR);
  };

  deleteCar = async (bienSoXe) => {
    return await axios.delete(API_CAR + "/" + bienSoXe);
  };

  getItem = async (bienSoXe) => {
    return await axios.get(API_CAR + "/" + bienSoXe);
  };

  updateCar = async (bienSoXe, Car) => {
    return await axios.patch(API_CAR + "/" + bienSoXe, Car);
  };
}
