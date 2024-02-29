// import { SET_INPUT } from "../actions/inputActions";
import { validate } from "../util/validators";

const initialState = {};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_INPUT:
    //   const { fieldName, value, validators } = action.payload;

    //   const updatedInputField = {
    //     ...state.inputs[fieldName],
    //     value,
    //     isValid: validate(value, validators)
    //   };

    //   const updatedInputs = {
    //     ...state.inputs,
    //     [fieldName]: updatedInputField,
    //   };

    //   // let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);

    //   return {
    //     ...state,
    //     inputs: updatedInputs,
    //     // isFormValid: isFormValid
    //   }

    default:
      return state;
  }
};

export default inputReducer;