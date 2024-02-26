import { SET_INPUT, SET_INITIAL_DATA } from "../actions/inputActions";
import { validate } from "../util/validators";

const initialState = {};

const inputReducer = (state = initialState, action) => {
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
    case SET_INITIAL_DATA:
      console.log(action.payload);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default inputReducer;