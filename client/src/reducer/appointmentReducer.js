import { GET_APPOINTMENTS, UPDATE_APPOINTMENT_DATA } from '../actions/appointmentActions';

const initialState = {
  appointmentsArray: {
    appointments: []
  },
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

    case GET_APPOINTMENTS:
      return {
        ...state,
        appointmentsArray: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;