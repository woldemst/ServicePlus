export const UPDATE_CUSTOMER_DATA = 'UPDATE_CUSTOMER_DATA'
export const GET_CUSTOMER_DATA = 'GET_CUSTOMER_DATA'

export const updateCustomerData = newData => ({
    type: UPDATE_CUSTOMER_DATA,
    payload: newData
})

export const getCustomerData = newData => ({
    type: GET_CUSTOMER_DATA,
    payload: newData
})

