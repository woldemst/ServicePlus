import { SET_INPUT, SET_INITIAL_INPUT_DATA } from "../actions/inputActions";
import { validate } from "../util/validators";

const initial = {
  inputs: {},
  isFormValid: false,
};

const inputReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_INITIAL_INPUT_DATA:
      return {
        ...state,
        inputs: { ...action.payload },
      }
    case SET_INPUT:
      const { fieldName, value, validators } = action.payload;
      // console.log(state);
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

    default:
      return state;
  }
};

export default inputReducer;