import { UPDATE_AND_VALIDATE_FIELD, UPDATE_FIRM_DATA, GET_FIRM_DATA } from "../actions/firmActions";
import { SET_INPUT } from "../actions/inputActions";
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
    case SET_INPUT:
      const { fieldName, value, validators } = action.payload;

      const updatedInputField = {
        ...state.inputs[fieldName],
        value,
        isValid: validate(value, validators)
      };

      const updatedInputs = {
        ...state.inputs,
        [fieldName]: updatedInputField,
      };

      let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);

      return {
        ...state,
        inputs: updatedInputs,
        isFormValid: isFormValid
      }

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