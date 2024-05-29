import { GET_ORDERS, UPDATE_ORDER_DATA_BY_ID, CLEAR_ORDER_DATA, TOGGLE_EDIT, TOGGLE_TO_TRUE_EDIT_ORDER, TOGGLE_TO_FALSE_EDIT_ORDER, UPDATE_ORDER_NAME, DELETE_ORDER, GET_ARCHIVED_ORDERS } from '../actions/orderActions';

const initialState = {
  ordersArray: { orders: [] },
  activeOrders: [],
  archivedOrders: [],
  showArchivedOrders: false,
  orderName: '',
  edit: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER_DATA_BY_ID:
      const { data, fieldName, orderId } = action.payload;
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
        activeOrders: action.payload.orders.filter(order => order.status !== '3' && order.status !== '4'),
        archivedOrders: action.payload.orders.filter(order => order.status === '3' || order.status === '4')
      };
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
    case TOGGLE_EDIT:
      return {
        ...state,
        edit: action.payload
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
        },
        activeOrders: state.activeOrders.filter(order => order._id !== action.payload),
        archivedOrders: state.archivedOrders.filter(order => order._id !== action.payload)
      };

    case GET_ARCHIVED_ORDERS:
      const filteredArchivedOrders = state.ordersArray.orders.filter(order => order.status === '3' || order.status === '4');
      return {
        ...state,
        showArchivedOrders: !state.showArchivedOrders,
        archivedOrders: filteredArchivedOrders
      }
    default:
      return state;
  }
};

export default orderReducer;