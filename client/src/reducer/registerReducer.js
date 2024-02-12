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
  },
  selects: {
    role: [
      { key: "1", value: "Owner", isValid: false },
      { key: "2", value: "Worker", isValid: false },
    ],
  },
  isFormValid: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AND_VALIDATE_REGISTER_FIELD:
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


      let updatedSelects;
      if (fieldName === 'role') {
        updatedSelects = {
          ...state.selects,
          [fieldName]: state.selects[fieldName].map(option => ({
            ...option,
            isValid: option.key === value ? updatedField.isValid : option.isValid,
          })),
        }

      }
      else {
        updatedSelects = {
          ...state.selects,
        }
      }

      let isRoleValid;
      if (fieldName === 'role') {
        isRoleValid = updatedField.isValid

      }


      let isFormValid = Object.values(updatedInputs).every(
        (field) => field.isValid
      ) && isRoleValid;


      return {
        ...state,
        inputs: updatedInputs,
        selects: updatedSelects,
        isFormValid,
      };
    case CLEAR_REGISTER_FIELD:
      return {
        // name: {
        //   value: "",
        //   isValid: false,
        // },
        // email: {
        //   value: "",
        //   isValid: false,
        // },
        // password: {
        //   value: "",
        //   isValid: false,
        // },
        // role: {
        //   value: "",
        //   isValid: false,
        // },
        // isFormValid: false,

        ...initialState,
      };

    default:
      return state;
  }
};

export default registerReducer;
