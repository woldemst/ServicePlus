import { UPDATE_AND_VALIDATE_REGISTER_FIELD, CLEAR_REGISTER_FIELD } from "../actions/registerActions";
import { validate } from "../util/validators";

const initialState = {
  inputs: {
    name: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    role: {
      value: "",
      isValid: false,
    },
  },
  isFormValid: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AND_VALIDATE_REGISTER_FIELD:
      const { fieldName, value, isValid } = action.payload;
      
      const updatedField = {
        ...state.inputs[fieldName],
        value,
        isValid,
      };
      
      const updatedInputs = {
        ...state.inputs,
        [fieldName]: updatedField,
      };

      // Check the overall form validity
      let isFormValid = Object.values(updatedInputs).every(
        (field) => field.isValid
      );

      return {
        ...state,
        inputs: updatedInputs, // Update the inputs field
        isFormValid,
      };


    case CLEAR_REGISTER_FIELD:
      return {
        name: {
          value: "",
          isValid: false,
          isTouched: false,
        },
        email: {
          value: "",
          isValid: false,
          isTouched: false,
        },
        password: {
          value: "",
          isValid: false,
          isTouched: false,
        },
        role: {
          value: "",
          isValid: false,
          isTouched: false,
        },
        isFormValid: false,
      };
    
    default:
      return state;
  }
};

export default registerReducer;
