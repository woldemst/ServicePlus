export const SET_TOUCHED = 'SET_TOUCHED'
export const SET_INPUT = 'SET_INPUT'
export const SET_INITIAL_INPUT_DATA = 'SET_INITIAL_INPUT_DATA'

export const setInput = (fieldName, value, validators, objectId = null, reducerKey = null) => {
  return {
    type: SET_INPUT,
    payload: {
      fieldName,
      value,
      validators,
      objectId,
      reducerKey
    },
  };
};

export const setInitialInputData = data => ({
  type: SET_INITIAL_INPUT_DATA,
  payload: data
})


