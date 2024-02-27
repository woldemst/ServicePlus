export const SET_TOUCHED = 'SET_TOUCHED'
export const SET_INPUT = 'SET_INPUT'

export const setInput = (fieldName, value, validators) => {
  return {
    type: SET_INPUT,
    payload: {
      fieldName,
      value,
      validators
    },
  };
};



