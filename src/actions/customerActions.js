export const GET_CUSTOMER_DATA = 'GET_CUSTOMER_DATA'
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER' 
export const CLEAR_CUSTOMER_FIELD = 'CLEAR_CUSTOMER_FIELD'
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER'

export const getCustomerData = newData => ({
    type: GET_CUSTOMER_DATA,
    payload: newData
})

export const createCustomer = (customer) => ({
    type: CREATE_CUSTOMER,
    payload: { customer }
});

export const clearCustomerField = (data) => ({
    type: CLEAR_CUSTOMER_FIELD,
    payload: data
})

export const deleteCustomer = (data) => ({
    type: DELETE_CUSTOMER,
    payload: data
  })