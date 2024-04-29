export const UPDATE_FIELD = 'UPDATE_FIELD'
export const GET_ORDERS = 'GET_ORDERS'
export const UPDATE_ORDER_DATA_BY_ID = 'UPDATE_ORDER_DATA_BY_ID';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA'
export const TOGGLE_TO_TRUE_EDIT_ORDER = 'TOGGLE_TO_TRUE_EDIT_ORDER'
export const TOGGLE_TO_FALSE_EDIT_ORDER = 'TOGGLE_TO_FALSE_EDIT_ORDER'
export const UPDATE_ORDER_NAME = 'UPDATE_ORDER_NAME'
export const DELETE_ORDER = 'DELETE_ORDER'


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

export const updateOrderDataById = (data, orderId, fieldName) => ({
  type: UPDATE_ORDER_DATA_BY_ID,
  payload: {
    data, 
    orderId, 
    fieldName
  }
});

export const getOrders = (data) => ({
  type: GET_ORDERS,
  payload: data
})

export const clearOrderData = data => ({
  type: CLEAR_ORDER_DATA,
  payload: data
})

export const deleteOrder = (data) => ({
  type: DELETE_ORDER,
  payload: data
})