import {
  CARS_DEL,
  CARS_SET,
  CAR_ADDEND,
  CAR_SET,
} from "../actions/actiontypes";

const initialState = {
  Car: {},
  Cars: [],

};

const CarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CAR_SET:
      return { ...state, Car: payload };
    case CAR_ADDEND:
      return { ...state, Cars: [payload, ...state.Cars] };
    case CARS_SET:
      return { ...state, Cars: payload };
    case CARS_DEL:
      const newCar = state.Cars.filter((item) => item.bienSoXe !== payload);
      return {
        ...state,
        Cars: newCar,
      };
    default:
      return state;
  }
};
export default CarReducer;
