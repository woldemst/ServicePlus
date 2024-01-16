export const UPDATE_FIRM_DATA = 'UPDATE_FIRM_DATA';
export const GET_FIRM_DATA = 'GET_FIRM_DATA'
export const UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD = 'UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD'
export const UPDATE_REGISTER_FIRM_FIELD = 'UPDATE_REGISTER_FIRM_FIELD'

export const updateFirmData = (firmData) => ({
  type: UPDATE_FIRM_DATA,
  payload: firmData, 
});

export const getFirmData = (firmData) => ({
  type: GET_FIRM_DATA,
  payload: firmData, 
})

export const updateRegisterFirmField = (fieldName, value) => ({
  type: UPDATE_REGISTER_FIRM_FIELD,
  payload: { fieldName, value }
})

export const updateAndValidateRegisterFirmField = (fieldName, value, validators) => {
  return {
    type: UPDATE_AND_VALIDATE_REGISTER_FIRM_FIELD,
    payload: {
      fieldName,
      value,
      validators
    }
  };
};