export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const GET_USER_DATA = 'GET_USER_DATA'
export const VALIDATE_FIELD = 'VALIDATE_FIELD'

export const UPDATE_FIELD = 'UPDATE_FIELD'
export const CLEAR_FIELD = 'CLEAR_FIELD'
export const TOUCH_FIELD = 'TOUCH_FIELD'
export const UPDATE_AND_VALIDATE_FIELD = "UPDATE_AND_VALIDATE_FIELD"

export const updateField = (fieldName, value) => ({
  type: UPDATE_FIELD,
  payload: { fieldName, value }
})

export const clearField = (fieldName, value) => ({
  type: CLEAR_FIELD,
  payload: { fieldName, value }
})
export const validateField = (fieldName, value) => ({
  type: CLEAR_FIELD,
  payload: { fieldName, value }
})


export const updateAndValidateField = (fieldName, value, validators) => {
  return {
    type: UPDATE_AND_VALIDATE_FIELD,
    payload: {
      fieldName,
      value,
      validators
    }
  };
};

export const touchField = (fieldName) => ({
  type: TOUCH_FIELD,
  payload: fieldName
})
