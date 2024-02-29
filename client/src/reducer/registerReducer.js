import { CLEAR_REGISTER_FIELD } from "../actions/registerActions";
import { SET_INPUT } from '../actions/inputActions';
import { SET_SELECT } from "../actions/selectActions";
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
  },
  selects: {
    role: [
      { key: "1", value: "Owner" },
      { key: "2", value: "Worker" },
    ],
  },
  selectedOptions: {
    role: {
      value: "",
      isValid: false,
    }
  },
  isFormValid: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_INPUT:
      const { fieldName, value, validators, reducerKey } = action.payload;

      if (reducerKey === 'register') {
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
      }

    case SET_SELECT:
      const { field, val, valid, key } = action.payload;

      if (key === 'register') {
        const updatedSelects = {
          ...state.selects,
          [field]: state.selects[field].map(option => ({
            ...option,
            isValid: option.value === val ? valid : option.isValid,
          })),
        };

        const updatedSelectedOptions = {
          ...state.selectedOptions,
          [field]: {
            value: val,
            isValid: validate(val, valid)
          }
        };

        return {
          ...state,
          selects: updatedSelects,
          selectedOptions: updatedSelectedOptions,
        };
      }
    default:
      return state;
  }
};

export default registerReducer;
