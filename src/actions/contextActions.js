export const UPDATE_FIRM_ID = 'UPDATE_FIRM_ID'
export const SET_ADMIN = 'SET_ADMIN'
export const SET_USER_ID = 'SET_USER_ID'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export const updateFirmId = data => ({
    type: UPDATE_FIRM_ID,
    payload: data
})

export const setAdmin = data => ({
    type: SET_ADMIN,
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