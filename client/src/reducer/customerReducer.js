import { CREATE_CUSTOMER, GET_CUSTOMER_DATA, UPDATE_CUSTOMER, CLEAR_CUSTOMER_FIELD, UPDATE_INPUT} from '../actions/customerActions'

const initialState = {
    customersArray: {
      customers: []
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
  
const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INPUT:
          const { fieldName, value, validators } = action.payload;
    
          // console.log(action.payload);
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
        case UPDATE_CUSTOMER:
          const { field, val, objectId } = action.payload;
    
          const updatedWorker = {
            ...state.customersArray.customers.find(worker => worker._id === objectId),
            [field]: val
          };
    
          // console.log(updatedWorker);
          const updatedWorkersArray = state.customersArray.customers.map(worker => {
            if (worker._id === objectId) {
              return updatedWorker;
            }
            return worker;
          });
    
          return {
            ...state,
            customersArray: {
              ...state.customersArray,
              customers: updatedWorkersArray,
            },
          };
        case GET_CUSTOMER_DATA:
          return {
            ...state,
            customersArray: action.payload,
          };
        case CREATE_CUSTOMER:
          const newCustomer = action.payload.worker;
          // console.log(action.payload);
          return {
            ...state,
            customersArray: {
              ...state.customersArray,
              customers: [...state.customersArray.customers, newCustomer],
            },
          };
        case CLEAR_CUSTOMER_FIELD:
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

export default customerReducer;