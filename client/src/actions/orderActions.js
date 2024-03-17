export const UPDATE_FIELD = 'UPDATE_FIELD'
export const GET_ORDERS = 'GET_ORDERS'
export const UPDATE_ORDER_DATA = 'UPDATE_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA'
export const TOGGLE_EDIT = 'TOGGLE_EDIT'


export const toggleEdit = (data) => ({
  type: TOGGLE_EDIT,
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

