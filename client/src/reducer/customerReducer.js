import { CREATE_CUSTOMER, GET_CUSTOMER_DATA, UPDATE_CUSTOMER, CLEAR_CUSTOMER_FIELD, UPDATE_INPUT} from '../actions/customerActions'
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
    
          const updatedCustomer = {
            ...state.customersArray.customers.find(customer => customer._id === objectId),
            [field]: val
          };
    
          const updatedCustomersArray = state.customersArray.customers.map(customer => {
            if (customer._id === objectId) {
              return updatedCustomer;
            }
            return customer;
          });
    
          return {
            ...state,
            customersArray: {
              ...state.customersArray,
              customers: updatedCustomersArray,
            },
          };
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
        default:
          return state;
      }
};

export default customerReducer;