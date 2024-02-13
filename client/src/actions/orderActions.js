export const UPDATE_FIELD = 'UPDATE_FIELD'
export const GET_ORDERS = 'GET_ORDERS'
export const UPDATE_ORDER_DATA = 'UPDATE_ORDER_DATA';

export const updateField = (fieldName, value, validators) => {
  return {
    type: UPDATE_FIELD,
    payload: {
      fieldName,
      value,
      validators
    }
  };
};

export const updateOrderData= (data) => ({
  type: UPDATE_ORDER_DATA,
  payload: data 
});

export const getOrders = (data) => ({
  type: GET_ORDERS,
  payload: data
})



