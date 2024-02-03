import { UPDATE_WORKER_DATA, GET_WORKER_DATA, UPDATE_WORKER, UPDATE_AND_VALIDATE_WORKER_FIELD, CLEAR_WORKER_FIELD } from '../actions/workerActions'
import { validate } from '../util/validators';


const initialState = {
  workersArray: {
    workers: []
  }
};


const workerReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_AND_VALIDATE_WORKER_FIELD:
      const { fieldName, value, objectId} = action.payload;

      const updatedWorker = {
        ...state.workersArray.workers.find(worker => worker._id === objectId),
        [fieldName]: value,
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
    // case UPDATE_WORKERS_ARRAY:
    //   const { fiel, val, vaidate } = action.payload;

    //   const newField = {
    //     ...state[fiel],
    //     value,
    //     isValid: validate(value, validators)
    //   };
      
    //   const newInputs = {
    //     ...state.inputs,
    //     [fieldName]: newField,
    //   };
    //   // console.log(updatedInputs);

    //   let formValid = Object.values(newInputs).every((field) => field.isValid);

    //   return {
    //     ...state,
    //     inputs: newInputs,
    //     formValid,
    //   };
    case UPDATE_WORKER: 
      const updateWorkers = state.workersArray.workers.map(worker => {
        if (worker._id === action.playload.workerId){
          return {
            ...worker, 
            ...action.playload.updatedData
          }
        }

        return worker
      })

      return{
        ...state,
        workersArray: {
          ...state.workersArray, 
          workers: updateWorkers
        }
      }
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