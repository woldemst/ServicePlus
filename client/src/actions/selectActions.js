export const SET_SELECT_TOUCHED = 'SET_SELECT_TOUCHED'
export const SET_SELECT = 'SET_SELECT'

export const setSelect = (field, val, valid) => {
  return {
    type: SET_SELECT,
    payload: {
      field,
      val,
      valid
    },
  };
};



