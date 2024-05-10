import { CREATE_CUSTOMER, GET_CUSTOMER_DATA, UPDATE_CUSTOMER, UPDATE_INPUT, DELETE_CUSTOMER} from '../actions/customerActions'
// import { SET_INPUT } from '../actions/inputActions';
import { validate } from '../util/validators';

const initialState = {
  customersArray: {
    customers: []
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
      case DELETE_CUSTOMER:
        const filteredCustomer = state.customersArray.customers.filter(customer => customer._id !== action.payload);
        return {
          ...state,
          customersArray: {
            ...state.customersArray,
            customers: filteredCustomer
          }
        };     
    default:
      return state;
  }
};

export default customerReducer;