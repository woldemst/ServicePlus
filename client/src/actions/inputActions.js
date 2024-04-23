export const SET_TOUCHED = 'SET_TOUCHED'
export const SET_INPUT = 'SET_INPUT'
export const SET_INITIAL_INPUT_DATA = 'SET_INITIAL_INPUT_DATA'
export const ADD_TO_INITIAL_DATA = 'ADD_TO_INITIAL_DATA'
export const ERASE_INPUT_DATA = 'ERASE_INPUT_DATA'


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

export const eraseInpuData = () => ({
  type: ERASE_INPUT_DATA,
})

export const addToInitialData = data => ({
  type: ADD_TO_INITIAL_DATA,
  payload: data
})