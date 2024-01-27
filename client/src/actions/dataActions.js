
export const UPDATE_AND_VALIDATE_DATA_FIELD = 'UPDATE_AND_VALIDATE_DATA_FIELD'


export const updateAndValidateDataField = (fieldName, value, validators) => {
  return {
    type: UPDATE_AND_VALIDATE_DATA_FIELD,
    payload: {
      fieldName,
      value,
      validators
    }
  };
};
