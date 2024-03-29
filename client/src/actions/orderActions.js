export const UPDATE_FIELD = 'UPDATE_FIELD'
export const GET_ORDERS = 'GET_ORDERS'
export const UPDATE_ORDER_DATA = 'UPDATE_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA'
export const TOGGLE_TO_TRUE_EDIT_ORDER = 'TOGGLE_TO_TRUE_EDIT_ORDER'
export const TOGGLE_TO_FALSE_EDIT_ORDER = 'TOGGLE_TO_FALSE_EDIT_ORDER'
export const UPDATE_ORDER_NAME = 'UPDATE_ORDER_NAME'


export const updateOrderName = (name) => {
  return {
      type: UPDATE_ORDER_NAME,
      payload: name
  };
};

export const toggleToTrueEditOrder = (data) => ({
  type: TOGGLE_TO_TRUE_EDIT_ORDER,
  payload: data
})
export const toggleToFalseEditOrder = (data) => ({
  type: TOGGLE_TO_FALSE_EDIT_ORDER,
  payload: data
})

export const updateField = (fieldName, value, validators, objectId) => {
  return {
    type: UPDATE_FIELD,
    payload: {
      fieldName,
      value,
      validators,
      objectId
    }
  };
};

export const updateOrderData = (data) => ({
  type: UPDATE_ORDER_DATA,
  payload: data
});

export const getOrders = (data) => ({
  type: GET_ORDERS,
  payload: data
})

export const clearOrderData = data => ({
  type: CLEAR_ORDER_DATA,
  payload: data
})

