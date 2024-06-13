
export const GET_ORDERS = 'GET_ORDERS'
export const UPDATE_ORDER_DATA_BY_ID = 'UPDATE_ORDER_DATA_BY_ID';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA'
export const TOGGLE_TO_TRUE_EDIT_ORDER = 'TOGGLE_TO_TRUE_EDIT_ORDER'
export const TOGGLE_TO_FALSE_EDIT_ORDER = 'TOGGLE_TO_FALSE_EDIT_ORDER'
export const TOGGLE_EDIT = 'TOGGLE_EDIT'
export const UPDATE_ORDER_NAME = 'UPDATE_ORDER_NAME'
export const DELETE_ORDER = 'DELETE_ORDER'
export const GET_ARCHIVED_ORDERS = 'GET_ARCHIVED_ORDERS'


export const updateOrderName = (name) => ({
  type: UPDATE_ORDER_NAME,
  payload: name
})

export const toggleEdit = (data) => ({
  type: TOGGLE_EDIT,
  payload: data
})
export const toggleToTrueEditOrder = (data) => ({
  type: TOGGLE_TO_TRUE_EDIT_ORDER,
  payload: data
})

export const toggleToFalseEditOrder = (data) => ({
  type: TOGGLE_TO_FALSE_EDIT_ORDER,
  payload: data
})


export const updateOrderDataById = (data, fieldName, orderId,) => ({
  type: UPDATE_ORDER_DATA_BY_ID,
  payload: {
    data,
    fieldName,
    orderId,
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

export const getArchivedOrders = (data) => ({
  type: GET_ARCHIVED_ORDERS,
  payload: data
})

