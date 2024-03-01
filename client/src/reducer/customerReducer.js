import { CREATE_CUSTOMER, GET_CUSTOMER_DATA, UPDATE_CUSTOMER, CLEAR_CUSTOMER_FIELD, UPDATE_INPUT } from '../actions/customerActions'
import { SET_INPUT } from '../actions/inputActions';
import { validate } from '../util/validators';

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
    website: {
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
    case GET_CUSTOMER_DATA:
      return {
        ...state,
        customersArray: action.payload,
      };
    case CREATE_CUSTOMER:
      const newCustomer = action.payload.customer;
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
          website: {
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
      const { fieldName, value, validators, objectId, reducerKey } = action.payload;

      // console.log(action.payload);
      if (reducerKey === 'customer'){
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
          ...state.customersArray.customers.find(worker => worker._id === objectId),
          [fieldName]: value
        };
  
        const updatedWorkersArray = state.customersArray.customers.map(worker => {
          if (worker._id === objectId) {
            return updatedWorker;
          }
          return worker;
        });
  
        let isFormValid = Object.values(updatedInputs).every((field) => field.isValid);
  
        return {
          ...state,
          customersArray: {
            ...state.customersArray,
            customers: updatedWorkersArray,
          },
          inputs: updatedInputs,
          isFormValid: isFormValid
        }
      }
     
    default:
      return state;
  }
};

export default customerReducer;