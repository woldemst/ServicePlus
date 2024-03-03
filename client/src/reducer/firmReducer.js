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
    email: {
      value: "",
      isValid: false,
    },
    street: {
      value: "",
      isValid: false,
    },
    houseNr: {
      value: "",
      isValid: false,
    },
    zip: {
      value: "",
      isValid: false,
    },
    place: {
      value: "",
      isValid: false,
    },
    phone: {
      value: "",
      isValid: false,
    },
    website: {
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
          email: {
            value: receivedFirmData.email,
            isValid: false,
          },
          street: {
            value: receivedFirmData.street,
            isValid: false,
          },
          houseNr: {
            value: receivedFirmData.houseNr,
            isValid: false,
          },
          zip: {
            value: receivedFirmData.zip,
            isValid: false,
          },
          place: {
            value: receivedFirmData.place,
            isValid: false,
          },
          phone: {
            value: receivedFirmData.phone,
            isValid: false,
          },
          website: {
            value: receivedFirmData.website,
            isValid: false,
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