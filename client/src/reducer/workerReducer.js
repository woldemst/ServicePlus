import { UPDATE_WORKER_DATA, GET_WORKER_DATA} from '../actions/workerActions'

const initialState = {
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
    isFormValid: false,
  };

const workerReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WORKER_DATA:
            return {
                ...state,
                workerData: action.payload,
            };
        case GET_WORKER_DATA:
            return {
                ...state,
                workerData: action.payload,
            };

        default:
            return state;
    }
};

export default workerReducer;