import { UPDATE_FIRM_DATA, GET_FIRM_DATA } from "../actions/firmActions";

const initialState = {
  inputs: {
    ownerName: {
      value: "",
      isValid: false,
    },
    name: {
      value: "",
      isValid: false,
    },
  },
};

const firmReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIRM_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case GET_FIRM_DATA:
      const receivedFirmData = action.payload;

      const updatedFirmData = {
        inputs: {
          ownerName: {
            value: receivedFirmData.ownerName,
            isValid: true,
          },
          name: {
            value: receivedFirmData.name,
            isValid: true,
          },
        },
      };

      return {
        ...state,
        ...updatedFirmData
      };
    default:
      return state;
  }
};

export default firmReducer;