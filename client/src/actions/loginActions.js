export const CLEAR_LOGIN_FIELD = 'CLEAR_LOGIN_FIELD'
export const TOUCH_LOGIN_FIELD = 'TOUCH_LOGIN_FIELD'
export const UPDATE_OBJECT = 'UPDATE_OBJECT'


export const clearLoginField = (fieldName, value) => ({
  type: CLEAR_LOGIN_FIELD,
  payload: { fieldName, value }
})

export const updateObject = (data) => ({
  type: UPDATE_OBJECT,
  payload: data
  
})

