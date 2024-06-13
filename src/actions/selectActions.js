export const SET_SELECT_TOUCHED = 'SET_SELECT_TOUCHED'
export const SET_SELECT = 'SET_SELECT'
export const SET_INITIAL_SELECT_DATA = 'SET_INITIAL_SELECT_DATA'

export const setSelect = (fieldName, value, validators, objectId = null, reducerKey = null) => {
  return {
    type: SET_SELECT,
    payload: {
      fieldName,
      value,
      validators,
      objectId,
      reducerKey
    },
  };
};

export const setInitialSelectData = (data) => ({
  type: SET_INITIAL_SELECT_DATA,
  payload: data 
  // payload: { select, data }
})