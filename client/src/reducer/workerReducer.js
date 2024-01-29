import { UPDATE_WORKER_DATA, GET_WORKER_DATA, UPDATE_AND_VALIDATE_WORDER_FIELD, CLEAR_WORKER_FIELD } from '../actions/workerActions'
import { validate } from '../util/validators';


const initialState = {
  workersArray: {},
  inputs: {
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
    description: {
      value: "",
      isValid: false,
    },
  },
  isFormValid: false,
};

const workerReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_AND_VALIDATE_WORDER_FIELD:
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
      
    case UPDATE_WORKER_DATA:
      return {
        ...state,
        workerData: action.payload,
      };
    case GET_WORKER_DATA:
      return {
        ...state,
        workersArray: action.payload,
      };
    case CLEAR_WORKER_FIELD:
      return  {
        ...state,
        inputs: {
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
          description: {
            value: "",
            isValid: false,
          },
        },
        isFormValid: false,
      };
    default:
      return state;
  }
};

export default workerReducer;