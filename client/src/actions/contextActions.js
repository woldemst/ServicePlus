export const UPDATE_FIRM_ID = 'UPDATE_FIRM_ID'
export const SET_USER_ROLE = 'SET_USER_ROLE'

export const updateFirmId = data => ({
    type: UPDATE_FIRM_ID,
    payload: data
})

export const setUserRole = data => ({
    type: SET_USER_ROLE,
    payload: data
})