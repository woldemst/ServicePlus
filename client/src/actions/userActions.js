export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const GET_USER_DATA = 'GET_USER_DATA'


export const  UPDATE_FIELD = 'UPDATE_FIELD'

export const updateField = (fieldName, value) => ({
  type: UPDATE_FIELD, 
  payload: {fieldName, value}
})

export const updateUserData = (userData) => ({
  type: UPDATE_USER_DATA,
  payload: userData, 
});

export const getUserData = (userData) => ({
  type: GET_USER_DATA,
  payload: userData, 

})


