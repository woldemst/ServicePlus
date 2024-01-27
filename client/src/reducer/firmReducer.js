import { UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD, UPDATE_FIRM_DATA, GET_FIRM_DATA } from "../actions/firmActions";
import { validate } from '../util/validators';


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
  isFormValid: false,
};

const firmReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD:
      const { fieldName, value, validators } = action.payload;

      const updatedField = {
        ...state.inputs[fieldName],
        value,
        isValid: validate(value, validators)
      };

      const updatedInputs = {
        ...state.inputs,
        [fieldName]: updatedField,
      };

      let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);


      return {
        ...state,
        inputs: updatedInputs,
        isFormValid,
      };
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
            isValid: true,
          },
          street: {
            value: receivedFirmData.street,
            isValid: true,
          },
          houseNr: {
            value: receivedFirmData.houseNr,
            isValid: true,
          },
          zip: {
            value: receivedFirmData.zip,
            isValid: true,
          },
          place: {
            value: receivedFirmData.place,
            isValid: true,
          },
          phone: {
            value: receivedFirmData.phone,
            isValid: true,
          },
          website: {
            value: receivedFirmData.website,
            isValid: true,
          },
        },
        isFormValid: true
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