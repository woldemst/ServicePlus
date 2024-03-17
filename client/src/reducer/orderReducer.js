import { GET_ORDERS, UPDATE_ORDER_DATA, CLEAR_ORDER_DATA, TOGGLE_EDIT } from '../actions/orderActions';

const initialState = {
  ordersArray: {
    orders: []
  },
  edit: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // case UPDATE_ORDER_DATA:
    //   const { field, val, objectId } = action.payload;

    //   const updatedOrder = {
    //     ...state.ordersArray.orders.find(order => order._id === objectId),
    //     [field]: val
    //   };

    //   const updatedOrdersArray = state.ordersArray.orders.map(order => {
    //     if (order._id === objectId) {
    //       return updatedOrder;
    //     }
    //     return order;
    //   });

    //   return {
    //     ...state,
    //     ordersArray: {
    //       ...state.ordersArray,
    //       orders: updatedOrdersArray,
    //     },
    //   };

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

    case TOGGLE_EDIT: 
    return {
      ...state, 
      edit: action.payload
    }

    case CLEAR_ORDER_DATA:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default orderReducer;