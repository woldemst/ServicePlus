import { CREATE_WORKER, GET_WORKER_DATA, UPDATE_WORKER, CLEAR_WORKER_FIELD, UPDATE_INPUT } from '../actions/workerActions'
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
    case UPDATE_INPUT:
        const { fieldName, value, validators } = action.payload;
  
        console.log(action.payload);
        const updatedField = {
          ...state.inputs[fieldName],
          value,
          isValid: validate(value, validators) 
        };
        const updatedInputs = {
          ...state.inputs,
          [fieldName]: updatedField,
        };
  
        // let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);
  
        return {
          ...state,
          inputs: updatedInputs,
          // isFormValid,
        };
    case UPDATE_WORKER:
      const { field, val, objectId } = action.payload;

      const updatedWorker = {
        ...state.workersArray.workers.find(worker => worker._id === objectId),
        [field]: val,
      };

      // console.log(updatedWorker);
      const updatedWorkersArray = state.workersArray.workers.map(worker => {
        if (worker._id === objectId) {
          return updatedWorker;
        }
        return worker;
      });

      return {
        ...state,
        workersArray: {
          ...state.workersArray,
          workers: updatedWorkersArray,
        },
      };

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
    default:
      return state;
  }
};

export default workerReducer;