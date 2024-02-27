import { CREATE_WORKER, GET_WORKER_DATA, UPDATE_WORKER, CLEAR_WORKER_FIELD } from '../actions/workerActions'
import { SET_INPUT } from "../actions/inputActions";
import { validate } from '../util/validators';

const initialState = {
  workersArray: {
    workers: []
  },
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
};


const workerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKER_DATA:
      return {
        ...state,
        workersArray: action.payload,
      };
    case CREATE_WORKER:
      const newWorker = action.payload.worker;
      // console.log(action.payload);
      return {
        ...state,
        workersArray: {
          ...state.workersArray,
          workers: [...state.workersArray.workers, newWorker],
        },
      };
    case CLEAR_WORKER_FIELD:
      return {
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

    case SET_INPUT:
      const { fieldName, value, validators, objectId } = action.payload;

      console.log(action.payload);
      const updatedInputField = {
        ...state.inputs[fieldName],
        value,
        isValid: validate(value, validators)
      };

      const updatedInputs = {
        ...state.inputs,
        [fieldName]: updatedInputField,
      };

      const updatedWorker = {
        ...state.workersArray.workers.find(worker => worker._id === objectId),
        [fieldName]: value
      };

      const updatedWorkersArray = state.workersArray.workers.map(worker => {
        if (worker._id === objectId) {
          return updatedWorker;
        }
        return worker;
      });

      let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);

      return {
        ...state,
        workersArray: {
          ...state.workersArray,
          workers: updatedWorkersArray,
        },
        inputs: updatedInputs,
        isFormValid: isFormValid
      }

    default:
      return state;
  }
};

export default workerReducer;