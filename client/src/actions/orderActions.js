export const UPDATE_FIELD = 'UPDATE_FIELD'
export const GET_ORDERS = 'GET_ORDERS'
export const UPDATE_ORDER_DATA = 'UPDATE_ORDER_DATA';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA'

export const FETCH_SELECTS_SUCCESS = 'FETCH_SELECTS_SUCCESS'
export const FETCH_SELECTS_FAILURE = 'FETCH_SELECTS_FAILURE'


export const fetchSelectsSuccess = (selects) => ({
  type: FETCH_SELECTS_SUCCESS,
  payload: selects,
});

export const fetchSelectsFailure = (error) => ({
  type: FETCH_SELECTS_FAILURE,
  payload: error,
});


// stable 
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

