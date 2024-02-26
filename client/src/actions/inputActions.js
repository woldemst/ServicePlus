export const SET_TOUCHED = 'SET_TOUCHED'
export const SET_INPUT = 'SET_INPUT'
export const SET_INITIAL_DATA = 'SET_INITIAL_DATA'
  
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

export const setInitialData = data => ({
  type: SET_INITIAL_DATA,
  payload: data
})
