import { GET_ORDERS, UPDATE_ORDER_DATA_BY_ID, CLEAR_ORDER_DATA, TOGGLE_EDIT, TOGGLE_TO_TRUE_EDIT_ORDER, TOGGLE_TO_FALSE_EDIT_ORDER, UPDATE_ORDER_NAME, DELETE_ORDER } from '../actions/orderActions';

const initialState = {
  ordersArray: {
    orders: [
      // {
      //   "_id": "66129d2040d59fa7471096ce"
      //   "firmId": "65b130bec45518baddc03d8b",
      //   "appointments": [
      //     {"6612aee8da3319dbcae561cc"},
      //     {"6612af0bda3319dbcae561da"}
      //   ],
      //   "customerId": "65e4b3697e04b041ffd8bdde",
      //   "c_name": "Customer number 3",
      //   "name": "1st order (not delete)",
      //   "street": "Spiekerstrasse",
      //   "houseNr": "14",
      //   "zip": "454545",
      //   "place": "Gladbek",
      //   "worker": "New Created Worker",
      //   "description": "Address of the order ",
      //   "status": "1"
      // }
    ]
  },
  edit: false,
  orderName: ''
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER_DATA_BY_ID:
      const { data, orderId, fieldName } = action.payload;
      const orderIndex = state.ordersArray.orders.findIndex(order => order._id === orderId);

      if (orderIndex === -1) {
        // If the order is not found, return the state unchanged
        return state;
      }
    
      // Update the specific field of the order in a new copy of the state
      const updatedOrder = {
        ...state.ordersArray.orders[orderIndex],
        [fieldName]: data
      };
    
      // Create a new array with the updated order
      const updatedOrdersArray = [...state.ordersArray.orders];
      updatedOrdersArray[orderIndex] = updatedOrder;
    
      return {
        ...state,
        ordersArray: {
          ...state.ordersArray,
          orders: updatedOrdersArray
        }
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
    //     ordersArray: {
    //       ...state.ordersArray,
    //       orders: [...state.ordersArray.orders, newOrder],
    //     },
    //   };

    case TOGGLE_TO_TRUE_EDIT_ORDER:
      return {
        ...state,
        edit: true
      }
    case TOGGLE_TO_FALSE_EDIT_ORDER:
      return {
        ...state,
        edit: false
      }
    case UPDATE_ORDER_NAME:
      return {
        ...state,
        orderName: action.payload
      }

    case DELETE_ORDER:
      const filteredOrders = state.ordersArray.orders.filter(order => order._id !== action.payload);
      return {
        ...state,
        ordersArray: {
          ...state.ordersArray,
          orders: filteredOrders
        }
      };
    default:
      return state;
  }
};

export default orderReducer;