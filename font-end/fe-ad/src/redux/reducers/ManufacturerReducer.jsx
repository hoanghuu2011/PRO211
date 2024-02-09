import {
  MANUFACTURERES_DELETE,
  MANUFACTURERES_SET,
  MANUFACTURERES_STATE_CLEAR,
  MANUFACTURER_APPEND,
  MANUFACTURER_SET,
  MANUFACTURER_UPDATE,
} from "../actions/actiontypes";

const initialState = {
  manufacturer: {},
  manufactureres: [],
};

const ManufacturerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MANUFACTURER_SET:
      return { ...state, manufacturer: payload };
    case MANUFACTURER_APPEND:
      return { ...state, manufactureres: [payload, ...state.manufactureres] };

    case MANUFACTURERES_SET:
      return { ...state, manufactureres: payload };

    case MANUFACTURERES_DELETE:
      const newmanu = state.manufactureres.filter(
        (item) => item.id !== payload
      );

      return {
        ...state,
        manufactureres: newmanu,
      };

    case MANUFACTURER_UPDATE:
      return {
        ...state,
        manufactureres: state.manufactureres.filter(
          (item) => item.id !== payload
        ),
      };

    case MANUFACTURERES_STATE_CLEAR:
      return { manufacturer: {}, manufactureres: [] };
    default:
      return state;
  }
};

export default ManufacturerReducer;
