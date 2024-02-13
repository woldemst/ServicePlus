import { GET_ORDERS, UPDATE_FIELD, UPDATE_ORDER_DATA } from '../actions/orderActions';
import { validate } from '../util/validators';

const initialState = {
    ordersArray: {
      orders: []
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
  
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FIELD: 
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
        case UPDATE_ORDER_DATA:
          const { field, val, objectId } = action.payload;
    
          const updatedOrder = {
            ...state.ordersArray.orders.find(order => order._id === objectId),
            [field]: val
          };
    
          const updatedOrdersArray = state.customersArray.orders.map(order => {
            if (order._id === objectId) {
              return updatedOrder;
            }
            return order;
          });
    
          return {
            ...state,
            customersArray: {
              ...state.customersArray,
              orders: updatedOrdersArray,
            },
          };
        case GET_ORDERS:
          return {
            ...state,
            ordersArray: action.payload,
          };
        // case CREATE_CUSTOMER:
        //   const newOrder= action.payload.order;
        //   // console.log(action.payload);
        //   return {
        //     ...state,
        //     customersArray: {
        //       ...state.customersArray,
        //       orders: [...state.ordersArray.orders, newOrder],
        //     },
        //   };
        // case CLEAR_CUSTOMER_FIELD:
        //   return {
        //     ...state,
        //     inputs: {
        //       name: {
        //         value: "",
        //         isValid: false,
        //       },
        //       email: {
        //         value: "",
        //         isValid: false,
        //       },
        //       street: {
        //         value: "",
        //         isValid: false,
        //       },
        //       houseNr: {
        //         value: "",
        //         isValid: false,
        //       },
        //       zip: {
        //         value: "",
        //         isValid: false,
        //       },
        //       place: {
        //         value: "",
        //         isValid: false,
        //       },
        //       phone: {
        //         value: "",
        //         isValid: false,
        //       },
        //       website: {
        //         value: "",
        //         isValid: false,
        //       },
        //       description: {
        //         value: "",
        //         isValid: false,
        //       },
        //     },
        //     isFormValid: false,
        //   };
        default:
          return state;
      }
};

export default orderReducer;