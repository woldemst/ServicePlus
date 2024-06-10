export const CLEAR_FIELD = 'CLEAR_FIELD'
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export const clearField = (fieldName, value) => ({
  type: CLEAR_FIELD,
  payload: { fieldName, value }
})

export const updateUserData = (data) => ({
  type: UPDATE_USER_DATA,
  payload: data,
});

