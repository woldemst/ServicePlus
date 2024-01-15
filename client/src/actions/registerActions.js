export const UPDATE_REGISTER_FIELD = 'UPDATE_REGISTER_FIELD'
export const CLEAR_REGISTER_FIELD = 'CLEAR_REGISTER_FIELD'
export const UPDATE_AND_VALIDATE_REGISTER_FIELD = "UPDATE_AND_VALIDATE_REGISTER_FIELD"
export const TOUCH_REGISTER_FIELD = 'TOUCH_REGISTER_FIELD'
export const UPDATE_AND_VALIDATE_REGISTER_DROPDOWN = 'UPDATE_AND_VALIDATE_REGISTER_DROPDOWN';
export const TOUCH_REGISTER_DROPDOWN = 'TOUCH_REGISTER_DROPDOWN';

export const updateRegisterField = (fieldName, value) => ({
    type: UPDATE_REGISTER_FIELD,
    payload: { fieldName, value }
  })

export const clearRegisterField = (fieldName, value) => ({
  type: CLEAR_REGISTER_FIELD,
  payload: { fieldName, value }
})

export const updateAndValidateRegisterField = (fieldName, value, validators) => {
  return {
    type: UPDATE_AND_VALIDATE_REGISTER_FIELD,
    payload: {
      fieldName,
      value,
      validators
    }
  };
};

export const touchRegisterField = (fieldName) => ({
  type: TOUCH_REGISTER_FIELD,
  payload: fieldName
})



export const updateAndValidateRegisterDropdown = (fieldName, value, validate) => {
  return {
      type: UPDATE_AND_VALIDATE_REGISTER_DROPDOWN,
      payload: { fieldName, value, validate },
  };
};

export const touchRegisterDropdown = (fieldName) => {
  return {
      type: TOUCH_REGISTER_DROPDOWN,
      payload: fieldName,
  };
};

