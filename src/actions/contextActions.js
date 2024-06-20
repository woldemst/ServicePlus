export const UPDATE_FIRM_ID = 'UPDATE_FIRM_ID'
export const SET_USER_ROLE = 'SET_USER_ROLE'
export const SET_USER_ID = 'SET_USER_ID'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export const updateFirmId = data => ({
    type: UPDATE_FIRM_ID,
    payload: data
})

export const setUserRole = data => ({
    type: SET_USER_ROLE,
    payload: data
})

export const setUserId = data => ({
    type: SET_USER_ID,
    payload: data
})

export const loginSucces = data => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const logout = () => ({
    type: LOGOUT
})