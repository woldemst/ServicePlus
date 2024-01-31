export const CLEAR_LOGIN_FIELD = 'CLEAR_LOGIN_FIELD'
export const TOUCH_LOGIN_FIELD = 'TOUCH_LOGIN_FIELD'
export const UPDATE_AND_VALIDATE_LOGIN_FIELD = "UPDATE_AND_VALIDATE_LOGIN_FIELD"

export const clearLoginField = (fieldName, value) => ({
  type: CLEAR_LOGIN_FIELD,
  payload: { fieldName, value }
})


export const updateAndValidateLoginField = (fieldName, value, validators) => {
  return {
    type: UPDATE_AND_VALIDATE_LOGIN_FIELD,
    payload: {
      fieldName,
      value,
      validators
    }
  };
};

