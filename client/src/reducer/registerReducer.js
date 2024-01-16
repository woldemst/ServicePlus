import { UPDATE_AND_VALIDATE_REGISTER_FIELD, CLEAR_REGISTER_FIELD } from "../actions/registerActions";
import { validate } from "../util/validators";

const initialState = {
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
  isFormValid: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AND_VALIDATE_REGISTER_FIELD:
      const { fieldName, value, validators } = action.payload;
      
      const updatedField = {
        ...state[fieldName],
        value,
        isValid: validate(value, validators),
      };
      
      const updatedState = {
        ...state,
        [fieldName]: updatedField,
      };

      // Check the overall form validity
      // let isFormValid = Object.values(updatedState).every((field) => field);

      let isFormValid = false;
      if (
        updatedState.name.isValid &&
        updatedState.email.isValid &&
        updatedState.password.isValid &&
        updatedState.role.isValid
      ) {
        isFormValid = true;
      }

      return {
        ...updatedState,
        isFormValid: isFormValid,
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
