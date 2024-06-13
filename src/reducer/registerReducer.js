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
