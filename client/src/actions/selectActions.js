export const SET_SELECT_TOUCHED = 'SET_SELECT_TOUCHED'
export const SET_SELECT = 'SET_SELECT'

export const setSelect = (field, val, valid, objectId = null, key = null) => {
  return {
    type: SET_SELECT,
    payload: {
      field,
      val,
      valid,
      objectId, 
      key
    },
  };
};



