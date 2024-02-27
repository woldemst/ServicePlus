export const CLEAR_LOGIN_FIELD = 'CLEAR_LOGIN_FIELD'
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
export const SET_INITIAL_DATA = 'SET_INITIAL_DATA'

export const clearLoginField = (fieldName, value) => ({
  type: CLEAR_LOGIN_FIELD,
  payload: { fieldName, value }
})

export const updateUserData = (data) => ({
  type: UPDATE_USER_DATA,
  payload: data
})

export const setInitialData = (data) => ({
  type: SET_INITIAL_DATA,
  payload: data
})


